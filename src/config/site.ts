/**
 * Nest Library — central site configuration.
 *
 * PLACEHOLDER NOTICE: contact details, address, timings and URLs below are
 * DEMO values so components have something to consume. They must be replaced
 * with verified business information before launch, and components must read
 * from this file instead of hardcoding business facts.
 */

export interface SocialLink {
  label: string;
  href: string;
  /** True while this link is a demo placeholder. */
  isPlaceholder: boolean;
}

export const siteConfig = {
  name: "Nest Library",
  tagline: "A calm, focused place to study and do deep work.",
  description:
    "Nest Library is a professional self-study and focused-work environment. Explore seats, membership plans, facilities, and book a visit.",
  defaultTitle: "Nest Library — Focused Study Environment",

  /** Production origin once known, e.g. "https://www.example.com". */
  canonicalBaseUrl: "" as string,

  cta: {
    primary: "Enquire about a seat",
    secondary: "Book a visit",
    tertiary: "View membership plans",
  },

  socials: [
    { label: "Instagram", href: "#", isPlaceholder: true },
    { label: "Facebook", href: "#", isPlaceholder: true },
    { label: "YouTube", href: "#", isPlaceholder: true },
  ] as SocialLink[],
} as const;
