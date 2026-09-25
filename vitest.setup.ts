import "@testing-library/jest-dom/vitest";

// jsdom lacks window.matchMedia — used by usePrefersReducedMotion.
// Provide a minimal mock so motion primitives render in tests.
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}

// jsdom lacks IntersectionObserver — used by motion's whileInView.
// A no-op mock keeps viewport reveals renderable in tests.
if (
  typeof window !== "undefined" &&
  typeof window.IntersectionObserver !== "function"
) {
  class MockIntersectionObserver {
    observe(): void {
      // no-op
    }
    unobserve(): void {
      // no-op
    }
    disconnect(): void {
      // no-op
    }
  }
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
}
