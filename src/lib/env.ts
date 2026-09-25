/**
 * Nest Library — environment accessor (foundation).
 * Only `VITE_`-prefixed variables are exposed to the browser by Vite.
 * No secrets here: public site configuration only.
 * Real values are supplied via `.env` (local) or hosting env vars;
 * `.env.example` documents every key. Empty = unconfigured.
 */

function readEnv(key: string): string | undefined {
  const value: unknown = import.meta.env[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export const env = {
  /** Production site URL, e.g. https://www.example.com (unset for now). */
  siteUrl: readEnv("VITE_SITE_URL"),
  /** WhatsApp number in international format without `+`, e.g. 919999999999. */
  whatsappNumber: readEnv("VITE_WHATSAPP_NUMBER"),
  /** Public phone number, e.g. +91 99999 99999. */
  phoneNumber: readEnv("VITE_PHONE_NUMBER"),
  /** Public contact email. */
  email: readEnv("VITE_EMAIL"),
  /** Shareable Google Maps URL for the verified address. */
  googleMapsUrl: readEnv("VITE_GOOGLE_MAPS_URL"),
  /** Shareable Google Directions URL for the verified address. */
  googleDirectionsUrl: readEnv("VITE_GOOGLE_DIRECTIONS_URL"),
  /** Analytics measurement ID (provider connected later). */
  analyticsId: readEnv("VITE_ANALYTICS_ID"),
} as const;

export type Env = typeof env;
