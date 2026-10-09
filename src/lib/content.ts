import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Service } from '@/payload-types'

import {
  defaultFaqs,
  defaultMenuItems,
  defaultServices,
  type FaqContent,
  type MenuItemContent,
  type ServiceContent,
  type TestimonialContent,
} from './defaults'
import { defaultSite, type SiteInfo } from './site'

const getClient = cache(async () => getPayload({ config }))

// Pages must still render when the database is empty or unreachable (first deploy, build without a DB).
async function withFallback<T>(label: string, query: () => Promise<T[]>, fallback: T[]): Promise<T[]> {
  try {
    const docs = await query()
    return docs.length > 0 ? docs : fallback
  } catch (error) {
    console.warn(`[content] Could not load ${label}; using starter content.`, error)
    return fallback
  }
}

const toService = (doc: Service): ServiceContent => {
  const image = typeof doc.image === 'object' ? doc.image : null

  return {
    slug: doc.slug,
    title: doc.title,
    summary: doc.summary,
    description: doc.description,
    priceFrom: doc.priceFrom || undefined,
    highlights: (doc.highlights || []).map((item) => item.text),
    image:
      image?.url && image.width && image.height
        ? { url: image.url, alt: image.alt, width: image.width, height: image.height }
        : undefined,
    seoTitle: doc.seo?.title || undefined,
    seoDescription: doc.seo?.description || undefined,
  }
}

export const getServices = cache(() =>
  withFallback(
    'services',
    async () => {
      const payload = await getClient()
      const { docs } = await payload.find({ collection: 'services', sort: 'order', limit: 100 })
      return docs.map(toService)
    },
    defaultServices,
  ),
)

export const getService = cache(async (slug: string) => {
  const services = await getServices()
  return services.find((service) => service.slug === slug)
})

export const getMenuItems = cache(() =>
  withFallback<MenuItemContent>(
    'menu items',
    async () => {
      const payload = await getClient()
      const { docs } = await payload.find({ collection: 'menu-items', sort: 'order', limit: 500 })
      return docs.map((doc) => ({
        name: doc.name,
        category: doc.category,
        description: doc.description || undefined,
        dietary: doc.dietary || [],
        price: doc.price || undefined,
      }))
    },
    defaultMenuItems,
  ),
)

// No starter testimonials: the section only appears once real ones are added.
export const getTestimonials = cache(() =>
  withFallback<TestimonialContent>(
    'testimonials',
    async () => {
      const payload = await getClient()
      const { docs } = await payload.find({ collection: 'testimonials', limit: 12 })
      return docs.map((doc) => ({
        quote: doc.quote,
        author: doc.author,
        eventType: doc.eventType || undefined,
      }))
    },
    [],
  ),
)

export const getFaqs = cache(() =>
  withFallback<FaqContent>(
    'FAQs',
    async () => {
      const payload = await getClient()
      const { docs } = await payload.find({ collection: 'faqs', sort: 'order', limit: 100 })
      return docs.map((doc) => ({ question: doc.question, answer: doc.answer }))
    },
    defaultFaqs,
  ),
)

export const getSiteInfo = cache(async (): Promise<SiteInfo> => {
  try {
    const payload = await getClient()
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    const address = settings.address
    const hasAddress = Boolean(address?.street || address?.city || address?.region)

    return {
      name: settings.businessName || defaultSite.name,
      tagline: settings.tagline || defaultSite.tagline,
      description: settings.description || defaultSite.description,
      phone: settings.phone || undefined,
      email: settings.email || undefined,
      serviceArea: settings.serviceArea || undefined,
      address: hasAddress
        ? {
            street: address?.street || undefined,
            city: address?.city || undefined,
            region: address?.region || undefined,
            postalCode: address?.postalCode || undefined,
            country: address?.country || undefined,
          }
        : undefined,
      hours: (settings.hours || []).map(({ days, hours }) => ({ days, hours })),
      social: [settings.social?.instagram, settings.social?.facebook, settings.social?.tiktok].filter(
        (url): url is string => Boolean(url),
      ),
    }
  } catch (error) {
    console.warn('[content] Could not load site settings; using defaults.', error)
    return defaultSite
  }
})
