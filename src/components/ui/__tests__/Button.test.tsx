import { describe, expect, it } from "vitest";
import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Button } from "../Button.tsx";

function renderButton(ui: ReactElement): void {
  render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("Button primitive", () => {
  it("renders a native button by default", () => {
    renderButton(<Button>Enquire now</Button>);
    const button = screen.getByRole("button", { name: "Enquire now" });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });

  it("renders a client-side link when `to` is given", () => {
    renderButton(<Button to="/contact">Contact</Button>);
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("renders an anchor when `href` is given", () => {
    renderButton(<Button href="https://example.com">External</Button>);
    expect(screen.getByRole("link", { name: "External" })).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });
});
