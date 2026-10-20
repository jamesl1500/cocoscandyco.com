import type { Metadata } from 'next'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { PageTransition } from '@/components/PageTransition'
import { Breadcrumbs, CtaBand, PageHeader } from '@/components/sections'
import { getMenuItems, getSiteInfo } from '@/lib/content'
import { dietaryTags, menuCategories } from '@/lib/options'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'
import { HOME_BASE } from '@/lib/site'
import { cx } from '@/lib/cx'
import ui from '@/styles/ui.module.scss'

import styles from './menu.module.scss'

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
    description: `Our catering menu: charcuterie and grazing, candy bar classics, chocolates and truffles, baked sweets and seasonal specials for events in ${HOME_BASE.city} and beyond.`,
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
    <PageTransition>
      <PageHeader
        eyebrow="Menu"
        intro="A sample of what we can put on your table. Mix and match across categories, or ask about something you do not see."
        title="Catering menu"
      >
        <Breadcrumbs crumbs={crumbs} />
      </PageHeader>

      <section className={ui.section}>
        <div className={cx(ui.container, styles.menuSections)}>
          {sections.map((section) => (
            <section aria-labelledby={`menu-${section.value}`} key={section.value}>
              <h2 id={`menu-${section.value}`}>{section.label}</h2>
              <ul className={styles.menuList}>
                {section.items.map((item) => (
                  <li key={item.name}>
                    <div className={styles.menuItemHead}>
                      <h3>{item.name}</h3>
                      {item.price && <span className={ui.price}>{item.price}</span>}
                    </div>
                    {item.description && <p>{item.description}</p>}
                    {item.dietary.length > 0 && (
                      <ul aria-label="Dietary information" className={ui.tags}>
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
    </PageTransition>
  )
}
