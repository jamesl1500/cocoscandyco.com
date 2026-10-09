import type { Metadata } from 'next'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs, CtaBand, PageHeader } from '@/components/sections'
import { getSiteInfo } from '@/lib/content'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

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
    description: `Meet ${site.name}: candy and dessert catering built around your event, with sweets chosen for flavor and styled to your theme.`,
    path: '/about',
  })
}

export default async function AboutPage() {
  const site = await getSiteInfo()

  return (
    <>
      <PageHeader
        eyebrow="About"
        intro="We believe the sweets table should be the part of the party people talk about afterwards."
        title={`About ${site.name}`}
      >
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>

      <section className="section">
        <div className="container container-narrow prose">
          {/* TODO: replace with the real story — who runs the business, when it started and why. */}
          <p>
            {site.name} is a catering company devoted to the sweet side of events. We design candy
            buffets and dessert tables for weddings, company events and family celebrations
            {site.serviceArea ? ` throughout ${site.serviceArea}` : ''}.
          </p>
          <p>
            Each event starts with a conversation about what you are celebrating and how you want it
            to feel. From there we choose the sweets, plan the display and take care of delivery and
            setup.
          </p>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-heading">
            <h2>What you can expect</h2>
          </div>
          <ul className="card-grid">
            {values.map((value) => (
              <li className="card" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}
