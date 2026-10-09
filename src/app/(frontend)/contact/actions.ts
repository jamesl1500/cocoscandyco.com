'use server'

import { sendInquiryEmail } from '@/lib/inquiryEmail'
import { eventTypes } from '@/lib/options'
import { siteInfo } from '@/lib/site'

import { inquiryFields, type InquiryState } from './state'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

const success: InquiryState = {
  status: 'success',
  message: 'Thanks! Your request is in. We will be in touch soon.',
  errors: {},
  values: {},
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot: real visitors never see or fill this field. Pretend it worked so bots don't retry.
  if (formData.get('referralCode')) {
    console.warn('[contact] Dropped a submission that filled the honeypot field')
    return success
  }

  const values: InquiryState['values'] = {}
  for (const field of inquiryFields) {
    values[field] = String(formData.get(field) ?? '').trim()
  }

  const errors: InquiryState['errors'] = {}

  if (!values.name) errors.name = 'Please enter your name.'
  else if (values.name.length > 100) errors.name = 'Name is too long.'

  if (!values.email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(values.email) || values.email.length > 200)
    errors.email = 'Please enter a valid email address.'

  if (values.phone && values.phone.length > 30) errors.phone = 'Phone number is too long.'

  const eventType = eventTypes.find((type) => type.value === values.eventType)?.value
  if (values.eventType && !eventType)
    errors.eventType = 'Please choose an event type from the list.'

  if (
    values.eventDate &&
    (!DATE_PATTERN.test(values.eventDate) || Number.isNaN(Date.parse(values.eventDate)))
  )
    errors.eventDate = 'Please enter a valid date.'

  let guestCount: number | undefined
  if (values.guestCount) {
    guestCount = Number(values.guestCount)
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 100000)
      errors.guestCount = 'Please enter a whole number of guests.'
  }

  if (values.location && values.location.length > 200) errors.location = 'Location is too long.'

  if (!values.message) errors.message = 'Please tell us a little about your event.'
  else if (values.message.length > 5000) errors.message = 'Message is too long.'

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields and try again.',
      errors,
      values,
    }
  }

  try {
    await sendInquiryEmail({
      name: values.name!,
      email: values.email!,
      phone: values.phone || undefined,
      eventType,
      eventDate: values.eventDate || undefined,
      guestCount,
      location: values.location || undefined,
      message: values.message!,
    })
  } catch (error) {
    // Nothing is stored anywhere else, so the visitor has to know the request did not go through.
    console.error('[contact] Failed to send inquiry', error)
    return {
      status: 'error',
      message: `Something went wrong on our end and your request was not sent. Please try again, or call us at ${siteInfo.phone}.`,
      errors: {},
      values,
    }
  }

  return success
}
