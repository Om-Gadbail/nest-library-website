/**
 * Nest Library — SEO helpers (production).
 * Titles, canonicals and honest JSON-LD (no fabricated fields).
 */

import { siteConfig } from "../config/site.ts";
import { contactConfig } from "../config/contact.ts";
import { env } from "./env.ts";

export function buildPageTitle(pageTitle?: string): string {
  if (!pageTitle) return siteConfig.defaultTitle;
  return `${pageTitle} — ${siteConfig.name}`;
}

export function siteOrigin(): string {
  if (env.siteUrl) return env.siteUrl.replace(/\/+$/, "");
  if (siteConfig.canonicalBaseUrl)
    return siteConfig.canonicalBaseUrl.replace(/\/+$/, "");
  return "";
}

export function buildCanonicalUrl(path: string): string | undefined {
  const base = siteOrigin();
  if (!base) return undefined;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

function originOrUndefined(): string | undefined {
  const origin = siteOrigin();
  return origin ? origin : undefined;
}

/** Organization schema — verified name/positioning only. */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: contactConfig.phone.value,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactConfig.addressParts.street || undefined,
      addressLocality: contactConfig.addressParts.area,
      addressRegion: `${contactConfig.addressParts.city}, ${contactConfig.addressParts.state}`,
      addressCountry: contactConfig.addressParts.country,
    },
    ...(originOrUndefined() ? { url: originOrUndefined() } : {}),
  };
}

/** LocalBusiness schema — conservative, no invented fields. */
export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Library",
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: contactConfig.phone.value,
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Narsala, Nagpur",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  const base = originOrUndefined();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    ...(base ? { url: base } : {}),
  };
}

export function faqJsonLd(
  faqs: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  const base = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(base ? { item: `${base}${item.path}` } : {}),
    })),
  };
}
