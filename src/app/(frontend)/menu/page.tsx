import type { Metadata } from 'next'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs, CtaBand, PageHeader } from '@/components/sections'
import { getMenuItems, getSiteInfo } from '@/lib/content'
import { dietaryTags, menuCategories } from '@/lib/options'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
]

const dietaryLabel = (value: string) =>
  dietaryTags.find((tag) => tag.value === value)?.label || value

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo()

  return pageMetadata(site, {
    title: 'Catering Menu',
    description: `Browse the ${site.name} catering menu: candy bar classics, chocolates and truffles, baked sweets and seasonal specials.`,
    path: '/menu',
  })
}

export default async function MenuPage() {
  const items = await getMenuItems()
  const sections = menuCategories
    .map((category) => ({
      ...category,
      items: items.filter((item) => item.category === category.value),
    }))
    .filter((section) => section.items.length > 0)

  return (
    <>
      <PageHeader
        eyebrow="Menu"
        intro="A sample of what we can put on your table. Mix and match across categories, or ask about something you do not see."
        title="Catering menu"
      >
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>

      <section className="section">
        <div className="container menu-sections">
          {sections.map((section) => (
            <section aria-labelledby={`menu-${section.value}`} key={section.value}>
              <h2 id={`menu-${section.value}`}>{section.label}</h2>
              <ul className="menu-list">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <div className="menu-item-head">
                      <h3>{item.name}</h3>
                      {item.price && <span className="price">{item.price}</span>}
                    </div>
                    {item.description && <p>{item.description}</p>}
                    {item.dietary.length > 0 && (
                      <ul aria-label="Dietary information" className="tags">
                        {item.dietary.map((tag) => (
                          <li key={tag}>{dietaryLabel(tag)}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <CtaBand
        text="Tell us your guest count and favorites and we will build a menu and quote around them."
        title="Want a menu built for your event?"
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}
