/**
 * Nest Library — lead pipeline (BACKEND-READY, not LIVE backend).
 *
 * Status: the API boundary is production-typed and documented in
 * docs/LEAD_API.md. There is NO server database connected yet.
 *
 * What happens on submit today:
 *  1. Frontend validates (zod) and sanitizes input.
 *  2. If VITE_API_BASE_URL is set, the lead POSTs to the backend
 *     (FastAPI contract in docs/LEAD_API.md) and the success screen
 *     reflects a real server reference.
 *  3. If no backend is configured, the lead is kept in a clearly-labelled
 *     DEVICE-LOCAL outbox (localStorage, key below) so details never
 *     silently disappear — and the UI honestly says online submission
 *     is pending, pushing the visitor to confirm via WhatsApp/call.
 *
 * localStorage is a convenience outbox, NOT the production database.
 * The production store is the future backend database (PostgreSQL).
 */

export type LeadFormType =
  "seat-inquiry" | "book-visit" | "membership-inquiry" | "contact";

import type { LeadAttribution } from "../types/api.ts";

export interface LeadRecord {
  id: string;
  formType: LeadFormType;
  name: string;
  phone: string;
  seatType?: string;
  plan?: string;
  duration?: string;
  preferredDate?: string;
  preferredTime?: string;
  purpose?: string;
  studyGoal?: string;
  message?: string;
  source: string;
  attribution?: LeadAttribution;
  status: "device-pending" | "submitted";
  createdAt: string;
}

const OUTBOX_KEY = "nest-lead-outbox-v1";

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `lead-${String(Date.now())}-${String(Math.floor(Math.random() * 1e6))}`;
}

/** True when the honeypot field caught a likely bot submission. */
export function isHoneypotCaught(value: unknown): boolean {
  return typeof value === "string" && value.length > 0;
}

/** Basic input sanitization: trim + cap lengths (backend re-validates). */
export function sanitizeText(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function param(params: URLSearchParams, key: string): string | undefined {
  const value = params.get(key)?.trim().slice(0, 120);
  return value ? value : undefined;
}

/**
 * Captures conversion attribution once per submission: UTM parameters,
 * referrer, landing path and a coarse device category. Only marketing
 * metadata is captured — never message content or phone numbers.
 */
export function captureAttribution(): LeadAttribution {
  try {
    const params = new URLSearchParams(window.location.search);
    const width = window.innerWidth;
    return {
      utmSource: param(params, "utm_source"),
      utmMedium: param(params, "utm_medium"),
      utmCampaign: param(params, "utm_campaign"),
      referrer: document.referrer ? document.referrer.slice(0, 300) : undefined,
      landingPath: window.location.pathname.slice(0, 200),
      deviceCategory:
        width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop",
    };
  } catch {
    return {};
  }
}

export function readOutbox(): LeadRecord[] {
  try {
    const raw = localStorage.getItem(OUTBOX_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as LeadRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveLeadLocal(
  record: Omit<LeadRecord, "id" | "createdAt" | "status" | "source"> & {
    source?: string;
  },
): LeadRecord {
  const lead: LeadRecord = {
    ...record,
    id: uid(),
    source: record.source ?? window.location.pathname,
    attribution: record.attribution ?? captureAttribution(),
    status: "device-pending",
    createdAt: new Date().toISOString(),
  };
  try {
    const existing = readOutbox();
    existing.push(lead);
    localStorage.setItem(OUTBOX_KEY, JSON.stringify(existing.slice(-50)));
  } catch {
    // Outbox is best-effort; the WhatsApp handoff remains available.
  }
  return lead;
}

export function markLeadSubmitted(id: string, referenceId?: string): void {
  try {
    const existing = readOutbox().map((lead) =>
      lead.id === id
        ? { ...lead, status: "submitted" as const, id: referenceId ?? lead.id }
        : lead,
    );
    localStorage.setItem(OUTBOX_KEY, JSON.stringify(existing.slice(-50)));
  } catch {
    // ignore
  }
}
