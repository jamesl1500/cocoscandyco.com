# Claude Code

A statically rendered Next.js site with no CMS or database. Content lives in `src/lib/data.ts`, `src/lib/site.ts` and `src/lib/areas.ts`.
Styling is SCSS modules: shared primitives in `src/styles/ui.module.scss`, design tokens and resets in `src/styles/globals.scss`, mixins in `src/styles/_mixins.scss`.
The quote form (`src/app/(frontend)/contact/`) emails requests through Resend.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
