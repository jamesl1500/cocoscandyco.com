'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import { navLinks } from '@/lib/site'

export function Header({ name }: { name: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" onClick={close}>
          {name}
        </Link>
        <button
          aria-controls="site-nav"
          aria-expanded={open}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          type="button"
        >
          <span aria-hidden="true" className="nav-toggle-bars" />
        </button>
        <nav aria-label="Main" className="site-nav" data-open={open} id="site-nav">
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
          <Link className="button" href="/contact" onClick={close}>
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  )
}
