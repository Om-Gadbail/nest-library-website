import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { navigationConfig, routePaths } from "../../config/navigation.ts";
import { siteConfig } from "../../config/site.ts";
import { contactConfig } from "../../config/contact.ts";
import { Container } from "../ui/Container.tsx";

/**
 * TEMPORARY structural footer — not the final footer design.
 * Verifies config-driven content (no hardcoded business facts).
 */
export function SiteFooter(): ReactNode {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div>
          <Link to={routePaths.home} className="font-bold">
            {siteConfig.name}
          </Link>
          <p className="mt-3 max-w-xs text-small text-muted">
            {siteConfig.tagline}
          </p>
        </div>

        <nav aria-label="Explore">
          <p className="text-label font-semibold tracking-wide text-muted uppercase">
            Explore
          </p>
          <ul className="mt-3 space-y-2">
            {navigationConfig.footerExplore.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-small hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Support">
          <p className="text-label font-semibold tracking-wide text-muted uppercase">
            Support
          </p>
          <ul className="mt-3 space-y-2">
            {navigationConfig.footerSupport.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-small hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-label font-semibold tracking-wide text-muted uppercase">
            Get started
          </p>
          <ul className="mt-3 space-y-2">
            {navigationConfig.conversions.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-small hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-small text-muted">
            {contactConfig.phone.label}: {contactConfig.phone.value}
          </p>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-small text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Frontend foundation — visual design in progress.</p>
        </Container>
      </div>
    </footer>
  );
}
