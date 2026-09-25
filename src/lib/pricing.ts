/**
 * Nest Library — pricing engine (configuration-driven).
 *
 * All math derives from data/pricing.ts + data/offers.ts.
 * Components must never hardcode prices or savings.
 */

import { pricedPlans } from "../data/pricing.ts";
import { openingOffer } from "../data/offers.ts";
import type { PricedPlan, SeatTypeId } from "../types/content.ts";

export function isOfferActive(): boolean {
  return openingOffer.active;
}

/** Price the visitor actually pays right now for a plan. */
export function currentPrice(plan: PricedPlan): number {
  return isOfferActive() ? plan.openingPrice : plan.standardPrice;
}

/** Savings vs standard admission (0 when the offer is off). */
export function savingsFor(plan: PricedPlan): number {
  if (!isOfferActive()) return 0;
  return Math.max(0, plan.standardPrice - plan.openingPrice);
}

export function findPlan(
  seatType: SeatTypeId,
  duration: string,
): PricedPlan | undefined {
  return pricedPlans.find(
    (plan) => plan.seatType === seatType && plan.duration === duration,
  );
}

export function plansForSeat(seatType: SeatTypeId): PricedPlan[] {
  return pricedPlans.filter((plan) => plan.seatType === seatType);
}

export function lowestCurrentPrice(seatType: SeatTypeId): number {
  const list = plansForSeat(seatType);
  return Math.min(...list.map(currentPrice));
}

/** INR formatting, e.g. 7999 → "₹7,999". */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export interface CalculatorResult {
  plan: PricedPlan;
  standard: number;
  current: number;
  savings: number;
  offerActive: boolean;
}

export function calculatePlan(
  seatType: SeatTypeId,
  duration: string,
): CalculatorResult | null {
  const plan = findPlan(seatType, duration);
  if (!plan) return null;
  return {
    plan,
    standard: plan.standardPrice,
    current: currentPrice(plan),
    savings: savingsFor(plan),
    offerActive: isOfferActive(),
  };
}
