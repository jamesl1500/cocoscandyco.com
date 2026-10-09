import Link from 'next/link'
import React from 'react'

import type { ServiceContent } from '@/lib/defaults'
import { navLinks, type SiteInfo } from '@/lib/site'

const socialLabel = (url: string) => {
  if (url.includes('instagram')) return 'Instagram'
  if (url.includes('facebook')) return 'Facebook'
  if (url.includes('tiktok')) return 'TikTok'
  return 'Social'
}

export function Footer({ site, services }: { site: SiteInfo; services: ServiceContent[] }) {
  const { address } = site

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="brand">{site.name}</p>
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
                <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>{site.phone}</a>
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
      <div className="container footer-legal">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}
