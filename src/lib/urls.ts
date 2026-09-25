/**
 * Nest Library — safe URL helpers (foundation).
 * Centralises external-link safety and future API-origin handling.
 */

/** External links opened in a new tab must use these attributes. */
export const SAFE_EXTERNAL_REL = "noopener noreferrer" as const;

/** True for http(s) URLs that leave the current origin. */
export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/**
 * Returns anchor props that keep external links safe by default.
 * Internal routes and placeholders (`#…`) are returned untouched.
 */
export function safeLinkProps(href: string): {
  target?: "_blank";
  rel?: string;
} {
  if (!isExternalUrl(href)) return {};
  return { target: "_blank", rel: SAFE_EXTERNAL_REL };
}

/**
 * Builds an absolute URL from a path once the production origin is known.
 * Returns the path unchanged while the origin is unconfigured.
 */
export function absoluteUrl(path: string, origin?: string): string {
  if (!origin) return path;
  const base = origin.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
