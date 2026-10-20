import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { areaPlace, type ServiceArea } from '@/lib/areas'
import { getSiteInfo } from '@/lib/content'
import { cx } from '@/lib/cx'
import type { FaqContent, ServiceContent } from '@/lib/data'
import type { Photo } from '@/lib/photos'
import { phoneHref, quoteHref } from '@/lib/site'
import ui from '@/styles/ui.module.scss'

import styles from './sections.module.scss'

export function PageHeader({
  eyebrow,
  title,
  intro,
  actions,
  children,
}: {
  eyebrow?: string
  title: string
  intro?: string
  // Calls to action shown under the intro.
  actions?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className={styles.pageHeader}>
      <div className={ui.container}>
        {children}
        {eyebrow && <p className={ui.eyebrow}>{eyebrow}</p>}
        <h1>{title}</h1>
        {intro && <p className={ui.lead}>{intro}</p>}
        {actions && <div className={ui.buttonRow}>{actions}</div>}
      </div>
    </section>
  )
}

export function Breadcrumbs({ crumbs }: { crumbs: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
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
    <ul className={ui.cardGrid}>
      {services.map((service) => (
        <li className={ui.card} key={service.slug}>
          {service.image && (
            <div className={ui.cardMedia}>
              <Image
                alt={service.image.alt}
                height={service.image.height}
                sizes="(min-width: 860px) 280px, (min-width: 600px) 50vw, 100vw"
                src={service.image.url}
                width={service.image.width}
              />
            </div>
          )}
          <Heading>
            <Link href={`/services/${service.slug}`}>{service.title}</Link>
          </Heading>
          {service.tagline && <p className={ui.cardKicker}>{service.tagline}</p>}
          <p>{service.summary}</p>
          {service.priceFrom && <p className={ui.price}>From {service.priceFrom}</p>}
          <span aria-hidden="true" className={ui.cardMore}>
            Learn more →
          </span>
        </li>
      ))}
    </ul>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string
  title: string
  text?: string
}) {
  return (
    <div className={styles.sectionHeading}>
      {eyebrow && <p className={ui.eyebrow}>{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export function Gallery({ photos }: { photos: Photo[] }) {
  return (
    <ul className={styles.gallery}>
      {photos.map((photo) => (
        <li key={photo.url}>
          <figure>
            <Image
              alt={photo.alt}
              height={photo.height}
              sizes="(min-width: 860px) 60vw, 100vw"
              src={photo.url}
              width={photo.width}
            />
            {photo.caption && <figcaption>{photo.caption}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  )
}

// Decorative scrolling ribbon. The items repeat so the loop is seamless, and it is hidden from assistive tech
// because the same information is in the page content.
export function Marquee({ items }: { items: string[] }) {
  return (
    <div aria-hidden="true" className={styles.marquee}>
      <ul className={styles.marqueeTrack}>
        {[...items, ...items].map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export function AreaLinks({
  areas,
  showRegion = false,
}: {
  areas: ServiceArea[]
  // Label each link "Durham, NC" rather than "Durham", for lists that span more than one state.
  showRegion?: boolean
}) {
  return (
    <ul className={ui.linkList}>
      {areas.map((area) => (
        <li key={area.slug}>
          <Link href={`/service-areas/${area.slug}`}>
            {showRegion ? areaPlace(area) : area.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const defaultSteps = [
  {
    title: 'Tell us about your event',
    text: 'Share your date, venue, guest count and the look you are going for.',
  },
  {
    title: 'Get a tailored quote',
    text: 'We suggest sweets and styling to fit your event and budget, and send an itemized quote.',
  },
  {
    title: 'We set up, you celebrate',
    text: 'On the day we deliver, style the table and take it all down afterwards.',
  },
]

export function HowItWorks({
  steps = defaultSteps,
}: {
  steps?: { title: string; text: string }[]
}) {
  return (
    <ol className={styles.steps}>
      {steps.map((step) => (
        <li key={step.title}>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  )
}

export function FaqList({ faqs }: { faqs: FaqContent[] }) {
  return (
    <div className={styles.faqList}>
      {faqs.map((faq) => (
        <details key={faq.question}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}

export async function CtaBand({
  title = 'Planning an event?',
  text = 'Tell us the date, the guest count and what you have in mind. We will reply with a tailored quote.',
  href = quoteHref(),
}: {
  title?: string
  text?: string
  href?: string
}) {
  const { phone } = await getSiteInfo()

  return (
    <section className={styles.ctaBand}>
      <div className={ui.container}>
        <h2>{title}</h2>
        <p>{text}</p>
        <Link className={cx(ui.button, ui.buttonLight)} href={href}>
          Request a free quote
        </Link>
        {phone && (
          <p className={styles.ctaPhone}>
            Prefer to talk? Call <a href={phoneHref(phone)}>{phone}</a>
          </p>
        )}
      </div>
    </section>
  )
}
