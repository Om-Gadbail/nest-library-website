/**
 * Nest Library — future business-domain model (ARCHITECTURE ONLY).
 *
 * These types define the boundaries for the seat, membership, payment and
 * attendance systems so the website, backend and owner dashboard can grow
 * without rewrites. NOTHING here is live: there is no database, no member
 * portal, no seat map and no payment flow yet. The UI must not present any
 * of these as available until the backend in docs/LEAD_API.md exists and
 * the owner enables each capability explicitly.
 *
 * Strict rule: every record carries `businessId: "nest"` — Nest data is
 * never mixed with Prime Fitness or any future shared system.
 */

export type BusinessId = "nest";

export interface TenantScoped {
  businessId: BusinessId;
}

/* ——— Seats (future live seat map) ——— */

export type SeatKind = "regular" | "confirmed";

export type SeatStatus =
  | "AVAILABLE"
  | "HELD"
  | "OCCUPIED"
  | "RESERVED"
  | "MAINTENANCE"
  | "UNAVAILABLE";

export type SeatShift =
  "morning" | "afternoon" | "evening" | "full-day" | "night" | "full-24";

export interface Seat extends TenantScoped {
  id: string;
  seatNumber: string;
  kind: SeatKind;
  status: SeatStatus;
  floor?: string;
  zone?: string;
  shift?: SeatShift;
  memberId?: string | null;
  updatedAt: string;
}

/* ——— Members & memberships (future member system) ——— */

export type MembershipStatus =
  "active" | "expiring" | "expired" | "frozen" | "cancelled";

export interface Member extends TenantScoped {
  id: string;
  name: string;
  phone: string;
  seatId?: string | null;
  joinedAt: string;
}

export interface Membership extends TenantScoped {
  id: string;
  memberId: string;
  seatId?: string | null;
  planId: string;
  seatKind: SeatKind;
  startDate: string;
  expiryDate: string;
  status: MembershipStatus;
  frozenDays?: number;
  referralCode?: string;
}

/* ——— Payments (future, India-first, provider-abstracted) ——— */

export type PaymentMethod = "upi" | "card" | "netbanking" | "cash" | "other";

export type PaymentStatus =
  "pending" | "confirmed" | "failed" | "refunded" | "partial";

export interface Payment extends TenantScoped {
  id: string;
  memberId: string;
  membershipId?: string;
  amountPaise: number;
  method: PaymentMethod;
  /** Provider name (e.g. "razorpay"). Never hardcode secrets client-side. */
  provider?: string;
  providerReference?: string;
  status: PaymentStatus;
  receiptUrl?: string;
  createdAt: string;
}

/* ——— QR attendance (future) ——— */

export interface AttendanceScan extends TenantScoped {
  id: string;
  memberId: string;
  seatId?: string | null;
  scannedAt: string;
  direction: "in" | "out";
  /** Idempotency key derived from member + minute bucket. */
  idempotencyKey: string;
}

/* ——— Owner business intelligence (future, never fabricated) ——— */

export interface BusinessMetrics extends TenantScoped {
  enquiries: number;
  visitsBooked: number;
  membershipsActive: number;
  occupancyRate: number | null;
  revenuePaise: number | null;
  renewalRate: number | null;
  periodStart: string;
  periodEnd: string;
  /** True while the backend has no rows yet — UI shows "No data yet". */
  empty: boolean;
}
