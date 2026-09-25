/**
 * Nest Library — owner-dashboard API seam (BACKEND-READY, not LIVE).
 *
 * Typed client for the future Lead Management / Owner Command Center:
 * overview, lead lists, status transitions, follow-ups, notes, export and
 * audit history. Every method resolves `BACKEND_NOT_CONFIGURED` until the
 * FastAPI service from docs/LEAD_API.md is deployed and `VITE_API_BASE_URL`
 * is set. No UI in this repo consumes these methods yet — that prevents
 * shipping a dashboard that pretends to show real data.
 */

import { env } from "./env.ts";
import type { ApiResult } from "../types/api.ts";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "FOLLOW_UP"
  | "VISIT_BOOKED"
  | "VISIT_COMPLETED"
  | "INTERESTED"
  | "CONVERTED"
  | "LOST"
  | "CLOSED";

export type LeadChannel =
  | "seat-inquiry"
  | "book-visit"
  | "membership-inquiry"
  | "contact"
  | "whatsapp"
  | "call";

export interface AdminLead {
  id: string;
  referenceId: string;
  businessId: "nest";
  channel: LeadChannel;
  name: string;
  phone: string;
  seatType?: string;
  plan?: string;
  status: LeadStatus;
  priority?: "low" | "normal" | "high";
  assignedTo?: string;
  followUpAt?: string | null;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFilters {
  status?: LeadStatus;
  channel?: LeadChannel;
  from?: string;
  to?: string;
  query?: string;
}

export interface StatusTransition {
  leadId: string;
  to: LeadStatus;
  note?: string;
  followUpAt?: string | null;
}

function base(): string {
  return (env.apiBaseUrl ?? "").replace(/\/+$/, "");
}

function configured(): boolean {
  return base().length > 0;
}

async function adminGet<T>(path: string): Promise<ApiResult<T>> {
  if (!configured()) return { ok: false, error: "BACKEND_NOT_CONFIGURED" };
  try {
    const response = await fetch(`${base()}${path}`);
    if (!response.ok) {
      return {
        ok: false,
        error: "SERVER_ERROR",
        detail: String(response.status),
      };
    }
    return { ok: true, data: (await response.json()) as T };
  } catch {
    return { ok: false, error: "NETWORK_ERROR" };
  }
}

export const adminApi = {
  isConfigured(): boolean {
    return configured();
  },

  listLeads(filters?: LeadFilters): Promise<ApiResult<AdminLead[]>> {
    const params = new URLSearchParams();
    if (filters?.status) params.set("status", filters.status);
    if (filters?.channel) params.set("channel", filters.channel);
    if (filters?.from) params.set("from", filters.from);
    if (filters?.to) params.set("to", filters.to);
    if (filters?.query) params.set("q", filters.query);
    const suffix = params.size > 0 ? `?${params.toString()}` : "";
    return adminGet<AdminLead[]>(`/api/admin/leads${suffix}`);
  },

  async transitionLead(
    transition: StatusTransition,
  ): Promise<ApiResult<{ updatedAt: string }>> {
    if (!configured()) return { ok: false, error: "BACKEND_NOT_CONFIGURED" };
    try {
      const response = await fetch(
        `${base()}/api/admin/leads/${encodeURIComponent(transition.leadId)}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessId: "nest",
            to: transition.to,
            note: transition.note,
            followUpAt: transition.followUpAt,
          }),
        },
      );
      if (!response.ok) {
        return {
          ok: false,
          error: "SERVER_ERROR",
          detail: String(response.status),
        };
      }
      return {
        ok: true,
        data: (await response.json()) as { updatedAt: string },
      };
    } catch {
      return { ok: false, error: "NETWORK_ERROR" };
    }
  },
};
