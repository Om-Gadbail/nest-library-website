import { describe, expect, it, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { FadeIn, Stagger, StaggerItem } from "../Motion.tsx";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });

  class MockIntersectionObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
});

describe("motion primitives", () => {
  it("FadeIn renders children (motion/react import works)", () => {
    render(<FadeIn>revealed content</FadeIn>);
    expect(screen.getByText("revealed content")).toBeInTheDocument();
  });

  it("Stagger renders grouped children", () => {
    render(
      <Stagger>
        <StaggerItem>card one</StaggerItem>
        <StaggerItem>card two</StaggerItem>
      </Stagger>,
    );
    expect(screen.getByText("card one")).toBeInTheDocument();
    expect(screen.getByText("card two")).toBeInTheDocument();
  });
});
