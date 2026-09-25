/**
 * Nest Library — central contact configuration.
 *
 * OWNER-EDITABLE: phone, WhatsApp, email, address and map links live here.
 * Components must never hardcode these values.
 *
 * Truthfulness rules:
 * - Phone/WhatsApp below are the verified business number (7038201884).
 * - Address uses only confirmed parts (2nd Floor, New Narsala, Nagpur,
 *   Maharashtra, India). No invented street/coordinates.
 * - Email is unconfigured → email CTAs hide until a real address is set.
 * - Map/directions URLs are unconfigured → map UI shows an honest
 *   "location card" state and hides map/directions buttons.
 */

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  isPlaceholder: boolean;
}

const PHONE_DISPLAY = "+91 70382 01884";
const PHONE_TEL = "tel:+917038201884";
const WHATSAPP_NUMBER = "917038201884";

export const contactConfig = {
  phone: {
    label: "Phone",
    value: PHONE_DISPLAY,
    href: PHONE_TEL,
    isPlaceholder: false,
  } as ContactChannel,

  whatsapp: {
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Nest%20Library.`,
    isPlaceholder: false,
  } as ContactChannel,

  /** Central WhatsApp number (digits only, no "+"). Single source of truth. */
  whatsappNumber: WHATSAPP_NUMBER,

  /** No verified Nest email yet → EmailButton hides itself. */
  email: {
    label: "Email",
    value: "",
    href: "",
    isPlaceholder: true,
  } as ContactChannel,

  address: {
    label: "Address",
    value: "2nd Floor, New Narsala, Nagpur, Maharashtra, India",
    href: "#location",
    isPlaceholder: false,
  } as ContactChannel,

  addressParts: {
    floor: "2nd Floor",
    area: "New Narsala",
    city: "Nagpur",
    state: "Maharashtra",
    country: "India",
    /** Full street address pending owner confirmation. */
    street: "" as string,
    isPlaceholder: false,
  },

  /** Shareable Google Maps / Directions URLs — empty until owner provides. */
  mapsUrl: "" as string,
  directionsUrl: "" as string,
  mapsEmbedUrl: "" as string,
  isPlaceholder: true as boolean,
} as const;
