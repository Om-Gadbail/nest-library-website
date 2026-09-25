/**
 * Nest Library — facilities data (STRUCTURAL PLACEHOLDERS).
 * These entries demonstrate the data shape only. They are not real claims
 * about Nest facilities and are not rendered as facts anywhere yet.
 */

import type { Facility } from "../types/content.ts";

export const facilities: Facility[] = [
  {
    id: "demo-quiet-hall",
    title: "Example quiet hall (placeholder)",
    description:
      "Structural placeholder describing the shape of a future facility entry. Replace with verified facility details.",
    icon: "book-open",
    available: null,
    image: null,
    isPlaceholder: true,
  },
  {
    id: "demo-connectivity",
    title: "Example connectivity (placeholder)",
    description:
      "Structural placeholder describing the shape of a future facility entry. Replace with verified facility details.",
    icon: "wifi",
    available: null,
    image: null,
    isPlaceholder: true,
  },
  {
    id: "demo-comfort",
    title: "Example comfort amenity (placeholder)",
    description:
      "Structural placeholder describing the shape of a future facility entry. Replace with verified facility details.",
    icon: "armchair",
    available: null,
    image: null,
    isPlaceholder: true,
  },
];
