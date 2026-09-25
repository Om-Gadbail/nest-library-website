# Nest Library Website — Development Guide

## Prerequisites

Node.js ≥ 20.19 and npm. Verify with `node --version` and `npm --version`.

## Run

```powershell
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## Build and preview

```powershell
npm run build
npm run preview
```

## Quality gates

```powershell
npm run typecheck   # TypeScript, no emit
npm run lint        # ESLint
npm run lint:fix    # ESLint with auto-fix
npm run format:check
npm run format      # Prettier write
npm test            # Vitest (single run)
npm run test:watch  # Vitest watch mode
npm run test:e2e    # Playwright smoke (needs `npx playwright install`)
```

## Environment

Copy `.env.example` to `.env` for local overrides. Only `VITE_`-prefixed
variables reach the browser; never put secrets in source. All keys are
optional — empty means "unconfigured" and components degrade to safe
placeholders (`#contact-fallback`, `#location`).

## Adding a page

1. Create the component in `src/pages/` (e.g. `AboutPage.tsx`), using `Seo`
   for title/description.
2. Swap it into `src/routes/appRoutes.tsx`, replacing the matching
   `PlaceholderPage` entry. Keep the path in `src/config/navigation.ts`
   (`routePaths`) — never hardcode paths in components.
3. Add nav labels to `navigationConfig` if the page appears in navigation.

## Adding a component

- Generic primitive → `src/components/ui/` (semantic HTML, typed props,
  keyboard-accessible, `cn()` for classes).
- Page-level state → `src/components/feedback/`.
- Conversion/integration → `src/components/integrations/`.
- Business card → `src/components/business/`, reading typed `src/data/`.
- Animation → compose `src/components/motion/` primitives with
  `src/lib/motion.ts` tokens. Respect reduced motion (handled by primitives).
- Export new modules through the folder's `index.ts` where one exists.

## Adding business data

1. Extend the type in `src/types/content.ts` if needed (prices/availability
   stay nullable).
2. Add entries in `src/data/*.ts` with `isPlaceholder: true` until verified.
3. Never invent prices, addresses, timings, or reviews. Placeholder UI shows a
   `Placeholder` badge so demo content can't be mistaken for facts.
4. Centralize contact facts in `src/config/` — never hardcode phone numbers,
   emails, addresses, or URLs in components.
