import type { MetadataRoute } from 'next'

import { serviceAreas } from '@/lib/areas'
import { getServices } from '@/lib/content'
import { absoluteUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices()

  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/services'), changeFrequency: 'monthly', priority: 0.9 },
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: absoluteUrl('/service-areas'), changeFrequency: 'monthly', priority: 0.8 },
    ...serviceAreas.map((area) => ({
      url: absoluteUrl(`/service-areas/${area.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: absoluteUrl('/menu'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/contact'), changeFrequency: 'yearly', priority: 0.7 },
    { url: absoluteUrl('/about'), changeFrequency: 'yearly', priority: 0.5 },
  ]
}
