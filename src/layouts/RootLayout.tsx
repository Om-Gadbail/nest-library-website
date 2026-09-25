import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { SiteHeader } from "../components/layout/SiteHeader.tsx";
import { SiteFooter } from "../components/layout/SiteFooter.tsx";

/**
 * Root layout: skip link + structural header + main outlet + footer.
 * Final navbar/footer visuals arrive in a later phase.
 */
export function RootLayout(): ReactNode {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
