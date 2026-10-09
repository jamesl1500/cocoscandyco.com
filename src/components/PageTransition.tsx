import React, { ViewTransition } from 'react'

// Fades and lifts page content on route changes. It has to wrap each page rather than the layout:
// layouts persist across navigations, so enter and exit never fire there.
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition default="none" enter="page-enter" exit="page-exit">
      <div className="page">{children}</div>
    </ViewTransition>
  )
}
