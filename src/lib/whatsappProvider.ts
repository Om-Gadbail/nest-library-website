/**
 * Nest Library — WhatsApp automation seam (PROVIDER-READY, not LIVE).
 *
 * What IS live today: user-initiated `wa.me` links built by
 * `lib/whatsapp.ts` (real number, contextual pre-filled messages).
 *
 * What is NOT live: server-side automation (confirmations, reminders,
 * renewals, review requests). That must run on the backend with a real
 * WhatsApp Business provider — never from the browser, where secrets
 * would be exposed and delivery could not be audited.
 *
 * This module defines the provider-neutral contract the backend will
 * implement: template registry, send request shape, delivery statuses and
 * webhook/idempotency requirements. No function here sends anything.
 */

export type WhatsAppTemplateId =
  | "enquiry_received"
  | "visit_request_confirmation"
  | "visit_reminder"
  | "membership_enquiry_followup"
  | "admission_confirmation"
  | "payment_confirmation"
  | "renewal_reminder"
  | "overdue_reminder"
  | "review_request"
  | "referral_invite";

/** Parameters a template may interpolate. Phone numbers are resolved server-side. */
export interface WhatsAppTemplateParams {
  memberName?: string;
  planLabel?: string;
  visitDate?: string;
  visitTime?: string;
  seatLabel?: string;
  amountPaise?: number;
  expiryDate?: string;
}

/** Server-side send request (backend → provider). */
export interface WhatsAppSendRequest {
  businessId: "nest";
  toPhoneE164: string;
  template: WhatsAppTemplateId;
  language?: string;
  params?: WhatsAppTemplateParams;
  /** Client-generated idempotency key: lead id + template + day bucket. */
  idempotencyKey: string;
}

export type WhatsAppDeliveryStatus =
  "queued" | "sent" | "delivered" | "read" | "failed";

/** Provider-agnostic delivery receipt (provider webhook → backend). */
export interface WhatsAppDeliveryReceipt {
  providerMessageId: string;
  status: WhatsAppDeliveryStatus;
  failedReason?: string;
  occurredAt: string;
}

/**
 * Requirements for any provider adapter (Meta Cloud API, Interakt,
 * Gupshup, Twilio or similar):
 * - Credentials live in server env vars only, never in this repo.
 * - Templates are pre-approved by the provider before use.
 * - Webhooks verify the provider signature before accepting receipts.
 * - Sends are idempotent (duplicate submissions → one message).
 * - Every send, retry and receipt is audit-logged per businessId.
 * - Recipient opt-in/consent is recorded before promotional messages.
 */
export const WHATSAPP_PROVIDER_REQUIREMENTS = [
  "server-side credentials only",
  "pre-approved message templates",
  "verified webhook signatures",
  "idempotent sends with retries",
  "per-message audit log",
  "recorded recipient opt-in",
] as const;
