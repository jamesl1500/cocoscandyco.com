import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs, CtaBand, PageHeader } from '@/components/sections'
import { getService, getServices, getSiteInfo } from '@/lib/content'
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from '@/lib/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [site, service] = await Promise.all([getSiteInfo(), getService(slug)])
  if (!service) return {}

  return pageMetadata(site, {
    title: service.seoTitle || `${service.title} Catering`,
    description: service.seoDescription || service.summary,
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const [site, service, services] = await Promise.all([
    getSiteInfo(),
    getService(slug),
    getServices(),
  ])
  if (!service) notFound()

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
  ]
  const others = services.filter((other) => other.slug !== service.slug)

  return (
    <>
      <PageHeader eyebrow="Catering service" intro={service.summary} title={service.title}>
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>

      <section className="section">
        <div className="container split">
          <div className="prose">
            {service.image && (
              <Image
                alt={service.image.alt}
                className="service-image"
                height={service.image.height}
                priority
                sizes="(min-width: 900px) 640px, 100vw"
                src={service.image.url}
                width={service.image.width}
              />
            )}
            {service.description.split(/\n\s*\n/).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="card">
            <h2>What’s included</h2>
            {service.highlights.length > 0 && (
              <ul className="check-list">
                {service.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            {service.priceFrom && <p className="price">From {service.priceFrom}</p>}
            <Link className="button" href="/contact">
              Request a quote
            </Link>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section section-tint">
          <div className="container">
            <div className="section-heading">
              <h2>Other services</h2>
            </div>
            <ul className="link-list">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={`/services/${other.slug}`}>{other.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand title={`Interested in ${service.title.toLowerCase()}?`} />
      <JsonLd data={serviceJsonLd(site, service)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}
