'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import { cx } from '@/lib/cx'
import { navLinks } from '@/lib/site'
import ui from '@/styles/ui.module.scss'

import styles from './Header.module.scss'

export function Header({ name }: { name: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    // The transition name keeps the header still while page content animates between routes.
    <header className={styles.siteHeader} style={{ viewTransitionName: 'site-header' }}>
      <div className={cx(ui.container, styles.headerInner)}>
        <Link className={styles.brand} href="/" onClick={close}>
          {name}
        </Link>
        <button
          aria-controls="site-nav"
          aria-expanded={open}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className={styles.navToggle}
          onClick={() => setOpen(!open)}
          type="button"
        >
          <span aria-hidden="true" className={styles.navToggleBars} />
        </button>
        <nav aria-label="Main" className={styles.siteNav} data-open={open} id="site-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
                  href={link.href}
                  onClick={close}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link className={ui.button} href="/contact" onClick={close}>
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  )
}
