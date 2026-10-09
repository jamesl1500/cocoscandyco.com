import Link from 'next/link'
import React from 'react'

import { serviceAreas } from '@/lib/areas'
import type { ServiceContent } from '@/lib/data'
import { navLinks, phoneHref, socialLabel, type SiteInfo } from '@/lib/site'
import { cx } from '@/lib/cx'
import ui from '@/styles/ui.module.scss'

import styles from './Footer.module.scss'

export function Footer({ site, services }: { site: SiteInfo; services: ServiceContent[] }) {
  const { address } = site

  return (
    <footer className={styles.siteFooter}>
      <div className={cx(ui.container, styles.footerGrid)}>
        <div>
          <p className={styles.brand}>{site.name}</p>
          <p>{site.tagline}</p>
          {site.serviceArea && <p>Serving {site.serviceArea}</p>}
        </div>

        <nav aria-label="Services">
          <h2>Services</h2>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Service areas">
          <h2>Areas we serve</h2>
          <ul>
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link href={`/service-areas/${area.slug}`}>{area.name}, NC</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer">
          <h2>Explore</h2>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2>Get in touch</h2>
          <ul>
            {site.phone && (
              <li>
                <a href={phoneHref(site.phone)}>{site.phone}</a>
              </li>
            )}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            )}
            {address && (
              <li>
                <address>
                  {address.street && (
                    <>
                      {address.street}
                      <br />
                    </>
                  )}
                  {[address.city, address.region].filter(Boolean).join(', ')} {address.postalCode}
                </address>
              </li>
            )}
            {site.hours.map((row) => (
              <li key={row.days}>
                {row.days}: {row.hours}
              </li>
            ))}
            <li>
              <Link href="/contact">Request a quote</Link>
            </li>
            {site.social.map((url) => (
              <li key={url}>
                <a href={url} rel="noopener noreferrer" target="_blank">
                  {socialLabel(url)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={cx(ui.container, styles.footerLegal)}>
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>
          Designed by <Link href="https://www.foundryframe.com">Foundry Frame</Link>
        </p>
      </div>
    </footer>
  )
}
