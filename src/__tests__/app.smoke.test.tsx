import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "../routes/appRoutes.tsx";

function renderAt(path: string): void {
  const router = createMemoryRouter(appRoutes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
}

describe("application shell", () => {
  it(
    "renders the production homepage on the root route",
    { timeout: 30_000 },
    async () => {
      renderAt("/");

      expect(screen.getByRole("main")).toBeInTheDocument();
      // Lazy page chunks can exceed the default 1s async timeout on cold
      // transform — wait explicitly for the hero heading.
      expect(
        await screen.findByRole(
          "heading",
          { name: /better space/i },
          { timeout: 10_000 },
        ),
      ).toBeInTheDocument();
      expect(
        (
          await screen.findAllByRole(
            "link",
            { name: /view admission plans/i },
            { timeout: 10_000 },
          )
        ).length,
      ).toBeGreaterThan(0);
    },
  );

  it(
    "renders real pages for key routes without dead ends",
    { timeout: 30_000 },
    async () => {
      for (const path of [
        "/about",
        "/facilities",
        "/seats",
        "/seats/regular",
        "/seats/confirmed",
        "/membership",
        "/opening-offer",
        "/gallery",
        "/faq",
        "/location",
        "/contact",
        "/book-a-visit",
        "/seat-inquiry",
        "/membership-inquiry",
        "/join-nest",
      ]) {
        const router = createMemoryRouter(appRoutes, {
          initialEntries: [path],
        });
        const { unmount } = render(<RouterProvider router={router} />);
        // Each lazy page resolves to a real H1 (never a dead end).
        expect(
          await screen.findByRole("heading", { level: 1 }, { timeout: 10_000 }),
        ).toBeInTheDocument();
        unmount();
      }
    },
  );

  it("renders the 404 page for unknown routes", () => {
    renderAt("/does-not-exist");

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
  });
});
