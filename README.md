# Coco's Couture Candy Co.

Marketing site for a candy and dessert caterer based in Chapel Hill, NC. Next.js (App Router), statically rendered, with no CMS or database.

## Development

```bash
pnpm install
cp .env.example .env   # then fill in RESEND_API_KEY
pnpm dev               # http://localhost:3000
```

| Command         | What it does                                                   |
| --------------- | -------------------------------------------------------------- |
| `pnpm dev`      | Start the dev server                                           |
| `pnpm build`    | Production build (every page is prerendered)                   |
| `pnpm lint`     | ESLint                                                         |
| `pnpm test:int` | Unit and integration tests (Vitest)                            |
| `pnpm test:e2e` | Browser tests (Playwright); run `npx playwright install` first |

## Editing content

Content lives in code. Edit, commit and redeploy.

| What                                             | Where               |
| ------------------------------------------------ | ------------------- |
| Business name, phone, email, social links, hours | `src/lib/site.ts`   |
| Services, menu, FAQs, testimonials               | `src/lib/data.ts`   |
| City pages under `/service-areas`                | `src/lib/areas.ts`  |
| Photos (files in `public/images`)                | `src/lib/photos.ts` |

Each city page needs its own copy. Pages that differ only by city name are treated as doorway pages by search engines.

## Styling

SCSS modules, mobile-first.

- `src/styles/globals.scss`: design tokens, resets, base typography and route-transition rules. Nothing else is global.
- `src/styles/_mixins.scss`: breakpoints, motion guards, scroll reveal and shared keyframes.
- `src/styles/ui.module.scss`: shared primitives (container, section, button, card, tags).
- A `.module.scss` beside each component or page for everything specific to it.

All motion is CSS-only and switched off under `prefers-reduced-motion`.

## Quote form

`src/app/(frontend)/contact/` validates the form in a server action and emails the request through [Resend](https://resend.com). Nothing is stored, so the email is the only record: if sending fails, the visitor is told and asked to call.

## Deploying to Vercel

Import the repository; no build settings are needed. Set these environment variables:

| Variable               | Required | Notes                                                                        |
| ---------------------- | -------- | ---------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | yes      | Without it the quote form cannot send                                        |
| `NEXT_PUBLIC_SITE_URL` | no       | Defaults to `https://www.cocoscandyco.com`                                   |
| `EMAIL_FROM_ADDRESS`   | no       | Defaults to `quotes@cocoscandyco.com`; the domain must be verified in Resend |
| `INQUIRY_NOTIFY_EMAIL` | no       | Defaults to the business email in `src/lib/site.ts`                          |
