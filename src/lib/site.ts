// Canonical origin for metadata, sitemap and structured data. Set NEXT_PUBLIC_SITE_URL per environment.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cocoscandyco.com'
).replace(/\/+$/, '')

export const absoluteUrl = (path = '/') => `${SITE_URL}${path === '/' ? '' : path}`

export const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

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

// Used until the Site Settings global is filled in from the admin panel.
// Contact details are deliberately blank: they stay hidden (and out of structured data) until real ones are entered.
export const defaultSite: SiteInfo = {
  name: "Coco's Candy Co.",
  tagline: 'Candy & Dessert Catering',
  description:
    'Candy buffets, dessert tables and custom sweets for weddings, corporate events and celebrations. Request a free catering quote.',
  hours: [],
  social: [],
}
