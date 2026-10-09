import { faqs, menuItems, services, testimonials } from './data'
import { siteInfo } from './site'

// Site content lives in code: edit data.ts and site.ts, then redeploy.
// The accessors are async so a CMS or API can be slotted in later without touching the pages.

export const getServices = async () => services

export const getService = async (slug: string) => services.find((service) => service.slug === slug)

export const getMenuItems = async () => menuItems

export const getTestimonials = async () => testimonials

export const getFaqs = async () => faqs

export const getSiteInfo = async () => siteInfo
