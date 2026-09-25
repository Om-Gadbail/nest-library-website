# Nest Library Website

Professional self-study / focused-work environment website for **Nest Library**.

> **Current phase: frontend foundation.** This repository contains the
> production-grade frontend architecture only — configuration, design tokens,
> reusable primitives, layouts, routing and placeholder pages. The final
> homepage, visual navbar/footer, animations, backend, CRM, payments and
> integrations arrive in later phases.

## Tech stack

- React 19 + TypeScript (strict)
- Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router 7 (`react-router-dom`)
- Lucide React icons
- Motion (`motion`, imported as `motion/react`) — subtle reveals, staggers, gestures
- Forms: `react-hook-form` + `zod` + `@hookform/resolvers` (schemas ready, no backend yet)
- Utilities: `clsx` + `tailwind-merge` (`cn()`), `class-variance-authority` (variant patterns)

No backend, database, state-management, analytics-provider, payment or AI
dependencies — added deliberately in later stages only. See
`docs/ARCHITECTURE.md` for the full dependency rationale.

## Local setup

Prerequisites: Node.js ≥ 20.19 and npm.

```powershell
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## Scripts

| Command             | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the Vite development server        |
| `npm run build`     | Type-check (`tsc -b`) + production build |
| `npm run preview`   | Preview the production build locally     |
| `npm run typecheck` | Type-check without emitting (`tsc`)      |
| `npm run lint`      | Run ESLint                               |
| `npm run format`    | Format with Prettier                     |
| `npm test`          | Run Vitest unit/component tests          |
| `npm run test:e2e`  | Run Playwright smoke tests               |

Full workflow details: `docs/DEVELOPMENT.md`. Architecture notes:
`docs/ARCHITECTURE.md`.

## Project structure

```text
src/
├── app/            # App shell: App, router, providers
├── assets/         # (future) static assets committed with source
├── components/
│   ├── business/   # FacilityCard, SeatCard, PricingCard, FAQItem, …
│   ├── common/     # ErrorBoundary, Seo, ResponsiveImage, ScrollToTop, …
│   ├── feedback/   # LoadingState, EmptyState, ErrorState
│   ├── forms/      # Generic accessible field wrappers
│   ├── gallery/    # Gallery, GalleryGrid, Lightbox
│   ├── integrations/ # WhatsApp, Call, Email, GoogleMap, Directions, Location
│   ├── layout/     # Structural header / footer (temporary, not final design)
│   ├── motion/     # FadeIn, Reveal, Stagger, ScaleIn, SlideIn, PageTransition, …
│   ├── navigation/ # Config-driven primary navigation
│   ├── sections/   # Generic section scaffolds
│   └── ui/         # Reusable primitives (Button, Card, Input, Checkbox, …)
├── config/         # site, navigation, contact, business, seo (placeholders marked)
├── data/           # facilities, seats, plans, faq, gallery, testimonials (typed)
├── hooks/          # useDocumentTitle, usePrefersReducedMotion, useMediaQuery
├── layouts/        # RootLayout, PageContainer
├── lib/            # cn, env, seo, urls, analytics, whatsapp, motion tokens,
│                   # formSchemas (zod), formSubmit, api (backend boundary)
├── pages/          # Foundation home, generic placeholder, 404
├── routes/         # Route table + path constants
├── styles/         # tokens.css (design tokens), globals.css (base), motion.css
├── types/          # content, navigation, common, api, forms
├── __tests__/      # App smoke test (vitest)
└── main.tsx        # Entry point
```

## Configuration over hardcoding

Business information lives in `src/config/` (`site.ts`, `contact.ts`,
`business.ts`, `navigation.ts`) and content shapes in `src/data/`. Components
consume these modules — never hardcode phone numbers, addresses, timings,
prices or URLs in UI.

All placeholder values are flagged with `isPlaceholder: true` and must be
replaced with verified facts before launch. Prices/availability are nullable
so nothing fake is presented as real.

## Routes

`/` plus placeholder routes for every planned page (`/about`, `/facilities`,
`/seats`, `/seats/regular`, `/seats/confirmed`, `/membership`
(+ legacy `/membership-plans` alias), `/study-environment`, `/photos`,
`/rules`, `/faq`, `/location`, `/admission`, `/contact`) and conversion
routes (`/seat-inquiry`, `/book-a-visit` (+ `/book-visit` alias), `/join`,
`/membership-inquiry`). Unknown paths render the 404 page. Extend in
`src/routes/appRoutes.tsx` (paths defined in `src/config/navigation.ts`).

## Environment

Copy `.env.example` to `.env` for local overrides. Only `VITE_`-prefixed
variables reach the browser; never put secrets in source.

## What remains unfinished (later phases)

- Final homepage, hero, pricing, facilities, gallery and testimonial UI
- Final navbar / footer visual design
- Applying motion primitives to real pages (architecture is ready)
- Wiring forms to the FastAPI backend (schemas + submission boundary ready)
- Real business content (copy, prices, photos, timings, rules)
- Backend, CRM, database, dashboard, payments, WhatsApp API, AI
- Search Console property connection, analytics provider, PWA evaluation
