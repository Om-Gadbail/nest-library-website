/**
 * Nest Library — WhatsApp link architecture (foundation).
 *
 * The number lives in config/env — NEVER hardcode it in components.
 * Production WhatsApp Business API is out of scope; these are `wa.me` links
 * with correctly URL-encoded message templates for each conversion flow.
 * While the number is a placeholder, links resolve to `#contact-fallback`
 * so demo digits can never be mistaken for a real contact.
 */

import { contactConfig } from "../config/contact.ts";
import { env } from "./env.ts";

export type WhatsAppIntent =
  "general" | "seat-availability" | "membership" | "book-visit" | "join";

const TEMPLATES: Record<WhatsAppIntent, string> = {
  general: "Hi Nest Library, I'd like to enquire about the study space.",
  "seat-availability":
    "Hi Nest Library, I'd like to check current seat availability.",
  membership: "Hi Nest Library, I'd like to enquire about membership plans.",
  "book-visit": "Hi Nest Library, I'd like to book a visit to the space.",
  join: "Hi Nest Library, I'd like to join Nest. Please share next steps.",
};

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** True while no real WhatsApp number is configured. */
export function isWhatsAppConfigured(): boolean {
  const fromEnv = env.whatsappNumber ? digitsOnly(env.whatsappNumber) : "";
  if (fromEnv.length >= 10) return true;
  if (contactConfig.whatsapp.isPlaceholder) return false;
  return digitsOnly(contactConfig.whatsapp.value).length >= 10;
}

function resolveNumber(): string {
  if (env.whatsappNumber) return digitsOnly(env.whatsappNumber);
  return digitsOnly(contactConfig.whatsapp.value);
}

/** Builds a `wa.me` link for the given intent (URL-encoded message). */
export function buildWhatsAppUrl(intent: WhatsAppIntent = "general"): string {
  if (!isWhatsAppConfigured()) return "#contact-fallback";
  const number = resolveNumber();
  const message = encodeURIComponent(TEMPLATES[intent]);
  return `https://wa.me/${number}?text=${message}`;
}

/** Raw template text (unencoded) — useful for tests and previews. */
export function whatsappTemplate(intent: WhatsAppIntent): string {
  return TEMPLATES[intent];
}
