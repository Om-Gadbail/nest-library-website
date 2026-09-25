/**
 * Nest Library — membership plans (STRUCTURAL PLACEHOLDERS).
 * Prices are intentionally null: real fees will be added once confirmed.
 */

import type { MembershipPlan } from "../types/content.ts";

export const plans: MembershipPlan[] = [
  {
    id: "demo-plan-monthly",
    name: "Example monthly plan (placeholder)",
    duration: "1-month",
    durationLabel: "1 month",
    seatType: "Example seat type (placeholder)",
    price: null,
    priceNote: "Fee on enquiry",
    features: [
      "Example plan feature (placeholder)",
      "Example plan feature (placeholder)",
    ],
    highlighted: true,
    ctaLabel: "Enquire about this plan",
    isPlaceholder: true,
  },
  {
    id: "demo-plan-quarterly",
    name: "Example quarterly plan (placeholder)",
    duration: "3-month",
    durationLabel: "3 months",
    seatType: "Example seat type (placeholder)",
    price: null,
    priceNote: "Fee on enquiry",
    features: [
      "Example plan feature (placeholder)",
      "Example plan feature (placeholder)",
    ],
    highlighted: false,
    ctaLabel: "Enquire about this plan",
    isPlaceholder: true,
  },
];
