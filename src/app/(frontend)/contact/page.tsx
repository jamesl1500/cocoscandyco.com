import type { Metadata } from 'next'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { PageTransition } from '@/components/PageTransition'
import { Breadcrumbs, PageHeader } from '@/components/sections'
import { getSiteInfo } from '@/lib/content'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'
import { HOME_BASE, phoneHref, socialLabel } from '@/lib/site'

import { QuoteForm } from './QuoteForm'
import { cx } from '@/lib/cx'
import ui from '@/styles/ui.module.scss'

import styles from './contact.module.scss'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
]

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo()

  return pageMetadata(site, {
    title: `Request a Catering Quote in ${HOME_BASE.label}`,
    description: `Tell ${site.name} about your event and get a free, tailored quote for candy buffets, dessert tables and custom sweets in ${HOME_BASE.city} and the Triangle.`,
    path: '/contact',
  })
}

export default async function ContactPage() {
  const site = await getSiteInfo()
  const { address } = site
  const hasDetails = Boolean(
    site.phone || site.email || address || site.hours.length > 0 || site.social.length > 0,
  )

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Contact"
        intro="Share a few details about your event and we will reply with ideas and an itemized quote."
        title="Request a catering quote"
      >
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>

      <section className={ui.section}>
        <div
          className={hasDetails ? cx(ui.container, ui.split) : cx(ui.container, ui.containerNarrow)}
        >
          <QuoteForm />

          {hasDetails && (
            <aside className={ui.card}>
              <h2>Prefer to talk?</h2>
              <ul className={styles.contactList}>
                {site.phone && (
                  <li>
                    <span>Phone</span>
                    <a href={phoneHref(site.phone)}>{site.phone}</a>
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
                {site.social.map((url) => (
                  <li key={url}>
                    <span>{socialLabel(url)}</span>
                    <a href={url} rel="noopener noreferrer" target="_blank">
                      @{url.replace(/\/+$/, '').split('/').pop()}
                    </a>
                  </li>
                ))}
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
    </PageTransition>
  )
}
