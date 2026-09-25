/**
 * Nest Library — central contact configuration.
 *
 * All values are DEMO placeholders. Replace with verified phone / WhatsApp /
 * email / address before any public launch. `isPlaceholder: true` marks every
 * value that must not be presented as a real fact.
 */

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  isPlaceholder: boolean;
}

export const contactConfig = {
  phone: {
    label: "Phone",
    value: "+91 00000 00000",
    href: "tel:+910000000000",
    isPlaceholder: true,
  } as ContactChannel,

  whatsapp: {
    label: "WhatsApp",
    value: "+91 00000 00000",
    href: "https://wa.me/910000000000?text=Hi%20Nest%20Library%2C%20I%27d%20like%20to%20enquire%20about%20a%20seat.",
    isPlaceholder: true,
  } as ContactChannel,

  email: {
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    isPlaceholder: true,
  } as ContactChannel,

  address: {
    label: "Address",
    value: "Demo address — to be confirmed",
    href: "#location",
    isPlaceholder: true,
  } as ContactChannel,

  /** Placeholder map links; replace with the real Google Maps URLs. */
  mapsUrl: "#location",
  directionsUrl: "#location",
  mapsEmbedUrl: "" as string,
  isPlaceholder: true as boolean,
} as const;
