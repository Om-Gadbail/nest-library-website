import { useEffect, useState } from "react";

/**
 * Minimal media-query hook for responsive behavior that truly needs JS
 * (layout itself stays CSS-driven). Query must include parentheses,
 * e.g. "(min-width: 768px)".
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const list = window.matchMedia(query);

    const onChange = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    list.addEventListener("change", onChange);
    return () => {
      list.removeEventListener("change", onChange);
    };
  }, [query]);

  return matches;
}
