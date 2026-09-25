/**
 * Nest Library — WhatsApp integration (production).
 *
 * CURRENT (live): real `wa.me` user-initiated actions with contextual,
 * safely-encoded pre-filled messages. Number is centralized in
 * config/contact.ts (+ VITE_WHATSAPP_NUMBER override).
 *
 * FUTURE (not built): server-side WhatsApp Business provider automation
 * (admission/visit/seat confirmations, reminders, renewals). The lead
 * pipeline in lib/leads.ts + lib/api.ts is the seam where that provider
 * will connect — see docs/LEAD_API.md. Nothing here fakes automation.
 */

import { contactConfig } from "../config/contact.ts";
import { env } from "./env.ts";

export type WhatsAppIntent =
  | "general"
  | "regular-seat"
  | "confirmed-seat"
  | "membership"
  | "book-visit"
  | "opening-offer"
  | "seat-availability"
  | "join";

const TEMPLATES: Record<WhatsAppIntent, string> = {
  general: "Hi, I would like to know more about Nest Library.",
  "regular-seat": "Hi, I am interested in the Regular Seat at Nest Library.",
  "confirmed-seat":
    "Hi, I am interested in the Confirmed Seat at Nest Library.",
  membership: "Hi, I would like to know about Nest membership plans.",
  "book-visit": "Hi, I would like to book a visit to Nest Library.",
  "opening-offer":
    "Hi, I would like to know more about the Nest opening offer.",
  "seat-availability":
    "Hi, I would like to check current seat availability at Nest Library.",
  join: "Hi, I would like to join Nest Library. Please share the next steps.",
};

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** True while a real WhatsApp number is configured. */
export function isWhatsAppConfigured(): boolean {
  const fromEnv = env.whatsappNumber ? digitsOnly(env.whatsappNumber) : "";
  if (fromEnv.length >= 10) return true;
  if (contactConfig.whatsapp.isPlaceholder) return false;
  return digitsOnly(contactConfig.whatsapp.value).length >= 10;
}

function resolveNumber(): string {
  if (env.whatsappNumber) return digitsOnly(env.whatsappNumber);
  return digitsOnly(contactConfig.whatsappNumber);
}

/**
 * Builds a `wa.me` link for the given intent. An optional custom detail
 * (e.g. "Regular Seat · 6 Months · ₹3,999") is appended to the template.
 * Messages are always encoded with encodeURIComponent.
 */
export function buildWhatsAppUrl(
  intent: WhatsAppIntent = "general",
  detail?: string,
): string {
  if (!isWhatsAppConfigured()) return "#contact-fallback";
  const number = resolveNumber();
  const base = TEMPLATES[intent];
  const message = encodeURIComponent(detail ? `${base} (${detail})` : base);
  return `https://wa.me/${number}?text=${message}`;
}

/** Raw template text (unencoded) — useful for tests and previews. */
export function whatsappTemplate(intent: WhatsAppIntent): string {
  return TEMPLATES[intent];
}
