import Link from 'next/link'
import React from 'react'

import type { FaqContent, ServiceContent } from '@/lib/defaults'

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string
  title: string
  intro?: string
  children?: React.ReactNode
}) {
  return (
    <section className="page-header">
      <div className="container">
        {children}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {intro && <p className="lead">{intro}</p>}
      </div>
    </section>
  )
}

export function Breadcrumbs({ crumbs }: { crumbs: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {crumbs.map((crumb, index) => (
          <li key={crumb.path}>
            {index < crumbs.length - 1 ? (
              <Link href={crumb.path}>{crumb.name}</Link>
            ) : (
              <span aria-current="page">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function ServiceGrid({
  services,
  headingLevel: Heading = 'h3',
}: {
  services: ServiceContent[]
  headingLevel?: 'h2' | 'h3'
}) {
  return (
    <ul className="card-grid">
      {services.map((service) => (
        <li className="card" key={service.slug}>
          <Heading>
            <Link href={`/services/${service.slug}`}>{service.title}</Link>
          </Heading>
          <p>{service.summary}</p>
          {service.priceFrom && <p className="price">From {service.priceFrom}</p>}
          <span aria-hidden="true" className="card-more">
            Learn more →
          </span>
        </li>
      ))}
    </ul>
  )
}

export function FaqList({ faqs }: { faqs: FaqContent[] }) {
  return (
    <div className="faq-list">
      {faqs.map((faq) => (
        <details key={faq.question}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}

export function CtaBand({
  title = 'Planning an event?',
  text = 'Tell us the date, the guest count and what you have in mind. We will reply with a tailored quote.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="cta-band">
      <div className="container">
        <h2>{title}</h2>
        <p>{text}</p>
        <Link className="button button-light" href="/contact">
          Request a free quote
        </Link>
      </div>
    </section>
  )
}
