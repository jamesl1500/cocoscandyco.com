import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { PageTransition } from '@/components/PageTransition'
import { AreaLinks, Breadcrumbs, CtaBand, PageHeader, SectionHeading } from '@/components/sections'
import { serviceAreas } from '@/lib/areas'
import { getService, getServices, getSiteInfo } from '@/lib/content'
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from '@/lib/seo'
import { HOME_BASE } from '@/lib/site'
import { cx } from '@/lib/cx'
import sections from '@/components/sections.module.scss'
import ui from '@/styles/ui.module.scss'

import styles from './service.module.scss'

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
    title: service.seoTitle || `${service.title} in ${HOME_BASE.label}`,
    description:
      service.seoDescription ||
      `${service.summary} Serving ${HOME_BASE.city}, Durham and the Triangle, ${HOME_BASE.region}.`,
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const [service, services] = await Promise.all([getService(slug), getServices()])
  if (!service) notFound()

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
  ]
  const others = services.filter((other) => other.slug !== service.slug)

  return (
    <PageTransition>
      <PageHeader eyebrow="Catering service" intro={service.summary} title={service.title}>
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>

      <section className={ui.section}>
        <div className={cx(ui.container, ui.split)}>
          <div className={ui.prose}>
            {service.image && (
              <Image
                alt={service.image.alt}
                className={styles.serviceImage}
                height={service.image.height}
                priority
                sizes="(min-width: 860px) 640px, 100vw"
                src={service.image.url}
                width={service.image.width}
              />
            )}
            {service.description.split(/\n\s*\n/).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className={ui.card}>
            <h2>What’s included</h2>
            {service.highlights.length > 0 && (
              <ul className={ui.checkList}>
                {service.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            {service.priceFrom && <p className={ui.price}>From {service.priceFrom}</p>}
            <Link className={ui.button} href="/contact">
              Request a quote
            </Link>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className={cx(ui.section, ui.sectionTint)}>
          <div className={ui.container}>
            <div className={sections.sectionHeading}>
              <h2>Other services</h2>
            </div>
            <ul className={ui.linkList}>
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={`/services/${other.slug}`}>{other.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className={ui.section}>
        <div className={ui.container}>
          <SectionHeading
            text={`We deliver and set up ${service.title.toLowerCase()} across ${HOME_BASE.city} and the Triangle.`}
            title={`${service.title} near you`}
          />
          <AreaLinks areas={serviceAreas} />
        </div>
      </section>

      <CtaBand title={`Interested in ${service.title.toLowerCase()}?`} />
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </PageTransition>
  )
}
