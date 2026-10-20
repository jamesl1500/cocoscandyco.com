// Canonical origin for metadata, sitemap and structured data. Set NEXT_PUBLIC_SITE_URL per environment.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cocoscandyco.com'
).replace(/\/+$/, '')

export const absoluteUrl = (path = '/') => `${SITE_URL}${path === '/' ? '' : path}`

// Link to the quote form, optionally with the "Venue or city" field filled in.
export const quoteHref = (location?: string) =>
  location ? `/contact?location=${encodeURIComponent(location)}` : '/contact'

export const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/menu', label: 'Menu' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

// Where the business is based. Drives local titles, copy and structured data.
export const HOME_BASE = {
  city: 'Chapel Hill',
  region: 'NC',
  regionName: 'North Carolina',
  country: 'US',
  label: 'Chapel Hill, NC',
} as const

export type SiteInfo = {
  name: string
  tagline: string
  description: string
  phone?: string
  email?: string
  serviceArea?: string
  address?: {
    street?: string
    city?: string
    region?: string
    postalCode?: string
    country?: string
  }
  hours: { days: string; hours: string }[]
  social: string[]
}

export const socialLabel = (url: string) => {
  if (url.includes('instagram')) return 'Instagram'
  if (url.includes('facebook')) return 'Facebook'
  if (url.includes('tiktok')) return 'TikTok'
  return 'Social'
}

// Digits-only link target for a displayed phone number, with the US country code added to ten-digit numbers.
export const phoneHref = (phone: string) => {
  const digits = phone.replace(/[^+\d]/g, '')
  return `tel:${digits.length === 10 ? `+1${digits}` : digits}`
}

export const siteInfo: SiteInfo = {
  name: "Coco's Couture Candy Co.",
  tagline: 'Candy & Dessert Catering',
  description:
    'Candy buffets, dessert tables and custom sweets for weddings and events in Chapel Hill, Durham and the Triangle, NC, plus Cleveland and Columbus, OH. Free quotes.',
  serviceArea: 'Chapel Hill, Durham and the Triangle, plus Cleveland and Columbus, Ohio',
  phone: '(352) 973-7753',
  email: 'cocoscouturecandyco@gmail.com',
  hours: [],
  social: ['https://www.instagram.com/cocoscouturecandyco/'],
}
