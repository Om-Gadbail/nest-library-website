/**
 * Nest Library — approved pricing (OWNER-EDITABLE).
 *
 * Central pricing model. Owners change prices here; components must
 * never scatter prices across JSX. All values are INR (₹).
 *
 * Standard admission vs opening offer, per the approved poster data.
 * When `openingOffer.active` is false, UI shows standard prices.
 */

import type { PricedPlan } from "../types/content.ts";

export const pricedPlans: PricedPlan[] = [
  // ——— Regular Seat ———
  {
    id: "regular-1m",
    seatType: "regular",
    seatTypeLabel: "Regular Seat",
    duration: "1-month",
    durationLabel: "1 Month",
    months: 1,
    standardPrice: 800,
    openingPrice: 699,
    bestValue: false,
    ctaLabel: "Enquire about this plan",
    isPlaceholder: false,
  },
  {
    id: "regular-3m",
    seatType: "regular",
    seatTypeLabel: "Regular Seat",
    duration: "3-months",
    durationLabel: "3 Months",
    months: 3,
    standardPrice: 2400,
    openingPrice: 1999,
    bestValue: false,
    ctaLabel: "Enquire about this plan",
    isPlaceholder: false,
  },
  {
    id: "regular-6m",
    seatType: "regular",
    seatTypeLabel: "Regular Seat",
    duration: "6-months",
    durationLabel: "6 Months",
    months: 6,
    standardPrice: 4800,
    openingPrice: 3999,
    bestValue: false,
    ctaLabel: "Enquire about this plan",
    isPlaceholder: false,
  },
  {
    id: "regular-8m",
    seatType: "regular",
    seatTypeLabel: "Regular Seat",
    duration: "8-months",
    durationLabel: "8 Months",
    months: 8,
    standardPrice: 6400,
    openingPrice: 4999,
    bestValue: false,
    ctaLabel: "Enquire about this plan",
    isPlaceholder: false,
  },
  {
    id: "regular-12m",
    seatType: "regular",
    seatTypeLabel: "Regular Seat",
    duration: "12-months",
    durationLabel: "12 Months",
    months: 12,
    standardPrice: 9600,
    openingPrice: 7999,
    bestValue: true,
    ctaLabel: "Enquire about this plan",
    isPlaceholder: false,
  },
  // ——— Confirmed Seat ———
  {
    id: "confirmed-1m",
    seatType: "confirmed",
    seatTypeLabel: "Confirmed Seat",
    duration: "1-month",
    durationLabel: "1 Month",
    months: 1,
    standardPrice: 1000,
    openingPrice: 899,
    bestValue: false,
    ctaLabel: "Enquire about this plan",
    isPlaceholder: false,
  },
  {
    id: "confirmed-3m",
    seatType: "confirmed",
    seatTypeLabel: "Confirmed Seat",
    duration: "3-months",
    durationLabel: "3 Months",
    months: 3,
    standardPrice: 3000,
    openingPrice: 2599,
    bestValue: false,
    ctaLabel: "Enquire about this plan",
    isPlaceholder: false,
  },
  {
    id: "confirmed-6m",
    seatType: "confirmed",
    seatTypeLabel: "Confirmed Seat",
    duration: "6-months",
    durationLabel: "6 Months",
    months: 6,
    standardPrice: 6000,
    openingPrice: 4999,
    bestValue: false,
    ctaLabel: "Enquire about this plan",
    isPlaceholder: false,
  },
  {
    id: "confirmed-8m",
    seatType: "confirmed",
    seatTypeLabel: "Confirmed Seat",
    duration: "8-months",
    durationLabel: "8 Months",
    months: 8,
    standardPrice: 8000,
    openingPrice: 5999,
    bestValue: false,
    ctaLabel: "Enquire about this plan",
    isPlaceholder: false,
  },
  {
    id: "confirmed-12m",
    seatType: "confirmed",
    seatTypeLabel: "Confirmed Seat",
    duration: "12-months",
    durationLabel: "12 Months",
    months: 12,
    standardPrice: 12000,
    openingPrice: 9999,
    bestValue: true,
    ctaLabel: "Enquire about this plan",
    isPlaceholder: false,
  },
];

export const seatTypeLabels = {
  regular: "Regular Seat",
  confirmed: "Confirmed Seat",
} as const;

export const durationOptions = [
  { value: "1-month", label: "1 Month", months: 1 },
  { value: "3-months", label: "3 Months", months: 3 },
  { value: "6-months", label: "6 Months", months: 6 },
  { value: "8-months", label: "8 Months", months: 8 },
  { value: "12-months", label: "12 Months", months: 12 },
] as const;
