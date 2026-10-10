import type { Metadata } from 'next'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { PageTransition } from '@/components/PageTransition'
import { Breadcrumbs, CtaBand, PageHeader, ServiceGrid } from '@/components/sections'
import { getServices, getSiteInfo } from '@/lib/content'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'
import { HOME_BASE } from '@/lib/site'
import ui from '@/styles/ui.module.scss'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo()

  return pageMetadata(site, {
    title: `Candy & Dessert Catering Services in ${HOME_BASE.label}`,
    description: `Charcuterie boards, grazing tables, candy buffets, dessert tables and wedding favors in ${HOME_BASE.city} and the Triangle from ${site.name}. Compare services and request a quote.`,
    path: '/services',
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Services"
        intro={`Every event is different, so every package is built to order. Start with the service closest to what you have in mind. We cater across ${HOME_BASE.city} and the Triangle.`}
        title="Catering services"
      >
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>
      <section className={ui.section}>
        <div className={ui.container}>
          <ServiceGrid headingLevel="h2" services={services} />
        </div>
      </section>
      <CtaBand />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </PageTransition>
  )
}
