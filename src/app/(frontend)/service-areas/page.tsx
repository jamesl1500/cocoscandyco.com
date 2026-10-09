import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { PageTransition } from '@/components/PageTransition'
import { Breadcrumbs, CtaBand, PageHeader } from '@/components/sections'
import { serviceAreas, serviceCounties } from '@/lib/areas'
import { getSiteInfo } from '@/lib/content'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'
import { HOME_BASE } from '@/lib/site'
import { cx } from '@/lib/cx'
import ui from '@/styles/ui.module.scss'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Service Areas', path: '/service-areas' },
]

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo()

  return pageMetadata(site, {
    title: `Service Areas: ${HOME_BASE.city}, Durham & the Triangle`,
    description: `${site.name} delivers and sets up candy buffets and dessert tables in ${HOME_BASE.city}, Carrboro, Durham, Hillsborough, Pittsboro, Cary, Raleigh and Mebane, NC.`,
    path: '/service-areas',
  })
}

export default function ServiceAreasPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Service areas"
        intro={`We are based in ${HOME_BASE.city}, ${HOME_BASE.regionName} and bring candy buffets and dessert tables to events across the Triangle. Pick your town to see how we work there.`}
        title={`Candy and dessert catering near ${HOME_BASE.city}, ${HOME_BASE.region}`}
      >
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>

      <section className={ui.section}>
        <div className={ui.container}>
          <ul className={ui.cardGrid}>
            {serviceAreas.map((area) => (
              <li className={ui.card} key={area.slug}>
                <p className={ui.cardKicker}>{area.county}</p>
                <h2>
                  <Link href={`/service-areas/${area.slug}`}>
                    {area.name}, {HOME_BASE.region}
                  </Link>
                </h2>
                <p>{area.summary}</p>
                <span aria-hidden="true" className={ui.cardMore}>
                  Catering in {area.name} →
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={cx(ui.section, ui.sectionTint)}>
        <div className={cx(ui.container, ui.containerNarrow, ui.prose)}>
          <h2>Counties we cover</h2>
          <p>
            We regularly travel throughout {serviceCounties.slice(0, -1).join(', ')} and{' '}
            {serviceCounties[serviceCounties.length - 1]}. If your venue is not listed here, ask
            anyway: tell us where the event is and we will let you know if we can make the trip.
          </p>
        </div>
      </section>

      <CtaBand
        text="Tell us the date, the venue and the guest count. We will confirm we can reach you and reply with a tailored quote."
        title="Is your venue on our route?"
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </PageTransition>
  )
}
