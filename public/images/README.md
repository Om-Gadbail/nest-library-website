# Nest Library — real photography drop map

> Status: **no authentic Nest photos are committed yet.** The website
> intentionally renders honest branded placeholders instead of stock
> imagery. Drop real photos here — no code changes needed beyond adding
> one entry per photo to `src/data/gallery.ts`.

## Where files go

```
public/images/
├── nest-hero-study-hall.jpg        # Homepage hero (wide interior)
├── nest-entrance.jpg               # Building / entrance / signboard
├── nest-exterior.jpg               # Exterior context
├── nest-study-hall-wide.jpg        # Full study hall rows
├── nest-regular-seats.jpg          # Regular seating area
├── nest-confirmed-seats.jpg        # Confirmed / dedicated seats
├── nest-desk-closeup.jpg           # Desk + chair detail
├── nest-lighting.jpg               # Lighting detail
├── nest-cooling.jpg                # Air-cooling / comfort detail
├── nest-wifi-corner.jpg            # Study-environment detail
├── nest-facilities.jpg             # Facilities / convenience space
└── nest-atmosphere.jpg             # Member-safe environmental shot
```

## Rules for every photo

1. **Real Nest photos only** — never commit stock imagery as Nest.
2. Preferred: JPEG quality ~80, max width 1920px; the build serves them
   as-is, so keep each file under ~300 KB.
3. Member faces only with **written consent**; prefer empty-room or
   over-the-shoulder environmental shots otherwise.
4. Landscape orientation; 4:3 or 16:10 works with the gallery grid.
5. After dropping a file, register it in `src/data/gallery.ts`:
   `{ id, src: "/images/nest-study-hall-wide.jpg", alt: "…", title: "…",
category: "study-space", isPlaceholder: false }` with meaningful alt text.
6. The hero panel (`src/components/sections/Hero.tsx`) has a marked
   "real photography slot" — point it at `/images/nest-hero-study-hall.jpg`
   once available and set `lazy={false}` (eager, above the fold).
