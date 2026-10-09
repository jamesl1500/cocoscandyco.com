import type { Metadata } from 'next'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs, PageHeader } from '@/components/sections'
import { getSiteInfo } from '@/lib/content'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

import { QuoteForm } from './QuoteForm'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
]

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo()

  return pageMetadata(site, {
    title: 'Request a Catering Quote',
    description: `Tell ${site.name} about your event and get a free, tailored quote for candy buffets, dessert tables and custom sweets.`,
    path: '/contact',
  })
}

export default async function ContactPage() {
  const site = await getSiteInfo()
  const { address } = site
  const hasDetails = Boolean(site.phone || site.email || address || site.hours.length > 0)

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        intro="Share a few details about your event and we will reply with ideas and an itemized quote."
        title="Request a catering quote"
      >
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>

      <section className="section">
        <div className={hasDetails ? 'container split' : 'container container-narrow'}>
          <QuoteForm />

          {hasDetails && (
            <aside className="card">
              <h2>Prefer to talk?</h2>
              <ul className="contact-list">
                {site.phone && (
                  <li>
                    <span>Phone</span>
                    <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>{site.phone}</a>
                  </li>
                )}
                {site.email && (
                  <li>
                    <span>Email</span>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </li>
                )}
                {address && (
                  <li>
                    <span>Address</span>
                    <address>
                      {address.street && (
                        <>
                          {address.street}
                          <br />
                        </>
                      )}
                      {[address.city, address.region].filter(Boolean).join(', ')}{' '}
                      {address.postalCode}
                    </address>
                  </li>
                )}
                {site.hours.length > 0 && (
                  <li>
                    <span>Hours</span>
                    {site.hours.map((row) => (
                      <div key={row.days}>
                        {row.days}: {row.hours}
                      </div>
                    ))}
                  </li>
                )}
              </ul>
            </aside>
          )}
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}
