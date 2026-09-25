/**
 * Nest Library — seat options (verified, OWNER-EDITABLE).
 * Only confirmed distinctions are claimed. Confirmed Seat highlights
 * Priority Seat Selection because the poster confirms it — nothing more.
 */

import type { SeatOption } from "../types/content.ts";

export const seats: SeatOption[] = [
  {
    id: "regular-seat",
    name: "Regular Seat",
    description:
      "A flexible study option for members who want a dedicated place to study at Nest.",
    suitableFor: [
      "College / university students",
      "Competitive exam aspirants",
      "Self-learners",
    ],
    features: [
      "Study seating in a focused environment",
      "Access to confirmed Nest facilities",
      "Available across all admission durations",
    ],
    price: 699,
    priceLabel: "Opening offer from ₹699",
    ctaLabel: "View Regular Seat",
    available: null,
    isPlaceholder: false,
  },
  {
    id: "confirmed-seat",
    name: "Confirmed Seat",
    description:
      "A more dedicated seat option with priority seat selection for members who want consistency.",
    suitableFor: [
      "Long-term self study",
      "Government & entrance exam aspirants",
      "Working students",
    ],
    features: [
      "Priority seat selection",
      "A more dedicated, consistent seat experience",
      "Available across all admission durations",
    ],
    price: 899,
    priceLabel: "Opening offer from ₹899",
    ctaLabel: "View Confirmed Seat",
    available: null,
    isPlaceholder: false,
  },
];
