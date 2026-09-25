import { useEffect } from "react";
import type { ReactNode } from "react";
import type { PageMeta } from "../../types/common.ts";
import { useDocumentTitle } from "../../hooks/useDocumentTitle.ts";
import { buildCanonicalUrl } from "../../lib/seo.ts";

interface SeoProps extends PageMeta {
  /** Open Graph title override (defaults to the page title). */
  ogTitle?: string;
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
 * Minimal SEO component (foundation, no dependency).
 * Sets title, description, canonical and basic Open Graph tags per page.
 */
export function Seo({
  title,
  description,
  canonical,
  ogTitle,
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
    ogTitleTag.setAttribute("content", ogTitle ?? title);

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
  }, [title, description, canonical, ogTitle]);

  return null;
}
