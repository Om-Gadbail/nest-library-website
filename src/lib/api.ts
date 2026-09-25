/**
 * Nest Library — future backend boundary (foundation).
 *
 * The later architecture is: Nest Website → FastAPI → Nest CRM → dashboards.
 * UI code must depend on THESE typed interfaces and the `apiClient` stub —
 * never on fetch() calls scattered through components. When the backend
 * exists, only this module's transport changes; components stay untouched.
 *
 * Multi-tenant note: when the shared Prime + Nest backend arrives, requests
 * carry `businessId` / `tenantId`. This frontend never enforces isolation —
 * that is a backend responsibility.
 */

import type {
  ApiResult,
  MembershipInquiryPayload,
  SeatInquiryPayload,
  VisitBookingPayload,
} from "../types/api.ts";

/** Base URL for the future FastAPI backend (empty = unconfigured). */
const API_BASE_URL = "" as string;

function unconfigured<T>(operation: string): Promise<ApiResult<T>> {
  if (import.meta.env.DEV) {
    console.warn(`Nest API — "${operation}" called before backend exists.`);
  }
  return Promise.resolve({ ok: false, error: "BACKEND_NOT_CONFIGURED" });
}

/**
 * Typed API client. Every method resolves to ApiResult — never throws for
 * transport-level "not configured" states. Replace internals with real
 * fetch() calls once FastAPI endpoints exist.
 */
export const apiClient = {
  getBaseUrl(): string {
    return API_BASE_URL;
  },

  isConfigured(): boolean {
    return API_BASE_URL.length > 0;
  },

  submitSeatInquiry(
    _payload: SeatInquiryPayload,
  ): Promise<ApiResult<{ referenceId: string }>> {
    return unconfigured("submitSeatInquiry");
  },

  submitVisitBooking(
    _payload: VisitBookingPayload,
  ): Promise<ApiResult<{ referenceId: string }>> {
    return unconfigured("submitVisitBooking");
  },

  submitMembershipInquiry(
    _payload: MembershipInquiryPayload,
  ): Promise<ApiResult<{ referenceId: string }>> {
    return unconfigured("submitMembershipInquiry");
  },
};
