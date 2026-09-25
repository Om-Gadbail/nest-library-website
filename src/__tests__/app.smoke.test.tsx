import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "../routes/appRoutes.tsx";

function renderAt(path: string): void {
  const router = createMemoryRouter(appRoutes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
}

describe("application shell", () => {
  it("renders the foundation home page on the root route", () => {
    renderAt("/");

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /foundation shell/i }),
    ).toBeInTheDocument();
  });

  it("renders the 404 page for unknown routes", () => {
    renderAt("/does-not-exist");

    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
