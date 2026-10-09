import type { Metadata } from 'next'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs, CtaBand, PageHeader, ServiceGrid } from '@/components/sections'
import { getServices, getSiteInfo } from '@/lib/content'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo()

  return pageMetadata(site, {
    title: 'Catering Services',
    description: `Candy buffets, dessert tables, wedding favors and corporate sweets from ${site.name}. Compare services and request a quote.`,
    path: '/services',
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <PageHeader
        eyebrow="Services"
        intro="Every event is different, so every package is built to order. Start with the service closest to what you have in mind."
        title="Catering services"
      >
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>
      <section className="section">
        <div className="container">
          <ServiceGrid headingLevel="h2" services={services} />
        </div>
      </section>
      <CtaBand />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}
