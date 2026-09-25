import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navigationConfig, routePaths } from "../../config/navigation.ts";
import { siteConfig } from "../../config/site.ts";
import { Container } from "../ui/Container.tsx";
import { Button } from "../ui/Button.tsx";
import { PrimaryNav } from "../navigation/PrimaryNav.tsx";

/**
 * TEMPORARY structural header — not the final navbar design.
 * Exists to verify layout, routing and mobile navigation architecture.
 * The final visual navbar will be designed in a later phase.
 */
export function SiteHeader(): ReactNode {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to={routePaths.home}
            className="text-body font-bold tracking-tight"
            aria-label={`${siteConfig.name} — home`}
          >
            {siteConfig.name}
            <span className="ml-2 hidden rounded-full bg-muted-background px-2 py-0.5 align-middle text-label font-semibold text-muted xs:inline">
              Foundation
            </span>
          </Link>

          <div className="hidden lg:block">
            <PrimaryNav />
          </div>

          <div className="flex items-center gap-2">
            <Button
              to={routePaths.bookVisit}
              size="sm"
              className="hidden sm:inline-flex"
            >
              {siteConfig.cta.secondary}
            </Button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                setMenuOpen((open) => !open);
              }}
            >
              {menuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-border lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {[...navigationConfig.primary, ...navigationConfig.conversions].map(
              (item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className="rounded-md px-3 py-2.5 font-medium hover:bg-muted-background"
                >
                  {item.label}
                </Link>
              ),
            )}
          </Container>
        </nav>
      )}
    </header>
  );
}
