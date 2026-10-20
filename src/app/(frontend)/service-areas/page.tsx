import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { PageTransition } from '@/components/PageTransition'
import { Breadcrumbs, CtaBand, PageHeader, SectionHeading } from '@/components/sections'
import {
  activeRegions,
  areaPlace,
  areasInRegion,
  joinList,
  regions,
  serviceCounties,
} from '@/lib/areas'
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
    title: `Service Areas: ${HOME_BASE.city}, the Triangle & Ohio`,
    description: `Candy buffets and dessert tables delivered and set up in ${joinList(
      activeRegions.map(
        (region) => `${joinList(areasInRegion(region).map((area) => area.name))}, ${region}`,
      ),
    )}.`,
    path: '/service-areas',
  })
}

export default function ServiceAreasPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Service areas"
        intro={`We are based in ${HOME_BASE.city}, ${HOME_BASE.regionName} and bring candy buffets and dessert tables to events across the Triangle, with bookings in ${regions.OH.short} too. Pick your town to see how we work there.`}
        title={`Candy and dessert catering near ${HOME_BASE.city}, ${HOME_BASE.region} and in Ohio`}
      >
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>

      {activeRegions.map((region, index) => (
        <section className={cx(ui.section, index % 2 === 1 && ui.sectionTint)} key={region}>
          <div className={ui.container}>
            <SectionHeading
              eyebrow={regions[region].short}
              title={`${regions[region].name} service areas`}
            />
            <ul className={ui.cardGrid}>
              {areasInRegion(region).map((area) => (
                <li className={ui.card} key={area.slug}>
                  <p className={ui.cardKicker}>{area.county}</p>
                  <h3>
                    <Link href={`/service-areas/${area.slug}`}>{areaPlace(area)}</Link>
                  </h3>
                  <p>{area.summary}</p>
                  <span aria-hidden="true" className={ui.cardMore}>
                    Catering in {area.name} →
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className={cx(ui.section, activeRegions.length % 2 === 1 && ui.sectionTint)}>
        <div className={cx(ui.container, ui.containerNarrow, ui.prose)}>
          <h2>Counties we cover</h2>
          <p>
            We regularly travel throughout{' '}
            {joinList(
              activeRegions.map(
                (region) =>
                  `${joinList(
                    serviceCounties
                      .filter((county) => county.region === region)
                      .map((county) => county.name),
                  )} in ${regions[region].name}`,
              ),
            )}
            . If your venue is not listed here, ask anyway: tell us where the event is and we will
            let you know if we can make the trip.
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
