import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the `prefers-reduced-motion` media query so motion work can adapt.
 * Initial value is read lazily; the effect only subscribes to changes.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() =>
    typeof window === "undefined" ? false : window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(QUERY);

    const onChange = (event: MediaQueryListEvent): void => {
      setPrefersReduced(event.matches);
    };

    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
    };
  }, []);

  return prefersReduced;
}
