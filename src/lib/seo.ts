/**
 * Nest Library — SEO helpers (foundation).
 * Builds absolute titles / canonical URLs once the domain is configured.
 */

import { siteConfig } from "../config/site.ts";

export function buildPageTitle(pageTitle?: string): string {
  if (!pageTitle) return siteConfig.defaultTitle;
  return `${pageTitle} — ${siteConfig.name}`;
}

export function buildCanonicalUrl(path: string): string | undefined {
  const base = siteConfig.canonicalBaseUrl;
  if (!base) return undefined;
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}
