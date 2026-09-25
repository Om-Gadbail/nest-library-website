/**
 * Nest Library — core content types.
 * Single source of truth for facilities, seats, plans, FAQ and gallery.
 * Prices / availability are nullable: unknown until real business data exists.
 */

/** Marks demo content so placeholder items can never be mistaken for facts. */
export interface PlaceholderFlag {
  /** True while this entry is demo scaffolding, not real business data. */
  isPlaceholder?: boolean;
}

/** Icon reference stored as a string key (resolved to a Lucide icon by UI). */
export type FacilityIconKey =
  | "armchair"
  | "wifi"
  | "snowflake"
  | "book-open"
  | "coffee"
  | "shield-check"
  | "zap"
  | "clock"
  | "users"
  | "lamp-desk";

export interface Facility extends PlaceholderFlag {
  id: string;
  title: string;
  description: string;
  icon: FacilityIconKey;
  /** Null = availability not yet confirmed. */
  available: boolean | null;
  image: { src: string; alt: string } | null;
}

export interface SeatOption extends PlaceholderFlag {
  id: string;
  name: string;
  description: string;
  suitableFor: string[];
  features: string[];
  /** Null = pricing not yet published. Never invent prices. */
  price: number | null;
  /** Human-readable pricing line, e.g. "Pricing on enquiry". */
  priceLabel: string;
  ctaLabel: string;
  /** Null = availability not yet confirmed. */
  available: boolean | null;
}

export interface MembershipPlan extends PlaceholderFlag {
  id: string;
  name: string;
  /** Machine-readable duration, e.g. "1-month". */
  duration: string;
  /** Human-readable duration, e.g. "1 month". */
  durationLabel: string;
  seatType: string;
  /** Null = pricing not yet published. Never invent prices. */
  price: number | null;
  /** Human-readable pricing line, e.g. "Fee on enquiry". */
  priceNote: string;
  features: string[];
  highlighted: boolean;
  ctaLabel: string;
}

export type SeatTypeId = "regular" | "confirmed";

export interface PricedPlan extends PlaceholderFlag {
  id: string;
  seatType: SeatTypeId;
  seatTypeLabel: string;
  /** Machine-readable duration, e.g. "1-month". */
  duration: string;
  /** Human-readable duration, e.g. "1 Month". */
  durationLabel: string;
  /** Duration in months (used by the calculator + comparison). */
  months: number;
  /** Approved standard admission price (INR). */
  standardPrice: number;
  /** Approved opening-offer price (INR). Equals standard when offer off. */
  openingPrice: number;
  /** True while this duration carries the BEST VALUE badge. */
  bestValue: boolean;
  ctaLabel: string;
}

export interface OpeningOffer extends PlaceholderFlag {
  active: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Limited-period line, e.g. "Limited Period — Special Introductory Prices". */
  validityNote: string;
  freeRegistration: boolean;
  freeRegistrationNote: string;
  prioritySeatSelection: boolean;
  prioritySeatSelectionNote: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}

export type FaqCategory =
  | "general"
  | "seats"
  | "membership"
  | "timings"
  | "rules"
  | "visit"
  | "admission"
  | "facilities"
  | "location"
  | "offer"
  | "payments";

export interface Faq extends PlaceholderFlag {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}

export interface GalleryImage extends PlaceholderFlag {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
}

export interface Testimonial extends PlaceholderFlag {
  id: string;
  quote: string;
  name: string;
  /** e.g. "UPSC aspirant" — free text, verified later. */
  role: string;
  /** 1–5 when a real rating exists; null while unverified. */
  rating: number | null;
}
