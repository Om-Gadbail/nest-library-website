/**
 * Nest Library — backend boundary (BACKEND-READY).
 *
 * Architecture: Website → apiClient → FastAPI → database/CRM.
 * UI code depends on these typed methods — never on fetch() in components.
 * When VITE_API_BASE_URL is set, requests POST JSON to the contract in
 * docs/LEAD_API.md. Otherwise methods resolve BACKEND_NOT_CONFIGURED so
 * forms degrade honestly (device outbox + WhatsApp handoff).
 */

import type {
  ApiResult,
  AttributedPayload,
  MembershipInquiryPayload,
  SeatInquiryPayload,
  VisitBookingPayload,
} from "../types/api.ts";
import { env } from "./env.ts";

/** Wall-clock budget per submission (ms). The UI surfaces retry on expiry. */
const REQUEST_TIMEOUT_MS = 12_000;

/** Client-side request-size guard (bytes of JSON). The server enforces its own limit. */
const MAX_JSON_BYTES = 16 * 1024;

/** Strict tenant scope: every Nest row is isolated from any other business. */
const BUSINESS_ID = "nest";

function baseUrl(): string {
  const raw = env.apiBaseUrl ?? "";
  return raw.replace(/\/+$/, "");
}

async function post<T>(path: string, payload: object): Promise<ApiResult<T>> {
  const base = baseUrl();
  if (!base) return { ok: false, error: "BACKEND_NOT_CONFIGURED" };
  let body: string;
  try {
    body = JSON.stringify({ businessId: BUSINESS_ID, ...payload });
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
    const response = await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: controller.signal,
    });
    if (!response.ok) {
      return {
        ok: false,
        error: "SERVER_ERROR",
        detail: String(response.status),
      };
    }
    const data = (await response.json()) as unknown as T;
    return { ok: true, data };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, error: "TIMEOUT_ERROR" };
    }
    return { ok: false, error: "NETWORK_ERROR" };
  } finally {
    window.clearTimeout(timer);
  }
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
    return post("/api/leads/seat-inquiry", payload);
  },

  submitVisitBooking(
    payload: VisitBookingPayload,
  ): Promise<ApiResult<{ referenceId: string }>> {
    return post("/api/leads/visit", payload);
  },

  submitMembershipInquiry(
    payload: MembershipInquiryPayload,
  ): Promise<ApiResult<{ referenceId: string }>> {
    return post("/api/leads/membership", payload);
  },

  submitContact(
    payload: Record<string, string> & AttributedPayload,
  ): Promise<ApiResult<{ referenceId: string }>> {
    return post("/api/leads/contact", payload);
  },
};
