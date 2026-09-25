# Nest Library Website — Architecture

> Frontend foundation phase. No final pages, backend, CRM, dashboards, auth,
> payments, AI, or production messaging integrations yet.

## Stack and dependency rationale

| Dependency                                           | Why it exists                                                                                                                                                                                          |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `react`, `react-dom`                                 | UI runtime (v19).                                                                                                                                                                                      |
| `react-router-dom` (v7)                              | Client routing; central route table in `src/routes/`.                                                                                                                                                  |
| `lucide-react`                                       | Icon set; icons referenced by string keys in `data/`.                                                                                                                                                  |
| `motion`                                             | Primary animation system, imported as `motion/react`. Subtle reveals, staggers, gestures, lightbox. No GSAP, no second animation library.                                                              |
| `react-hook-form` + `zod` + `@hookform/resolvers`    | Conversion forms (seat inquiry, book-a-visit, membership) with structured validation. Schemas live in `src/lib/formSchemas.ts`; submission goes through `src/lib/formSubmit.ts`. No backend wired yet. |
| `clsx` + `tailwind-merge`                            | `cn()` helper: conditional classes with Tailwind conflict resolution.                                                                                                                                  |
| `class-variance-authority`                           | Variant API for future component variants (button-style `cva` patterns). Reserved for the UI build; primitives already follow its conventions.                                                         |
| Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`) | Styling via the Vite plugin; tokens defined in `@theme` inside `src/styles/tokens.css`. No v3 config file, no UI framework.                                                                            |

Dev: `typescript` (strict), `vite`, `@vitejs/plugin-react`, `eslint`
(`@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`,
`eslint-config-prettier`), `prettier`, `vitest` + `jsdom` +
`@testing-library/{react,jest-dom,user-event}`, `@playwright/test` (smoke only).

Deliberately NOT installed (§45–46): UI frameworks, GSAP, extra routers,
extra form libs, state managers, data-fetching libs, axios, database clients,
backend packages, Firebase/Supabase, payment/WhatsApp/AI SDKs, map SDKs.

## Folder structure

```text
src/
├── app/            # App shell: App, providers, router
├── assets/         # Source-committed static assets (fonts/images as needed)
├── components/
│   ├── business/   # FacilityCard, SeatCard, PricingCard, FAQItem, GalleryItem,
│   │               # TestimonialCard, CTASection, ContactCard, TrustBadge
│   ├── common/     # ErrorBoundary, Seo, ResponsiveImage, ScrollToTop, …
│   ├── feedback/   # LoadingState, LoadingGrid (+ EmptyState/ErrorState re-export)
│   ├── forms/      # Generic accessible field wrappers (FormField)
│   ├── gallery/    # Gallery, GalleryGrid, Lightbox
│   ├── integrations/ # WhatsApp*, CallButton, EmailButton, GoogleMap,
│   │               # GetDirectionsButton, LocationCard
│   ├── layout/     # Structural header / footer (temporary, not final design)
│   ├── motion/     # FadeIn, Reveal, Stagger(+Item), ScaleIn, SlideIn,
│   │               # PageTransition, HoverLift, TapScale
│   ├── navigation/ # Config-driven primary navigation
│   ├── sections/   # Generic section scaffolds
│   └── ui/         # Button, IconButton, Container, Section, Card, Badge,
│                   # Divider, Input, Textarea, Select, Label, Checkbox,
│                   # RadioGroup, FormField, Spinner, Skeleton, FeedbackStates
├── config/         # site, contact, business, navigation, seo (placeholders flagged)
├── data/           # facilities, seats, plans, faq, gallery, testimonials (typed)
├── hooks/          # useDocumentTitle, usePrefersReducedMotion, useMediaQuery
├── layouts/        # RootLayout, PageContainer
├── lib/            # cn, env, seo, urls, analytics, whatsapp, motion tokens,
│                   # formSchemas (zod), formSubmit, api (backend boundary)
├── pages/          # Foundation home, generic placeholder, 404
├── routes/         # Route table + path constants (incl. /membership,
│                   # /seats/regular, /seats/confirmed, /book-a-visit)
├── styles/         # tokens.css (design tokens), globals.css (base),
│                   # motion.css (transitions + reduced-motion)
├── types/          # content, navigation, common, api, forms
├── __tests__/      # App smoke test (vitest)
└── main.tsx        # Entry point
```

`@/` maps to `src/` (vite alias + tsconfig paths).

## Design system

Semantic tokens in `src/styles/tokens.css` (`@theme`): typography scale
(display → label, Inter), colors (background/foreground/primary/secondary/
muted/card/border/accent/success/warning/destructive), spacing rhythm
(section 4rem mobile / 6rem desktop), radius (sm/md/lg/xl/full), subtle
shadows. Components consume tokens, never raw values. Calm/premium/focused;
no glassmorphism, no heavy gradients.

## Motion system

Tokens: `src/lib/motion.ts` (durations instant→slow, delays, easings,
springs, stagger, viewport thresholds, hover-lift, tap-scale, reveal preset).
Primitives: `src/components/motion/Motion.tsx`. All honour
`prefers-reduced-motion` (movement removed, feedback retained); CSS fallback
in `src/styles/motion.css`. Rule: CSS for trivial hover/color; Motion for
viewport entry, sequencing, gestures, layout.

## Validation

Zod schemas in `src/lib/formSchemas.ts` cover seat-inquiry, book-visit,
membership-inquiry and contact fields (§18). Forms will use
`@hookform/resolvers/zod`. Frontend validation is UX-only; backend
re-validates. Submission abstraction: `src/lib/formSubmit.ts` →
`src/lib/api.ts` (`apiClient`, typed `src/types/api.ts`, `isConfigured()`
false until FastAPI exists). Multi-tenant (`businessId`/`tenantId`) is a
backend concern; the UI only carries the optional scope fields.

## Integrations

All numbers/URLs live in `src/config/contact.ts` (+ `VITE_*` env overrides);
components never hardcode them. Placeholders resolve to `#contact-fallback` /
`#location` so demo data can't look real.
WhatsApp: `src/lib/whatsapp.ts` (intent templates, `encodeURIComponent`,
`wa.me` links) + `WhatsAppButton`/`WhatsAppCTA`/`FloatingWhatsApp`.
Phone: `tel:` via `CallButton`. Email: `mailto:` via `EmailButton`.
Maps: `GoogleMap` (embed URL or labelled placeholder, no API key) +
`GetDirectionsButton` (shareable URL) + `LocationCard`.
Analytics: `src/lib/analytics.ts` — `trackEvent()` with a pluggable adapter;
provider connected later, secrets never in source.

## SEO / local

`Seo` component + `src/lib/seo.ts` (titles, canonical) + `src/config/seo.ts`
(defaults, `schemaReady` flags — all false until real content exists).
`robots.txt` + placeholder `sitemap.xml`; Search Console token empty until a
property is connected. Local SEO fields are structured but unfilled — nothing
invented.
