/**
 * Nest Library — central site configuration.
 *
 * Owner-editable brand surface. Components must read from here —
 * never hardcode brand facts in JSX.
 */

export interface SocialLink {
  label: string;
  href: string;
  /** True while this link is a demo placeholder (hidden in production UI). */
  isPlaceholder: boolean;
}

export const siteConfig = {
  name: "Nest Library",
  shortName: "Nest",
  positioning: ["Self Study Center", "Co-Working Space"],
  tagline: "Better Space Bigger Dreams",
  supportingLine: "Your Study Space, Our Priority.",
  description:
    "Nest Library is a self study center and co-working study space in New Narsala, Nagpur — a calm, focused environment with dedicated seating, membership plans and an opening offer for early admissions.",
  defaultTitle:
    "Nest Library — Self Study Center & Co-Working Study Space in Nagpur",

  /** Production origin once known, e.g. "https://www.nestlibrary.in". */
  canonicalBaseUrl: "" as string,

  cta: {
    primary: "View Admission Plans",
    secondary: "Book a Visit",
    tertiary: "WhatsApp Us",
    join: "Join Nest",
  },

  /** Only real accounts. Placeholders are hidden by the footer. */
  socials: [
    { label: "Instagram", href: "#", isPlaceholder: true },
    { label: "Facebook", href: "#", isPlaceholder: true },
    { label: "YouTube", href: "#", isPlaceholder: true },
  ] as SocialLink[],

  /** Cross-brand note. Keep subtle; never restyle Nest as Prime. */
  relatedBrand: {
    name: "Prime Fitness",
    note: "Study hard. Train smart.",
    href: "#",
    isPlaceholder: true,
  },
} as const;
