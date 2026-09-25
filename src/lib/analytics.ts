/**
 * Nest Library — analytics abstraction (foundation).
 *
 * Components call `trackEvent(name, properties)` — never import an analytics
 * provider directly. The provider (Google Analytics, Plausible, etc.) is
 * connected later by assigning an adapter via `setAnalyticsAdapter`.
 * Until then events are queued in memory and dropped silently in production.
 */

export type AnalyticsEventName =
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "directions_click"
  | "seat_inquiry_start"
  | "seat_inquiry_submit"
  | "visit_start"
  | "visit_submit"
  | "membership_inquiry"
  | "plan_view"
  | "cta_click"
  | "page_view";

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  properties?: Record<string, string | number | boolean | undefined>;
  timestamp: number;
}

export type AnalyticsAdapter = (event: AnalyticsEvent) => void;

let adapter: AnalyticsAdapter | null = null;

const queue: AnalyticsEvent[] = [];

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

/**
 * Track a conversion or interaction event.
 * Safe to call before any provider is connected; safe in tests/SSR.
 */
export function trackEvent(
  name: AnalyticsEventName,
  properties?: AnalyticsEvent["properties"],
): void {
  const event: AnalyticsEvent = {
    name,
    properties,
    timestamp: Date.now(),
  };

  if (!adapter) {
    // Keep the queue bounded; drop oldest events beyond 50.
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

/** Convenience: track page views from the router (connected later). */
export function trackPageView(path: string): void {
  trackEvent("page_view", { path });
}
