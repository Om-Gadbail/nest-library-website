/**
 * Nest Library — seat options (STRUCTURAL PLACEHOLDERS).
 * Prices are intentionally null: real pricing will be added once confirmed.
 */

import type { SeatOption } from "../types/content.ts";

export const seats: SeatOption[] = [
  {
    id: "demo-seat-a",
    name: "Example seat option (placeholder)",
    description:
      "Structural placeholder for a future seat option. Replace with the real seat name, description and features.",
    suitableFor: ["Example audience (placeholder)"],
    features: [
      "Example feature (placeholder)",
      "Example feature (placeholder)",
    ],
    price: null,
    priceLabel: "Pricing on enquiry",
    ctaLabel: "Enquire about this seat",
    available: null,
    isPlaceholder: true,
  },
  {
    id: "demo-seat-b",
    name: "Example dedicated seat (placeholder)",
    description:
      "Structural placeholder for a future seat option. Replace with the real seat name, description and features.",
    suitableFor: ["Example audience (placeholder)"],
    features: [
      "Example feature (placeholder)",
      "Example feature (placeholder)",
    ],
    price: null,
    priceLabel: "Pricing on enquiry",
    ctaLabel: "Enquire about this seat",
    available: null,
    isPlaceholder: true,
  },
];
