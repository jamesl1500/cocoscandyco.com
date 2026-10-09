import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { PageTransition } from '@/components/PageTransition'
import {
  AreaLinks,
  Breadcrumbs,
  CtaBand,
  PageHeader,
  SectionHeading,
  ServiceGrid,
} from '@/components/sections'
import { getServiceArea, serviceAreas } from '@/lib/areas'
import { getServices, getSiteInfo } from '@/lib/content'
import { areaJsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/seo'
import { HOME_BASE } from '@/lib/site'
import { cx } from '@/lib/cx'
import ui from '@/styles/ui.module.scss'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = getServiceArea(slug)
  if (!area) return {}
  const site = await getSiteInfo()

  return pageMetadata(site, {
    title: `Candy Buffets & Dessert Tables in ${area.name}, ${HOME_BASE.region}`,
    description: `Candy buffet and dessert table catering in ${area.name}, ${HOME_BASE.region} from ${site.name}. ${area.summary}`,
    path: `/service-areas/${area.slug}`,
  })
}

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params
  const area = getServiceArea(slug)
  if (!area) notFound()

  const services = await getServices()
  const place = `${area.name}, ${HOME_BASE.region}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: place, path: `/service-areas/${area.slug}` },
  ]
  const others = serviceAreas.filter((other) => other.slug !== area.slug)

  return (
    <PageTransition>
      <PageHeader
        eyebrow={`${area.county}, ${HOME_BASE.regionName}`}
        intro={area.summary}
        title={`Candy buffets and dessert tables in ${place}`}
      >
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>

      <section className={ui.section}>
        <div className={cx(ui.container, ui.split)}>
          <div className={ui.prose}>
            {area.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h2>Also serving near {area.name}</h2>
            <ul className={cx(ui.tags, ui.tagsLarge)}>
              {area.nearby.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          <aside className={ui.card}>
            <h2>Popular in {area.name}</h2>
            <ul className={ui.checkList}>
              {area.occasions.map((occasion) => (
                <li key={occasion}>{occasion}</li>
              ))}
            </ul>
            <Link className={ui.button} href="/contact">
              Request a quote
            </Link>
          </aside>
        </div>
      </section>

      <section className={cx(ui.section, ui.sectionTint)}>
        <div className={ui.container}>
          <SectionHeading
            text="Every package is built to order. Start with the service closest to what you have in mind."
            title={`Catering services available in ${area.name}`}
          />
          <ServiceGrid services={services} />
        </div>
      </section>

      <section className={ui.section}>
        <div className={ui.container}>
          <SectionHeading title="Other areas we serve" />
          <AreaLinks areas={others} />
        </div>
      </section>

      <CtaBand title={`Planning an event in ${area.name}?`} />
      <JsonLd data={areaJsonLd(area)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </PageTransition>
  )
}
