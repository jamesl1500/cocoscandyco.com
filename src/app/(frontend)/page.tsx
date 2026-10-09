import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { CtaBand, FaqList, ServiceGrid } from '@/components/sections'
import { getFaqs, getServices, getSiteInfo, getTestimonials } from '@/lib/content'
import { faqJsonLd, pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo()

  return pageMetadata(site, {
    title: `${site.name} | ${site.tagline}`,
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

export default async function HomePage() {
  const [site, services, testimonials, faqs] = await Promise.all([
    getSiteInfo(),
    getServices(),
    getTestimonials(),
    getFaqs(),
  ])

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">{site.tagline}</p>
          <h1>Candy buffets and dessert tables that make the party</h1>
          <p className="lead">
            {site.name} caters weddings, corporate events and celebrations
            {site.serviceArea ? ` across ${site.serviceArea}` : ''} with sweets styled to your colors
            and theme.
          </p>
          <div className="button-row">
            <Link className="button" href="/contact">
              Request a free quote
            </Link>
            <Link className="button button-outline" href="/menu">
              See the menu
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Catering services</h2>
            <p>From a single candy bar to sweets for the whole event.</p>
          </div>
          <ServiceGrid services={services} />
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-heading">
            <h2>How it works</h2>
          </div>
          <ol className="steps">
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
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <h2>What clients say</h2>
            </div>
            <ul className="card-grid">
              {testimonials.map((testimonial) => (
                <li className="card" key={testimonial.quote}>
                  <figure className="testimonial">
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

      <section className="section">
        <div className="container container-narrow">
          <div className="section-heading">
            <h2>Frequently asked questions</h2>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CtaBand />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  )
}
