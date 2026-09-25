import { describe, expect, it } from "vitest";
import { pricedPlans } from "../data/pricing.ts";
import { openingOffer } from "../data/offers.ts";
import {
  calculatePlan,
  currentPrice,
  formatINR,
  isOfferActive,
  lowestCurrentPrice,
  savingsFor,
} from "../lib/pricing.ts";

describe("pricing engine (approved poster data)", () => {
  it("exposes 10 plans: 5 durations × 2 seat types", () => {
    expect(pricedPlans).toHaveLength(10);
  });

  it("matches the complete approved price table (PART 26)", () => {
    const standard = new Map(pricedPlans.map((p) => [p.id, p.standardPrice]));
    const opening = new Map(pricedPlans.map((p) => [p.id, p.openingPrice]));
    const expected: Record<string, [number, number]> = {
      "regular-1m": [800, 699],
      "regular-3m": [2400, 1999],
      "regular-6m": [4800, 3999],
      "regular-8m": [6400, 4999],
      "regular-12m": [9600, 7999],
      "confirmed-1m": [1000, 899],
      "confirmed-3m": [3000, 2599],
      "confirmed-6m": [6000, 4999],
      "confirmed-8m": [8000, 5999],
      "confirmed-12m": [12000, 9999],
    };
    for (const [id, [std, off]] of Object.entries(expected)) {
      expect(standard.get(id), `${id} standard`).toBe(std);
      expect(opening.get(id), `${id} opening`).toBe(off);
    }
  });

  it("matches approved standard admission prices", () => {
    const lookup = new Map(pricedPlans.map((p) => [p.id, p.standardPrice]));
    expect(lookup.get("regular-1m")).toBe(800);
    expect(lookup.get("regular-12m")).toBe(9600);
    expect(lookup.get("confirmed-1m")).toBe(1000);
    expect(lookup.get("confirmed-12m")).toBe(12000);
  });

  it("matches approved opening-offer prices", () => {
    const lookup = new Map(pricedPlans.map((p) => [p.id, p.openingPrice]));
    expect(lookup.get("regular-1m")).toBe(699);
    expect(lookup.get("regular-12m")).toBe(7999);
    expect(lookup.get("confirmed-1m")).toBe(899);
    expect(lookup.get("confirmed-12m")).toBe(9999);
  });

  it("marks 12-month plans as best value", () => {
    expect(
      pricedPlans
        .filter((p) => p.bestValue)
        .map((p) => p.id)
        .sort(),
    ).toEqual(["confirmed-12m", "regular-12m"]);
  });

  it("computes savings from configuration, e.g. Regular 6-month saves ₹801", () => {
    const result = calculatePlan("regular", "6-months");
    expect(result?.standard).toBe(4800);
    expect(result?.current).toBe(3999);
    expect(result?.savings).toBe(801);
  });

  it("offers the lowest current price per seat type", () => {
    expect(lowestCurrentPrice("regular")).toBe(699);
    expect(lowestCurrentPrice("confirmed")).toBe(899);
  });

  it("follows the offer flag for current price vs savings", () => {
    const plan = pricedPlans[0];
    if (isOfferActive()) {
      expect(currentPrice(plan)).toBe(plan.openingPrice);
      expect(savingsFor(plan)).toBe(plan.standardPrice - plan.openingPrice);
    } else {
      expect(currentPrice(plan)).toBe(plan.standardPrice);
      expect(savingsFor(plan)).toBe(0);
    }
    expect(openingOffer.freeRegistration).toBe(true);
  });

  it("formats INR with Indian digit grouping", () => {
    expect(formatINR(7999)).toBe("₹7,999");
    expect(formatINR(12000)).toBe("₹12,000");
  });
});
