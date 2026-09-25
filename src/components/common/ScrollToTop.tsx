import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

/** Restores scroll-to-top on route change (respects reduced motion). */
export function ScrollToTop(): ReactNode {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "instant" });
  }, [pathname]);

  return null;
}
