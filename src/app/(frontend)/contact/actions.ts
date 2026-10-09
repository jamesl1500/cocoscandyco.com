'use server'

import config from '@payload-config'
import { getPayload } from 'payload'

import { eventTypes, type EventType } from '@/lib/options'

import { inquiryFields, type InquiryState } from './state'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

const success: InquiryState = {
  status: 'success',
  message: 'Thanks! Your request is in. We will be in touch soon.',
  errors: {},
  values: {},
}

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  // Honeypot: real visitors never see or fill this field. Pretend it worked so bots don't retry.
  if (formData.get('company')) return success

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

  const eventType = eventTypes.find((type) => type.value === values.eventType)?.value as
    | EventType
    | undefined
  if (values.eventType && !eventType) errors.eventType = 'Please choose an event type from the list.'

  let eventDate: string | undefined
  if (values.eventDate) {
    // Noon UTC keeps the calendar day stable across time zones.
    const parsed = new Date(`${values.eventDate}T12:00:00Z`)
    if (!DATE_PATTERN.test(values.eventDate) || Number.isNaN(parsed.getTime()))
      errors.eventDate = 'Please enter a valid date.'
    else eventDate = parsed.toISOString()
  }

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
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'inquiries',
      data: {
        status: 'new',
        name: values.name!,
        email: values.email!,
        phone: values.phone || undefined,
        eventType,
        eventDate,
        guestCount,
        location: values.location || undefined,
        message: values.message!,
      },
    })
  } catch (error) {
    console.error('[contact] Failed to save inquiry', error)
    return {
      status: 'error',
      message: 'Something went wrong on our end and your request was not sent. Please try again.',
      errors: {},
      values,
    }
  }

  return success
}
