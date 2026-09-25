/**
 * Nest Library — SEO configuration (foundation).
 *
 * Central defaults for meta tags and structured-data readiness.
 * LocalBusiness / Organization / FAQ schemas are emitted only when real page
 * content supports them — never output schema for placeholder content.
 */

import { siteConfig } from "./site.ts";

export const seoConfig = {
  defaultTitle: siteConfig.defaultTitle,
  titleTemplate: `%s — ${siteConfig.name}`,
  defaultDescription: siteConfig.description,

  /** Twitter/X card type used across pages. */
  twitterCard: "summary_large_image",

  /** Robots default for public pages (overridden per-page when needed). */
  robots: "index, follow",

  /**
   * Structured-data readiness flags. All false until verified business facts
   * exist. Pages check these before emitting JSON-LD.
   */
  schemaReady: {
    organization: false,
    localBusiness: false,
    webSite: false,
    faqPage: false,
    breadcrumbList: false,
  },

  /** Google Search Console verification token (empty until connected). */
  searchConsoleVerification: "",
} as const;
