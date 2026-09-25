/**
 * Nest Library — opening offer (OWNER-EDITABLE).
 *
 * Single source of truth for the promotional state. To end the offer,
 * set `active: false` — announcement bar, popup, pricing badges and
 * the offer page all degrade to standard pricing automatically.
 * Never claim a "free trial": the approved benefit is FREE REGISTRATION
 * for early admissions.
 */

import type { OpeningOffer } from "../types/content.ts";

export const openingOffer: OpeningOffer = {
  active: true,
  eyebrow: "Opening Offer",
  title: "Special introductory prices for early admissions",
  subtitle:
    "Join during the opening period and study at limited-period prices.",
  validityNote: "Limited Period — Special Introductory Prices",
  freeRegistration: true,
  freeRegistrationNote: "Free registration for early admissions",
  prioritySeatSelection: true,
  prioritySeatSelectionNote:
    "Priority seat selection for Confirmed-Seat members",
  primaryCtaLabel: "View Admission Plans",
  secondaryCtaLabel: "WhatsApp Us",
  isPlaceholder: false,
} as const;
