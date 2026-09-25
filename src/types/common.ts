/**
 * Nest Library — shared utility types.
 */

export type StatusFilter = "all" | "available" | "unavailable";

/** Minimal SEO descriptor used by the Seo component and pages. */
export interface PageMeta {
  title: string;
  description: string;
  /** Absolute canonical URL once the production domain is known. */
  canonical?: string;
}
