// Option lists shared by the quote form, the menu and the notification email.

export const eventTypes = [
  { label: 'Wedding', value: 'wedding' },
  { label: 'Corporate event', value: 'corporate' },
  { label: 'Birthday party', value: 'birthday' },
  { label: 'Baby or bridal shower', value: 'shower' },
  { label: 'Holiday party', value: 'holiday' },
  { label: 'Something else', value: 'other' },
] as const

export type EventType = (typeof eventTypes)[number]['value']

export const menuCategories = [
  { label: 'Charcuterie & Grazing', value: 'charcuterie' },
  { label: 'Candy Bar Classics', value: 'candy' },
  { label: 'Chocolates & Truffles', value: 'chocolate' },
  { label: 'Baked Sweets', value: 'baked' },
  { label: 'Seasonal & Custom', value: 'seasonal' },
] as const

export type MenuCategory = (typeof menuCategories)[number]['value']

export const dietaryTags = [
  { label: 'Vegan', value: 'vegan' },
  { label: 'Gluten-free', value: 'gluten-free' },
  { label: 'Nut-free', value: 'nut-free' },
  { label: 'Dairy-free', value: 'dairy-free' },
  { label: 'Kosher', value: 'kosher' },
  { label: 'Halal', value: 'halal' },
] as const
