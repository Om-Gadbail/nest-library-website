/**
 * Nest Library — gallery entries (STRUCTURAL PLACEHOLDERS).
 *
 * No real Nest photographs exist yet. `src` points at a generic local
 * placeholder SVG that is visually distinct from photography, so placeholder
 * imagery can never be mistaken for the real space.
 */

import type { GalleryImage } from "../types/content.ts";

export const galleryImages: GalleryImage[] = [
  {
    id: "demo-photo-1",
    src: "/placeholder.svg",
    alt: "Placeholder graphic standing in for a future Nest Library photograph (not the real space).",
    title: "Example photo slot (placeholder)",
    category: "study-hall",
    isPlaceholder: true,
  },
  {
    id: "demo-photo-2",
    src: "/placeholder.svg",
    alt: "Placeholder graphic standing in for a future Nest Library photograph (not the real space).",
    title: "Example photo slot (placeholder)",
    category: "seating",
    isPlaceholder: true,
  },
];
