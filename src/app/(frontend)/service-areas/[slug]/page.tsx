import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { PageTransition } from '@/components/PageTransition'
import {
  AreaLinks,
  Breadcrumbs,
  CtaBand,
  FaqList,
  HowItWorks,
  PageHeader,
  SectionHeading,
  ServiceGrid,
} from '@/components/sections'
import { areaPlace, getServiceArea, regions, serviceAreas } from '@/lib/areas'
import { getFaqs, getServices, getSiteInfo } from '@/lib/content'
import { areaJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/lib/seo'
import { phoneHref, quoteHref } from '@/lib/site'
import { cx } from '@/lib/cx'
import ui from '@/styles/ui.module.scss'

type Props = {
  params: Promise<{ slug: string }>
}

// Site-wide questions that apply to every area, shown after the area's own.
const sharedFaqQuestions = [
  'How does pricing work?',
  'Can you accommodate allergies and dietary needs?',
  'Can the sweets match my theme or brand colors?',
]

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = getServiceArea(slug)
  if (!area) return {}
  const site = await getSiteInfo()
  const place = areaPlace(area)

  return pageMetadata(site, {
    title: `Candy Buffets & Dessert Tables in ${place}`,
    description: `Candy buffet & dessert table catering in ${place}. ${area.summary}`,
    path: `/service-areas/${area.slug}`,
  })
}

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params
  const area = getServiceArea(slug)
  if (!area) notFound()

  const [site, services, siteFaqs] = await Promise.all([getSiteInfo(), getServices(), getFaqs()])
  const place = areaPlace(area)
  const quote = quoteHref(place)
  const faqs = [
    ...area.faqs,
    ...siteFaqs.filter((faq) => sharedFaqQuestions.includes(faq.question)),
  ]
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: place, path: `/service-areas/${area.slug}` },
  ]
  // Nearby areas in the same state first, then everywhere else.
  const others = [
    ...serviceAreas.filter((other) => other.slug !== area.slug && other.region === area.region),
    ...serviceAreas.filter((other) => other.region !== area.region),
  ]

  return (
    <PageTransition>
      <PageHeader
        actions={
          <>
            <Link className={ui.button} href={quote}>
              Get a free quote in {area.name}
            </Link>
            {site.phone && (
              <a className={cx(ui.button, ui.buttonOutline)} href={phoneHref(site.phone)}>
                Call {site.phone}
              </a>
            )}
          </>
        }
        eyebrow={`${area.county}, ${regions[area.region].name}`}
        intro={area.summary}
        title={`Candy buffets and dessert tables in ${place}`}
      >
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>

      <section className={ui.section}>
        <div className={cx(ui.container, ui.split)}>
          <div className={ui.prose}>
            {area.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h2>Also serving near {area.name}</h2>
            <ul className={cx(ui.tags, ui.tagsLarge)}>
              {area.nearby.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          <aside className={ui.card}>
            <h2>Popular in {area.name}</h2>
            <ul className={ui.checkList}>
              {area.occasions.map((occasion) => (
                <li key={occasion}>{occasion}</li>
              ))}
            </ul>
            <Link className={ui.button} href={quote}>
              Request a quote
            </Link>
          </aside>
        </div>
      </section>

      <section className={cx(ui.section, ui.sectionTint)}>
        <div className={ui.container}>
          <SectionHeading
            text="Every package is built to order. Start with the service closest to what you have in mind."
            title={`Catering services available in ${area.name}`}
          />
          <ServiceGrid services={services} />
        </div>
      </section>

      <section className={ui.section}>
        <div className={ui.container}>
          <SectionHeading
            eyebrow="Simple from start to finish"
            title={`How booking works in ${area.name}`}
          />
          <HowItWorks />
        </div>
      </section>

      <section className={cx(ui.section, ui.sectionTint)}>
        <div className={cx(ui.container, ui.containerNarrow)}>
          <SectionHeading title={`Questions about catering in ${area.name}`} />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section className={ui.section}>
        <div className={ui.container}>
          <SectionHeading title="Other areas we serve" />
          <AreaLinks areas={others} showRegion />
        </div>
      </section>

      <CtaBand
        href={quote}
        text={`Tell us the date, the venue in or around ${area.name} and the guest count. We will confirm availability and reply with a tailored quote.`}
        title={`Planning an event in ${area.name}?`}
      />
      <JsonLd data={areaJsonLd(area)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </PageTransition>
  )
}
