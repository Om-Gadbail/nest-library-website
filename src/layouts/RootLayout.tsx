import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { AnnouncementBar } from "../components/layout/AnnouncementBar.tsx";
import { SiteHeader } from "../components/layout/SiteHeader.tsx";
import { SiteFooter } from "../components/layout/SiteFooter.tsx";
import { FloatingWhatsApp } from "../components/integrations/FloatingWhatsApp.tsx";
import { MobileActionBar } from "../components/integrations/MobileActionBar.tsx";
import { OfferPopup } from "../components/business/OfferPopup.tsx";

/**
 * Root layout: announcement + header + main + footer + conversion layer
 * (offer popup, floating WhatsApp, mobile action bar).
 */
export function RootLayout(): ReactNode {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main-content" className="has-mobile-cta flex-1 md:pb-0">
        <Outlet />
      </main>
      <SiteFooter />
      <OfferPopup />
      <FloatingWhatsApp />
      <MobileActionBar />
    </>
  );
}
