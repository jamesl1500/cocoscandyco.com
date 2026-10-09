import type { Metadata } from 'next'

import type { FaqContent, ServiceContent } from './defaults'
import { absoluteUrl, type SiteInfo } from './site'

const BUSINESS_ID = absoluteUrl('/#business')

type PageSeo = {
  title: string
  description: string
  path: string
  // Use the title exactly as given instead of appending the site name.
  absoluteTitle?: boolean
}

// Per-page metadata. Open Graph is rebuilt in full because Next.js replaces, rather than merges, nested metadata objects.
export function pageMetadata(site: SiteInfo, { title, description, path, absoluteTitle }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_US',
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  }
}

export function businessJsonLd(site: SiteInfo, services: ServiceContent[]) {
  const { address } = site

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: site.name,
    description: site.description,
    url: absoluteUrl('/'),
    telephone: site.phone,
    email: site.email,
    areaServed: site.serviceArea,
    address: address && {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    sameAs: site.social.length > 0 ? site.social : undefined,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catering services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.summary,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
    },
  }
}

export function serviceJsonLd(site: SiteInfo, service: ServiceContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    serviceType: 'Catering',
    url: absoluteUrl(`/services/${service.slug}`),
    image: service.image ? absoluteUrl(service.image.url) : undefined,
    areaServed: site.serviceArea,
    provider: { '@id': BUSINESS_ID },
  }
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export function faqJsonLd(faqs: FaqContent[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}
