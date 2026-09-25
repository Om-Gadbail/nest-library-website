/**
 * Nest Library — analytics abstraction (production).
 *
 * Components call `trackEvent(name, properties)` — never import a provider
 * directly. The provider connects later via `setAnalyticsAdapter`.
 *
 * Privacy contract (enforced at runtime by `sanitizeProperties`):
 * no phone numbers, message content, names or other personal data are ever
 * sent in payloads — only marketing metadata (surface, intent, plan ids,
 * UTM-derived source) and coarse status flags.
 */

export type AnalyticsEventName =
  | "page_view"
  | "hero_cta_click"
  | "join_click"
  | "offer_view"
  | "offer_click"
  | "offer_dismiss"
  | "popup_open"
  | "popup_close"
  | "popup_cta_click"
  | "plan_view"
  | "seat_view"
  | "membership_view"
  | "admission_start"
  | "admission_started"
  | "admission_submit"
  | "admission_submitted"
  | "admission_success"
  | "admission_error"
  | "visit_start"
  | "book_visit_started"
  | "book_visit_submitted"
  | "visit_submit"
  | "visit_success"
  | "visit_error"
  | "seat_inquiry_start"
  | "seat_inquiry_started"
  | "seat_inquiry_submit"
  | "seat_inquiry_submitted"
  | "seat_inquiry_success"
  | "seat_inquiry_error"
  | "membership_inquiry_start"
  | "membership_inquiry_started"
  | "membership_inquiry"
  | "membership_inquiry_submit"
  | "membership_inquiry_submitted"
  | "membership_inquiry_success"
  | "membership_inquiry_error"
  | "contact_submit"
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "directions_click"
  | "gallery_open"
  | "gallery_interaction"
  | "faq_open"
  | "plan_view_legacy"
  | "cta_click";

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  properties?: Record<string, string | number | boolean | undefined>;
  timestamp: number;
}

export type AnalyticsAdapter = (event: AnalyticsEvent) => void;

let adapter: AnalyticsAdapter | null = null;

const queue: AnalyticsEvent[] = [];

/** Property keys that must never reach an analytics provider. */
const FORBIDDEN_PROPERTY_KEYS = new Set([
  "phone",
  "phoneNumber",
  "mobile",
  "name",
  "fullName",
  "email",
  "message",
  "preferredDate",
  "preferredTime",
]);

/**
 * Defense-in-depth PII guard: drops forbidden keys and truncates any
 * remaining string value. Callers must already avoid sending personal
 * data — this ensures a mistake never leaks it to a provider.
 */
export function sanitizeProperties(
  properties?: AnalyticsEvent["properties"],
): AnalyticsEvent["properties"] {
  if (!properties) return undefined;
  const clean: Record<string, string | number | boolean | undefined> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (FORBIDDEN_PROPERTY_KEYS.has(key)) continue;
    clean[key] = typeof value === "string" ? value.slice(0, 120) : value;
  }
  return clean;
}

/** Connected later by the analytics provider bootstrap. */
export function setAnalyticsAdapter(next: AnalyticsAdapter | null): void {
  adapter = next;
  if (next) {
    for (const event of queue.splice(0, queue.length)) {
      try {
        next(event);
      } catch {
        // Analytics must never break the UI.
      }
    }
  }
}

export function trackEvent(
  name: AnalyticsEventName,
  properties?: AnalyticsEvent["properties"],
): void {
  const event: AnalyticsEvent = {
    name,
    properties: sanitizeProperties(properties),
    timestamp: Date.now(),
  };

  if (!adapter) {
    if (queue.length >= 50) queue.shift();
    queue.push(event);
    if (import.meta.env.DEV) {
      console.debug("Nest analytics (no provider):", event);
    }
    return;
  }

  try {
    adapter(event);
  } catch {
    // Analytics must never break the UI.
  }
}

/** Convenience: track page views from the router. */
export function trackPageView(path: string): void {
  trackEvent("page_view", { path });
}
