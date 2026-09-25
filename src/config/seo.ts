/**
 * Nest Library — SEO configuration (production).
 *
 * Structured data is emitted only for verified facts:
 * - Organization / WebSite / BreadcrumbList: safe (name + positioning).
 * - FAQPage: safe once real FAQs render (data/faq.ts).
 * - LocalBusiness: conservative — name, phone, locality only.
 *   No coordinates, hours, ratings or URLs are fabricated.
 */

import { siteConfig } from "./site.ts";

export const seoConfig = {
  defaultTitle: siteConfig.defaultTitle,
  titleTemplate: `%s — ${siteConfig.name}`,
  defaultDescription: siteConfig.description,

  twitterCard: "summary_large_image",
  robots: "index, follow",

  schemaReady: {
    organization: true,
    localBusiness: true,
    webSite: true,
    faqPage: true,
    breadcrumbList: true,
  },

  searchConsoleVerification: "",
} as const;
