import type { Metadata } from 'next'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { PageTransition } from '@/components/PageTransition'
import { Breadcrumbs, CtaBand, PageHeader } from '@/components/sections'
import { getSiteInfo } from '@/lib/content'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'
import { HOME_BASE } from '@/lib/site'
import { cx } from '@/lib/cx'
import sections from '@/components/sections.module.scss'
import ui from '@/styles/ui.module.scss'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

const values = [
  {
    title: 'Made for your event',
    text: 'No fixed packages. We plan the sweets, colors and styling around your date, venue and guests.',
  },
  {
    title: 'Sweets worth eating',
    text: 'A table has to taste as good as it looks, so we choose every item for flavor first.',
  },
  {
    title: 'Easy to work with',
    text: 'Clear quotes, quick replies and a setup you do not have to think about on the day.',
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo()

  return pageMetadata(site, {
    title: 'About Us',
    description: `Meet ${site.name}, a ${HOME_BASE.label} candy and dessert caterer. Sweets chosen for flavor and styled to your theme, across the Triangle.`,
    path: '/about',
  })
}

export default async function AboutPage() {
  const site = await getSiteInfo()

  return (
    <PageTransition>
      <PageHeader
        eyebrow="About"
        intro="We believe the sweets table should be the part of the party people talk about afterwards."
        title={`About ${site.name}`}
      >
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>

      <section className={ui.section}>
        <div className={cx(ui.container, ui.containerNarrow, ui.prose)}>
          {/* TODO: replace with the real story — who runs the business, when it started and why. */}
          <p>
            {site.name} is a {HOME_BASE.city}, {HOME_BASE.regionName} catering company devoted to
            the sweet side of events. We design candy buffets and dessert tables for weddings,
            company events and family celebrations
            {site.serviceArea ? ` throughout ${site.serviceArea}` : ''}.
          </p>
          <p>
            Each event starts with a conversation about what you are celebrating and how you want it
            to feel. From there we choose the sweets, plan the display and take care of delivery and
            setup.
          </p>
        </div>
      </section>

      <section className={cx(ui.section, ui.sectionTint)}>
        <div className={ui.container}>
          <div className={sections.sectionHeading}>
            <h2>What you can expect</h2>
          </div>
          <ul className={ui.cardGrid}>
            {values.map((value) => (
              <li className={ui.card} key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </PageTransition>
  )
}
