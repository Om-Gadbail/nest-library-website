import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ResponsiveImage } from "../ResponsiveImage.tsx";

describe("responsive image states", () => {
  it("renders an honest error state when the photo fails to load", () => {
    render(<ResponsiveImage src="/images/missing.jpg" alt="Study hall" />);
    fireEvent.error(screen.getByAltText("Study hall"));
    expect(
      screen.getByRole("img", { name: /photo unavailable/i }),
    ).toBeInTheDocument();
  });

  it("reserves the aspect ratio to avoid layout shift", () => {
    const { container } = render(
      <ResponsiveImage src="/images/x.jpg" alt="Desk" aspectRatio="4 / 3" />,
    );
    const box = container.firstElementChild as HTMLElement;
    expect(box.style.aspectRatio).toBe("4 / 3");
  });
});
