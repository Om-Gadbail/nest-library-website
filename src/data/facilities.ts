/**
 * Nest Library — facilities (verified, OWNER-EDITABLE).
 * Only poster-confirmed facilities are listed as facts.
 * Add new entries here once the owner confirms them — no JSX changes needed.
 */

import type { Facility } from "../types/content.ts";

export const facilities: Facility[] = [
  {
    id: "air-cooling",
    title: "Air Cooling",
    description: "A comfortable indoor climate for long study sessions.",
    icon: "snowflake",
    available: true,
    image: null,
    isPlaceholder: false,
  },
  {
    id: "wifi",
    title: "Wi-Fi",
    description: "Stay connected for study resources and online learning.",
    icon: "wifi",
    available: true,
    image: null,
    isPlaceholder: false,
  },
  {
    id: "unisex",
    title: "Unisex",
    description: "A welcoming study space for every learner.",
    icon: "users",
    available: true,
    image: null,
    isPlaceholder: false,
  },
  {
    id: "convenience-space",
    title: "Convenience Space",
    description: "A convenient setup that supports focused daily study.",
    icon: "coffee",
    available: true,
    image: null,
    isPlaceholder: false,
  },
];
