/**
 * Nest Library — gallery (honest empty state).
 *
 * No real Nest photographs are committed yet. The array stays empty so
 * the UI renders an intentional "photography coming soon" state instead
 * of fake stock imagery. Add verified photos here to publish them:
 *
 * { id, src: "/images/nest-study-hall-1.jpg", alt: "...", title: "...",
 *   category: "study-space", isPlaceholder: false }
 */

import type { GalleryImage } from "../types/content.ts";

export const galleryImages: GalleryImage[] = [];

export const galleryCategories = [
  { value: "all", label: "All" },
  { value: "study-space", label: "Study Space" },
  { value: "seats", label: "Seats" },
  { value: "facilities", label: "Facilities" },
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
] as const;
