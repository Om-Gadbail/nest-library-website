import { useEffect } from "react";
import type { ReactNode } from "react";
import type { PageMeta } from "../../types/common.ts";
import { useDocumentTitle } from "../../hooks/useDocumentTitle.ts";
import { buildCanonicalUrl, buildPageTitle } from "../../lib/seo.ts";

interface SeoProps extends PageMeta {
  /** Open Graph title override (defaults to the page title). */
  ogTitle?: string;
  /** JSON-LD objects to emit (only verified-fact schemas). */
  jsonLd?: Record<string, unknown>[];
}

function upsertMeta(
  selector: string,
  create: () => HTMLMetaElement,
): HTMLMetaElement {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) return existing;
  const element = create();
  document.head.appendChild(element);
  return element;
}

/**
 * Production SEO component: title, description, canonical,
 * Open Graph basics + verified-fact JSON-LD per page.
 */
export function Seo({
  title,
  description,
  canonical,
  ogTitle,
  jsonLd,
}: SeoProps): ReactNode {
  useDocumentTitle(title);

  useEffect(() => {
    const descriptionTag = upsertMeta('meta[name="description"]', () => {
      const el = document.createElement("meta");
      el.setAttribute("name", "description");
      return el;
    });
    descriptionTag.setAttribute("content", description);

    const ogTitleTag = upsertMeta('meta[property="og:title"]', () => {
      const el = document.createElement("meta");
      el.setAttribute("property", "og:title");
      return el;
    });
    ogTitleTag.setAttribute("content", ogTitle ?? buildPageTitle(title));

    const ogDescriptionTag = upsertMeta(
      'meta[property="og:description"]',
      () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:description");
        return el;
      },
    );
    ogDescriptionTag.setAttribute("content", description);

    const resolvedCanonical =
      canonical ?? buildCanonicalUrl(window.location.pathname);
    let canonicalLink = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (resolvedCanonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", resolvedCanonical);
    } else if (canonicalLink) {
      canonicalLink.remove();
    }

    // JSON-LD lifecycle: tag per index, cleaned on change/unmount.
    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      jsonLd.forEach((schema, index) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.nestJsonLd = String(index);
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
        scripts.push(script);
      });
    }
    return () => {
      for (const script of scripts) script.remove();
    };
  }, [title, description, canonical, ogTitle, jsonLd]);

  return null;
}
