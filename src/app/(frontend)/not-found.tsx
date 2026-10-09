import Link from 'next/link'
import React from 'react'
import { cx } from '@/lib/cx'
import sections from '@/components/sections.module.scss'
import ui from '@/styles/ui.module.scss'

export const metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className={sections.pageHeader}>
      <div className={ui.container}>
        <p className={ui.eyebrow}>404</p>
        <h1>We couldn’t find that page</h1>
        <p className={ui.lead}>It may have moved, or the link may be out of date.</p>
        <div className={ui.buttonRow}>
          <Link className={ui.button} href="/">
            Back to home
          </Link>
          <Link className={cx(ui.button, ui.buttonOutline)} href="/services">
            Browse services
          </Link>
        </div>
      </div>
    </section>
  )
}
