import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="page-header">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>We couldn’t find that page</h1>
        <p className="lead">It may have moved, or the link may be out of date.</p>
        <div className="button-row">
          <Link className="button" href="/">
            Back to home
          </Link>
          <Link className="button button-outline" href="/services">
            Browse services
          </Link>
        </div>
      </div>
    </section>
  )
}
