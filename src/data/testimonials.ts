/**
 * Nest Library — reviews & member stories (honest empty states).
 * No real reviews exist yet. Arrays stay empty so the UI renders
 * intentional empty states instead of fabricated testimonials.
 * Add verified entries here to publish them.
 */

import type { Testimonial } from "../types/content.ts";

export const testimonials: Testimonial[] = [];

export interface MemberStory {
  id: string;
  name: string;
  goal: string;
  timeAtNest: string;
  experience: string;
  isPlaceholder?: boolean;
}

export const memberStories: MemberStory[] = [];
