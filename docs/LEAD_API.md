# Nest Library — Lead API Boundary (BACKEND-READY)

> Status: **frontend/API boundary implemented, no server connected yet.**
> Forms are honest about this (see `src/lib/formSubmit.ts`).

## Architecture

```text
Website form (zod-validated + sanitized)
  → submitForm() in src/lib/formSubmit.ts
    → apiClient in src/lib/api.ts
      → POST {VITE_API_BASE_URL}/api/leads/*   (when configured)
      → BACKEND_NOT_CONFIGURED                 (when empty)
    → device-local outbox (localStorage `nest-lead-outbox-v1`, best-effort)
    → WhatsApp/call handoff for instant confirmation
```

`localStorage` is a convenience outbox so details never silently disappear.
It is **not** the production database.

## Deploying the backend (remaining work)

1. Stand up the FastAPI service (outside this repo's current scope).
2. Implement these endpoints exactly:

| Method | Path                      | Body type (see `src/types/api.ts`) |
| ------ | ------------------------- | ---------------------------------- |
| POST   | `/api/leads/seat-inquiry` | `SeatInquiryPayload`               |
| POST   | `/api/leads/visit`        | `VisitBookingPayload`              |
| POST   | `/api/leads/membership`   | `MembershipInquiryPayload`         |
| POST   | `/api/leads/contact`      | `{ name, phone, message }`         |

3. Each endpoint must:
   - Re-validate everything server-side (never trust the browser).
   - Reject non-empty `company` (honeypot) silently with HTTP 200 and
     an opaque reference (do not reveal the filter to bots).
   - Persist to PostgreSQL with columns: `business_id, form_type, name, phone,
seat_type, plan, duration, preferred_date, preferred_time, purpose,
study_goal, message, source_path, utm_source, utm_medium, utm_campaign,
referrer, landing_path, device_category, status, created_at`.
   - Carry `businessId: "nest"` scope on every row (strict isolation from
     any future shared Prime/Nest platform). Ignore client-supplied
     `businessId`/`tenantId` — resolve scope server-side.
   - Respond `{ "referenceId": "<id>" }` with HTTP 200.
   - Enforce HTTPS, CORS allow-list (production domain only), per-IP rate
     limiting (e.g. 10 submissions / 10 min), 16 KB JSON body cap,
     12 s client timeout tolerance, and audit logging.
4. Set `VITE_API_BASE_URL` in hosting env vars and redeploy the frontend.
   No component changes are needed — `apiClient.isConfigured()` flips the
   forms to real server submission automatically.

## Future seams (documented, not built)

- Notification service → WhatsApp Business provider:
  `sendAdmissionConfirmation / sendVisitConfirmation / sendVisitReminder /
sendSeatConfirmation / sendPaymentConfirmation / sendRenewalReminder /
sendReviewRequest` — server-side only, never from the browser.
- Seat inventory API → availability states
  (`AVAILABLE / HELD / OCCUPIED / RESERVED / MAINTENANCE / UNAVAILABLE`)
  and the visual seat map — UI renders enquiry-based availability until then.
- Member portal, QR attendance, renewals, referrals, CRM dashboards.
