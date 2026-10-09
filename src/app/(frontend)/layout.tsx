import type { Metadata, Viewport } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { getServices, getSiteInfo } from '@/lib/content'
import { businessJsonLd } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'
import './styles.css'

const bodyFont = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const displayFont = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo()
  const title = `${site.name} | ${site.tagline}`

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_US',
      url: '/',
      title,
      description: site.description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fff8f1',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const [site, services] = await Promise.all([getSiteInfo(), getServices()])

  return (
    <html className={`${bodyFont.variable} ${displayFont.variable}`} lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header name={site.name} />
        <main id="main">{children}</main>
        <Footer services={services} site={site} />
        <JsonLd data={businessJsonLd(site, services)} />
      </body>
    </html>
  )
}
