import { useEffect } from "react";
import { buildPageTitle } from "../lib/seo.ts";

/**
 * Sets `document.title` for the active page (lightweight SEO foundation
 * without a head-management dependency).
 */
export function useDocumentTitle(pageTitle?: string): void {
  useEffect(() => {
    document.title = buildPageTitle(pageTitle);
  }, [pageTitle]);
}
