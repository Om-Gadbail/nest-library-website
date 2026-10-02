/**
 * Nest Library — backend boundary (LIVE canonical backend).
 *
 * Architecture: Website → apiClient → shared FastAPI → database/CRM.
 * UI code depends on these typed methods — never on fetch() in components.
 *
 * Canonical contract (same platform as Prime Fitness, `nest` tenant):
 *   POST /api/v1/public/nest/leads      (Idempotency-Key required)
 *   POST /api/v1/public/nest/bookings   (Idempotency-Key required)
 *   GET  /api/v1/public/nest/config
 *
 * `VITE_API_BASE_URL` is the BARE backend host (e.g.
 * http://localhost:8000) — the tenant path is appended here, never
 * configured. Tenant identity comes from the URL slug server-side: NO
 * `businessId` / `business_id` / `slug` is ever sent in a payload
 * (stripped defensively; the backend ignores unknown fields anyway).
 *
 * When VITE_API_BASE_URL is empty, methods resolve BACKEND_NOT_CONFIGURED
 * so forms degrade honestly (device outbox + WhatsApp handoff).
 */

import type {
  ApiResult,
  AttributedPayload,
  LeadAttribution,
  MembershipInquiryPayload,
  SeatInquiryPayload,
  VisitBookingPayload,
} from "../types/api.ts";
import { env } from "./env.ts";
import { coldStartDelay, isColdStartStatus } from "./readiness.ts";

/** Wall-clock budget per submission (ms). The UI surfaces retry on expiry. */
const REQUEST_TIMEOUT_MS = 12_000;

/** Client-side request-size guard (bytes of JSON). The server enforces its own limit. */
const MAX_JSON_BYTES = 16 * 1024;

/**
 * Strict tenant scope: every Nest request is addressed to the `nest`
 * public path. Path scope only — never serialized into a payload.
 */
const BUSINESS_SLUG = "nest";

function baseUrl(): string {
  const raw = env.apiBaseUrl ?? "";
  return raw.replace(/\/+$/, "");
}

function makeIdempotencyKey(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
  } catch {
    // fall through to the timestamp fallback below
  }
  return `web-${String(Date.now())}-${String(Math.floor(Math.random() * 1e9))}`;
}

function attributionOf(
  attribution: LeadAttribution | undefined,
): Record<string, string> {
  return {
    landing_page: attribution?.landingPath ?? "",
    referrer: attribution?.referrer ?? "",
    utm_source: attribution?.utmSource ?? "",
    utm_medium: attribution?.utmMedium ?? "",
    utm_campaign: attribution?.utmCampaign ?? "",
  };
}

/** Backend success envelope for public intake (lead or booking). */
interface IntakeSuccess {
  lead_id?: string;
  booking_id?: string;
  message?: string;
}

async function postPublicOnce(
  path: "leads" | "bookings",
  payload: object,
  idempotencyKey?: string,
): Promise<ApiResult<{ referenceId: string }>> {
  const base = baseUrl();
  if (!base) return { ok: false, error: "BACKEND_NOT_CONFIGURED" };
  let body: string;
  try {
    body = JSON.stringify(payload);
  } catch {
    return { ok: false, error: "VALIDATION_ERROR", detail: "unserializable" };
  }
  if (body.length > MAX_JSON_BYTES) {
    return { ok: false, error: "PAYLOAD_TOO_LARGE" };
  }
  const controller = new AbortController();
  const timer = window.setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${base}/api/v1/public/${BUSINESS_SLUG}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey ?? makeIdempotencyKey(),
      },
      body,
      signal: controller.signal,
    });
    if (response.status === 422 || response.status === 400) {
      return { ok: false, error: "VALIDATION_ERROR", detail: String(response.status) };
    }
    if (!response.ok) {
      return {
        ok: false,
        error: "SERVER_ERROR",
        detail: String(response.status),
      };
    }
    const data = (await response.json()) as unknown as IntakeSuccess;
    const referenceId =
      (typeof data.lead_id === "string" && data.lead_id) ||
      (typeof data.booking_id === "string" && data.booking_id) ||
      "received";
    return { ok: true, data: { referenceId } };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, error: "TIMEOUT_ERROR" };
    }
    return { ok: false, error: "NETWORK_ERROR" };
  } finally {
    window.clearTimeout(timer);
  }
}

type IncomingRecord = Record<string, unknown>;

/**
 * Pick a trimmed string field from a loosely-typed form record.
 * Tenant-identity keys (`businessId`, `business_id`, `tenantId`, `slug`,
 * …) are NEVER picked up: every body below is built field-by-field, so a
 * forged tenant key in form data cannot reach the wire by construction.
 * The tenant comes from the URL path, not the payload.
 */
function pick(record: IncomingRecord, key: string, max = 500): string {
  const value = record[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function honeypotOf(record: IncomingRecord): string {
  // The visible forms name the hidden trap field `company`.
  return pick(record, "company", 500);
}

function emailOrNull(record: IncomingRecord): string | null {
  const email = pick(record, "email", 200);
  return email.includes("@") ? email : null;
}

function contextLine(parts: Array<string | undefined>): string {
  return parts.filter((part) => part && part.trim().length > 0).join(" · ");
}

function buildLeadBody(
  record: IncomingRecord,
  opts: {
    serviceInterest: string;
    sourceDetail: string;
    preferredTime?: string;
    extraContext?: string;
  },
): Record<string, unknown> {
  const message = pick(record, "message", 2000);
  const context = contextLine([opts.extraContext, pick(record, "source", 80)
    ? `Heard via: ${pick(record, "source", 80)}`
    : ""]);
  return {
    name: pick(record, "name", 200),
    phone: pick(record, "phone", 32),
    email: emailOrNull(record),
    message: context ? `${message}\n[${context}]`.trim() : message,
    service_interest: opts.serviceInterest,
    source_detail: opts.sourceDetail,
    preferred_time: opts.preferredTime ?? "",
    consent_marketing: false,
    ...attributionOf((record["attribution"] as LeadAttribution | undefined) ?? undefined),
    website_url: honeypotOf(record),
  };
}

export const apiClient = {
  getBaseUrl(): string {
    return baseUrl();
  },

  isConfigured(): boolean {
    return baseUrl().length > 0;
  },

  submitSeatInquiry(
    payload: SeatInquiryPayload,
  ): Promise<ApiResult<{ referenceId: string }>> {
    const record = payload as unknown as IncomingRecord;
    return postPublic(
      "leads",
      buildLeadBody(record, {
        serviceInterest: "Seat Inquiry",
        sourceDetail: "website:seat-inquiry-form",
        preferredTime: pick(record, "timing", 120),
        extraContext: contextLine([
          pick(record, "occupation", 40),
          pick(record, "seatPreference", 80),
          pick(record, "duration", 40),
          pick(record, "examGoal", 120),
        ]),
      }),
    );
  },

  submitVisitBooking(
    payload: VisitBookingPayload,
  ): Promise<ApiResult<{ referenceId: string }>> {
    const record = payload as unknown as IncomingRecord;
    const preferredDate = pick(record, "preferredDate", 20);
    return postPublic("bookings", {
      name: pick(record, "name", 200),
      phone: pick(record, "phone", 32),
      email: emailOrNull(record),
      booking_type: "visit",
      title: "Visit request",
      requested_start_at: preferredDate ? `${preferredDate}T00:00:00` : null,
      preferred_time_label: pick(record, "preferredTime", 120),
      message: contextLine([pick(record, "purpose", 160), pick(record, "message", 2000)]),
      source_detail: "website:visit-form",
      ...attributionOf((record["attribution"] as LeadAttribution | undefined) ?? undefined),
      website_url: honeypotOf(record),
    });
  },

  submitMembershipInquiry(
    payload: MembershipInquiryPayload,
  ): Promise<ApiResult<{ referenceId: string }>> {
    const record = payload as unknown as IncomingRecord;
    return postPublic(
      "leads",
      buildLeadBody(record, {
        serviceInterest: "Membership Inquiry",
        sourceDetail: "website:membership-form",
        extraContext: contextLine([
          pick(record, "plan", 80),
          pick(record, "seatType", 80),
          pick(record, "duration", 40),
        ]),
      }),
    );
  },

  submitContact(
    payload: Record<string, string> & AttributedPayload,
  ): Promise<ApiResult<{ referenceId: string }>> {
    const record = payload as unknown as IncomingRecord;
    return postPublic(
      "leads",
      buildLeadBody(record, {
        serviceInterest: "Contact",
        sourceDetail: "website:contact-form",
      }),
    );
  },
};

const NEST_PUBLIC_RETRY_ATTEMPTS = 4;

function isRetryableNestResult(result: ApiResult<{ referenceId: string }>): boolean {
  if (result.ok) return false;
  if (result.error === "NETWORK_ERROR" || result.error === "TIMEOUT_ERROR") return true;
  if (result.error === "SERVER_ERROR") {
    const status = Number((result as { detail?: string }).detail);
    if (Number.isFinite(status) && isColdStartStatus(status)) return true;
  }
  return false;
}

/**
 * Render free cold-start wrapper (bounded, idempotent-safe).
 *
 * Retries postPublicOnce on network/timeout/edge 502-504 with exponential
 * backoff. ONE idempotency key covers every attempt, so a retry can never
 * create a duplicate lead/booking. Validation and oversize payloads are
 * never retried. Form input stays in the calling form (nothing here clears
 * it), so the user never retypes after a wake-up.
 */
async function postPublic(
  path: "leads" | "bookings",
  payload: object,
): Promise<ApiResult<{ referenceId: string }>> {
  const idempotencyKey = makeIdempotencyKey();
  let last: ApiResult<{ referenceId: string }> = { ok: false, error: "NETWORK_ERROR" };
  for (let attempt = 1; attempt <= NEST_PUBLIC_RETRY_ATTEMPTS; attempt += 1) {
    const result = await postPublicOnce(path, payload, idempotencyKey);
    if (!isRetryableNestResult(result) || attempt === NEST_PUBLIC_RETRY_ATTEMPTS) return result;
    last = result;
    await new Promise((resolve) => setTimeout(resolve, coldStartDelay(attempt)));
  }
  return last;
}
