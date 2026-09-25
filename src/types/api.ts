/**
 * Nest Library — future API contracts (foundation).
 * Typed request/response shapes for the FastAPI boundary.
 * The backend owns validation and multi-tenant isolation; these types only
 * describe the wire format the UI will eventually speak.
 */

export interface TenantScope {
  /** Resolved by the backend from the site origin — never trusted from UI. */
  businessId?: string;
  tenantId?: string;
}

/** Marketing-only attribution (UTMs, referrer, landing path, device class). */
export interface LeadAttribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  landingPath?: string;
  deviceCategory?: "mobile" | "tablet" | "desktop";
}

export interface AttributedPayload {
  attribution?: LeadAttribution;
}

export interface SeatInquiryPayload extends TenantScope, AttributedPayload {
  name: string;
  phone: string;
  occupation: "student" | "professional" | "other";
  examGoal?: string;
  duration: string;
  seatPreference: string;
  timing: string;
  source?: string;
  message?: string;
}

export interface VisitBookingPayload extends TenantScope, AttributedPayload {
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  purpose?: string;
  message?: string;
}

export interface MembershipInquiryPayload
  extends TenantScope, AttributedPayload {
  name: string;
  phone: string;
  plan: string;
  seatType: string;
  duration: string;
  message?: string;
}

export type ApiErrorCode =
  | "BACKEND_NOT_CONFIGURED"
  | "VALIDATION_ERROR"
  | "NETWORK_ERROR"
  | "TIMEOUT_ERROR"
  | "PAYLOAD_TOO_LARGE"
  | "SERVER_ERROR";

export type ApiResult<T> =
  { ok: true; data: T } | { ok: false; error: ApiErrorCode; detail?: string };
