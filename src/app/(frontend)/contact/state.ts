export const inquiryFields = [
  'name',
  'email',
  'phone',
  'eventType',
  'eventDate',
  'guestCount',
  'location',
  'message',
] as const

export type InquiryField = (typeof inquiryFields)[number]

export type InquiryState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors: Partial<Record<InquiryField, string>>
  // Echoed back so the form keeps what was typed when validation fails.
  values: Partial<Record<InquiryField, string>>
}

export const initialInquiryState: InquiryState = {
  status: 'idle',
  errors: {},
  values: {},
}
