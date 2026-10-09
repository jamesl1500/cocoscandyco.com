import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { submitInquiry } from '@/app/(frontend)/contact/actions'
import { initialInquiryState } from '@/app/(frontend)/contact/state'
import { buildInquiryEmail } from '@/lib/inquiryEmail'

const form = (fields: Record<string, string>) => {
  const data = new FormData()
  for (const [name, value] of Object.entries(fields)) data.set(name, value)
  return data
}

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  phone: '919-555-0100',
  eventType: 'wedding',
  eventDate: '2027-05-08',
  guestCount: '120',
  location: 'Chapel Hill',
  message: 'A candy buffet in blush and gold, please.',
}

describe('buildInquiryEmail', () => {
  it('summarises the request', () => {
    const email = buildInquiryEmail({ ...valid, guestCount: 120 })

    expect(email.subject).toBe('New quote request from Ada Lovelace (Wedding)')
    expect(email.text).toContain('Event date: May 8, 2027')
    expect(email.text).toContain('Guests: 120')
    expect(email.text).toContain('A candy buffet in blush and gold, please.')
  })

  it('escapes what the visitor typed in the HTML body', () => {
    const email = buildInquiryEmail({
      name: '<b>Eve</b>',
      email: 'eve@example.com',
      message: '<script>alert("x")</script>',
    })

    expect(email.html).not.toContain('<script>')
    expect(email.html).not.toContain('<b>Eve</b>')
    expect(email.html).toContain('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;')
  })

  it('leaves out details that were not given', () => {
    const email = buildInquiryEmail({ name: 'Ada', email: 'ada@example.com', message: 'Hi' })

    expect(email.subject).toBe('New quote request from Ada')
    expect(email.text).not.toContain('Phone')
    expect(email.text).not.toContain('Guests')
  })
})

describe('submitInquiry', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
    vi.stubEnv('RESEND_API_KEY', 'test-key')
    vi.stubEnv('EMAIL_FROM_ADDRESS', 'quotes@example.com')
    vi.stubEnv('INQUIRY_NOTIFY_EMAIL', '')
    vi.spyOn(console, 'error').mockImplementation(() => {})
    fetchMock.mockReset()
    fetchMock.mockResolvedValue(new Response('{"id":"1"}', { status: 200 }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('emails a valid request to the business with the visitor as reply-to', async () => {
    const state = await submitInquiry(initialInquiryState, form(valid))

    expect(state.status).toBe('success')
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [url, init] = fetchMock.mock.calls[0]
    const body = JSON.parse(init.body)

    expect(url).toBe('https://api.resend.com/emails')
    expect(init.headers.Authorization).toBe('Bearer test-key')
    expect(body.from).toBe("Coco's Couture Candy Co. <quotes@example.com>")
    expect(body.to).toEqual(['cocoscouturecandyco@gmail.com'])
    expect(body.reply_to).toBe('ada@example.com')
  })

  it('rejects an incomplete request without sending anything', async () => {
    const state = await submitInquiry(initialInquiryState, form({ ...valid, email: 'nope' }))

    expect(state.status).toBe('error')
    expect(state.errors.email).toBe('Please enter a valid email address.')
    expect(state.values.name).toBe('Ada Lovelace')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('tells the visitor when the email could not be sent', async () => {
    fetchMock.mockResolvedValue(new Response('{"message":"domain not verified"}', { status: 403 }))

    const state = await submitInquiry(initialInquiryState, form(valid))

    expect(state.status).toBe('error')
    expect(state.message).toContain('was not sent')
    expect(state.message).toContain('(352) 973-7753')
    expect(state.values.message).toBe(valid.message)
  })

  it('fails loudly when the API key is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '')

    const state = await submitInquiry(initialInquiryState, form(valid))

    expect(state.status).toBe('error')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('quietly drops honeypot submissions', async () => {
    const state = await submitInquiry(initialInquiryState, form({ ...valid, company: 'Bot Inc' }))

    expect(state.status).toBe('success')
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
