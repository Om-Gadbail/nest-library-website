/**
 * Nest Library — membership plans (derived from central pricing).
 * Backwards-compatible MembershipPlan view for generic cards.
 * Canonical prices live in data/pricing.ts — edit there.
 */

import type { MembershipPlan } from "../types/content.ts";
import { pricedPlans } from "./pricing.ts";

function toMembershipPlan(seatType: "regular" | "confirmed"): MembershipPlan[] {
  return pricedPlans
    .filter((plan) => plan.seatType === seatType)
    .map((plan) => ({
      id: plan.id,
      name: `${plan.seatTypeLabel} — ${plan.durationLabel}`,
      duration: plan.duration,
      durationLabel: plan.durationLabel,
      seatType: plan.seatTypeLabel,
      price: plan.openingPrice,
      priceNote: `₹${plan.openingPrice.toLocaleString("en-IN")}`,
      features: plan.bestValue
        ? ["Opening-offer price", "Best value for long-term study"]
        : ["Opening-offer price"],
      highlighted: plan.bestValue,
      ctaLabel: plan.ctaLabel,
      isPlaceholder: false,
    }));
}

export const plans: MembershipPlan[] = [
  ...toMembershipPlan("regular"),
  ...toMembershipPlan("confirmed"),
];
