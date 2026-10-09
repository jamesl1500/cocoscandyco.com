import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { PageTransition } from '@/components/PageTransition'
import {
  AreaLinks,
  CtaBand,
  FaqList,
  Gallery,
  Marquee,
  SectionHeading,
  ServiceGrid,
} from '@/components/sections'
import { serviceAreas, serviceCounties } from '@/lib/areas'
import { getFaqs, getServices, getSiteInfo, getTestimonials } from '@/lib/content'
import { galleryPhotos, photos } from '@/lib/photos'
import { faqJsonLd, pageMetadata } from '@/lib/seo'
import { HOME_BASE } from '@/lib/site'
import { cx } from '@/lib/cx'
import ui from '@/styles/ui.module.scss'

import styles from './home.module.scss'

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo()

  return pageMetadata(site, {
    title: `${site.tagline} in ${HOME_BASE.label} | ${site.name}`,
    description: site.description,
    path: '/',
    absoluteTitle: true,
  })
}

const steps = [
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

const heroPoints = ['Styled to your colors', 'Delivery, setup and teardown', 'Free itemized quotes']

const ribbon = [
  'Candy buffets',
  'Dessert tables',
  'Wedding favors',
  'Chocolate-covered pretzels',
  'Rice crispy treats',
  'Graduation parties',
  'Baby showers',
  'Corporate gifting',
]

export default async function HomePage() {
  const [site, services, testimonials, faqs] = await Promise.all([
    getSiteInfo(),
    getServices(),
    getTestimonials(),
    getFaqs(),
  ])

  return (
    <PageTransition>
      <section className={styles.hero}>
        <div className={cx(ui.container, styles.heroInner)}>
          <div className={styles.heroCopy}>
            <p className={ui.eyebrow}>
              {site.tagline} · {HOME_BASE.label}
            </p>
            <h1>Candy buffets and dessert tables for Chapel Hill and the Triangle</h1>
            <p className={ui.lead}>
              {site.name} caters weddings, graduations, corporate events and celebrations
              {site.serviceArea ? ` across ${site.serviceArea}` : ''} with sweets styled to your
              colors and theme.
            </p>
            <div className={ui.buttonRow}>
              <Link className={ui.button} href="/contact">
                Request a free quote
              </Link>
              <Link className={cx(ui.button, ui.buttonOutline)} href="/menu">
                See the menu
              </Link>
            </div>
            <ul className={styles.heroPoints}>
              {heroPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className={styles.heroMedia}>
            <Image
              alt={photos.jars.alt}
              className={styles.heroPhoto}
              height={photos.jars.height}
              priority
              sizes="(min-width: 860px) 520px, 100vw"
              src={photos.jars.url}
              width={photos.jars.width}
            />
            <Image
              alt={photos.treats.alt}
              className={styles.heroPhotoAccent}
              height={photos.treats.height}
              sizes="(min-width: 860px) 200px, 34vw"
              src={photos.treats.url}
              width={photos.treats.width}
            />
          </div>
        </div>
      </section>

      <Marquee items={ribbon} />

      <section className={ui.section}>
        <div className={ui.container}>
          <SectionHeading
            eyebrow="What we do"
            text="From a single candy bar to sweets for the whole event."
            title="Catering services"
          />
          <ServiceGrid services={services} />
        </div>
      </section>

      <section className={cx(ui.section, ui.sectionTint)}>
        <div className={ui.container}>
          <SectionHeading
            eyebrow="Recent tables"
            text="Every table is planned around the event: the palette, the guest list and the sweets people actually reach for."
            title="Made to match your celebration"
          />
          <Gallery photos={galleryPhotos} />
        </div>
      </section>

      <section className={ui.section}>
        <div className={ui.container}>
          <SectionHeading eyebrow="Simple from start to finish" title="How it works" />
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className={cx(ui.section, ui.sectionTint)}>
          <div className={ui.container}>
            <SectionHeading eyebrow="Kind words" title="What clients say" />
            <ul className={ui.cardGrid}>
              {testimonials.map((testimonial) => (
                <li className={ui.card} key={testimonial.quote}>
                  <figure className={styles.testimonial}>
                    <blockquote>
                      <p>{testimonial.quote}</p>
                    </blockquote>
                    <figcaption>
                      {testimonial.author}
                      {testimonial.eventType && <span> · {testimonial.eventType}</span>}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className={cx(ui.section, ui.sectionButter)}>
        <div className={ui.container}>
          <SectionHeading
            eyebrow="Where we cater"
            text={`Based in ${HOME_BASE.city}, ${HOME_BASE.regionName}, we deliver and set up across ${serviceCounties
              .map((county) => county.replace(' County', ''))
              .join(', ')
              .replace(/, ([^,]*)$/, ' and $1')} counties.`}
            title={`Serving ${HOME_BASE.city} and the Triangle`}
          />
          <AreaLinks areas={serviceAreas} />
        </div>
      </section>

      <section className={ui.section}>
        <div className={cx(ui.container, ui.containerNarrow)}>
          <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CtaBand />
      <JsonLd data={faqJsonLd(faqs)} />
    </PageTransition>
  )
}
