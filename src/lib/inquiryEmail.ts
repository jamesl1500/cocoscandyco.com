import { eventTypes } from './options'
import { siteInfo } from './site'

export type Inquiry = {
  name: string
  email: string
  phone?: string
  eventType?: string
  eventDate?: string
  guestCount?: number
  location?: string
  message: string
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// The notification sent to the business when a quote request comes in.
// Everything a visitor typed is escaped before it goes into the HTML body.
export function buildInquiryEmail(inquiry: Inquiry) {
  const eventType = eventTypes.find((type) => type.value === inquiry.eventType)?.label
  const eventDate = inquiry.eventDate
    ? new Date(`${inquiry.eventDate}T12:00:00Z`).toLocaleDateString('en-US', {
        dateStyle: 'long',
        timeZone: 'UTC',
      })
    : undefined

  const rows: [string, string | undefined][] = [
    ['Name', inquiry.name],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone],
    ['Event type', eventType],
    ['Event date', eventDate],
    ['Guests', inquiry.guestCount ? String(inquiry.guestCount) : undefined],
    ['Venue or city', inquiry.location],
  ]
  const details = rows.filter((row): row is [string, string] => Boolean(row[1]))

  const text = [...details.map(([label, value]) => `${label}: ${value}`), '', inquiry.message].join(
    '\n',
  )

  const html = [
    '<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:15px">',
    ...details.map(
      ([label, value]) =>
        `<tr><td style="color:#6b544e"><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`,
    ),
    '</table>',
    `<p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>`,
  ].join('')

  return {
    subject: `New quote request from ${inquiry.name}${eventType ? ` (${eventType})` : ''}`,
    text,
    html,
  }
}

// Sends the quote request to the business through Resend's REST API. There is no database behind the form,
// so this email is the only record of the request: any failure throws, and the caller tells the visitor.
export async function sendInquiryEmail(inquiry: Inquiry) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not set')

  // Resend only delivers from a domain verified in the account; its shared test sender is the fallback.
  const from = process.env.EMAIL_FROM_ADDRESS || 'onboarding@resend.dev'
  const to = process.env.INQUIRY_NOTIFY_EMAIL || siteInfo.email

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${siteInfo.name} <${from}>`,
      to: [to],
      // Replying goes straight to the person who asked for the quote.
      reply_to: inquiry.email,
      ...buildInquiryEmail(inquiry),
    }),
  })

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`)
  }
}
