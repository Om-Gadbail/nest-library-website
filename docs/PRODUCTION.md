# Nest Library — Production Readiness

> One page that answers: what is LIVE, what is CONFIG-READY, what needs
> OWNER INPUT, what needs EXTERNAL CREDENTIALS, and the exact steps to
> launch. Nothing here is aspirational — statuses reflect the repository.

## 1. Real-data boundary

| Feature                  | Status               | Why                                       | Required input                               |
| ------------------------ | -------------------- | ----------------------------------------- | -------------------------------------------- |
| Phone / WhatsApp         | LIVE                 | Verified `917038201884`, central config   | —                                            |
| Pricing + offer          | LIVE (config-driven) | Approved poster data, tested              | Owner toggles `openingOffer.active` to end   |
| Contact forms            | BACKEND-READY        | Honest device-outbox + WhatsApp handoff   | `VITE_API_BASE_URL` + FastAPI deploy         |
| Database                 | BACKEND-READY        | Contract in `docs/LEAD_API.md`            | Postgres host + FastAPI deploy               |
| Owner dashboard          | ARCHITECTURE ONLY    | Typed seam in `src/lib/adminApi.ts`       | Backend admin endpoints + auth               |
| WhatsApp automation      | PROVIDER-READY       | Contract in `src/lib/whatsappProvider.ts` | WhatsApp Business provider credentials       |
| Real photography         | NEEDS OWNER ASSETS   | Honest placeholders live                  | Photos per `public/images/README.md`         |
| Google Maps embed        | CONFIG-READY         | Empty = honest placeholder                | Shareable embed URL → `VITE_GOOGLE_MAPS_URL` |
| Directions button        | CONFIG-READY         | Hidden until configured (no dead CTA)     | Share URL → `VITE_GOOGLE_DIRECTIONS_URL`     |
| Email CTA                | CONFIG-READY         | Hidden until configured                   | Business email → `VITE_EMAIL`                |
| Hours                    | NEEDS OWNER INPUT    | Never invented; "on enquiry" state        | Day-by-day timings                           |
| Rules                    | NEEDS OWNER INPUT    | Empty list = honest coming-soon state     | Confirmed community guidelines               |
| Reviews/testimonials     | NEEDS REAL DATA      | Empty = honest empty state                | Google/member reviews with consent           |
| Seat map / QR / payments | FUTURE               | Types in `src/types/domain.ts` only       | Backend + provider + owner enablement        |
| Analytics provider       | CONFIG-READY         | Abstraction + PII guard live              | Measurement ID → `VITE_ANALYTICS_ID`         |
| Search Console           | NEEDS OWNER ACTION   | Sitemap/robots/canonical ready            | Property + verification token                |

## 2. Environment variables (hosting)

| Variable                     | Purpose                    | Empty behavior                           |
| ---------------------------- | -------------------------- | ---------------------------------------- |
| `VITE_SITE_URL`              | Canonical + sitemap origin | Canonical tags omitted (safe)            |
| `VITE_WHATSAPP_NUMBER`       | Override WhatsApp number   | Falls back to central `917038201884`     |
| `VITE_PHONE_NUMBER`          | Display phone override     | Falls back to central config             |
| `VITE_EMAIL`                 | Business email             | Email CTAs hidden                        |
| `VITE_GOOGLE_MAPS_URL`       | Maps embed URL             | Honest map placeholder                   |
| `VITE_GOOGLE_DIRECTIONS_URL` | Directions URL             | Directions buttons hidden                |
| `VITE_API_BASE_URL`          | FastAPI origin             | Device-outbox mode (honest)              |
| `VITE_ANALYTICS_ID`          | Analytics measurement ID   | Tracking queued locally, never breaks UI |

Never commit `.env`. Only `VITE_`-prefixed keys reach the browser.

## 3. Backend deploy (FastAPI + PostgreSQL)

1. Create the service per `docs/LEAD_API.md`:
   `POST /api/leads/seat-inquiry|visit|membership|contact`.
2. Server must: re-validate everything, persist with `businessId="nest"`,
   enforce HTTPS + CORS allow-list (production domain only), rate-limit
   (~10 submissions / 10 min / IP), 16 KB JSON body cap, audit-log writes.
3. Client contract already hardened: 12 s timeout with retry UI,
   `businessId` attached, attribution (`utm_*`, referrer, landing path,
   device class) attached, honeypot-filtered, no PII in analytics.
4. Set `VITE_API_BASE_URL` in hosting env, redeploy frontend — no code
   changes needed (`apiClient.isConfigured()` flips automatically).

## 4. WhatsApp automation (when ready)

1. Choose a provider (Meta Cloud API / Interakt / Gupshup / Twilio).
2. Keep credentials in **server** env vars only.
3. Implement the contract in `src/lib/whatsappProvider.ts`
   (templates, idempotency, webhook verification, audit log).
4. Get templates approved before first send; record opt-in.

## 5. Launch checklist

- [ ] Set `VITE_SITE_URL` to the production origin.
- [ ] Replace `example.com` in `public/sitemap.xml` + `public/robots.txt`
      with the production domain and redeploy.
- [ ] Add Google Search Console property; submit `/sitemap.xml`;
      set the verification token in `seoConfig.searchConsoleVerification`.
- [ ] Confirm SPA fallback rewrites on the host (all routes serve `index.html`).
- [ ] Confirm HTTPS + security headers on the host (HSTS, CSP, X-Frame-Options).
- [ ] Drop real photos per `public/images/README.md` (optional for launch).
- [ ] Fill owner inputs (hours, rules, email, maps) when available.

## 6. To update Nest content (no JSX edits)

- Phone/WhatsApp/email/address/maps → `src/config/contact.ts` (+ env overrides)
- Prices → `src/data/pricing.ts` (everything derives from here)
- Opening offer on/off → `openingOffer.active` in `src/data/offers.ts`
- Facilities/FAQ/seats/gallery/testimonials → `src/data/*.ts`
- Hours note → `src/config/business.ts`
- Navigation/routes → `src/config/navigation.ts`
