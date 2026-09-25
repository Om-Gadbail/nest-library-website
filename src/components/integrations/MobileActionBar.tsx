/**
 * Nest Library — mobile sticky action bar.
 * Safe-area aware, touch-friendly, never covers form actions
 * (pages add bottom padding via `.has-mobile-cta`).
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { routePaths } from "../../config/navigation.ts";
import { contactConfig } from "../../config/contact.ts";
import { buildWhatsAppUrl } from "../../lib/whatsapp.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";

export function MobileActionBar(): ReactNode {
  const whatsappHref = buildWhatsAppUrl("general");

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="region"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-3 gap-1 px-3 pt-2 pb-2">
        <a
          href={contactConfig.phone.href}
          className="inline-flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-md text-label font-semibold text-foreground hover:bg-muted-background"
          onClick={() => {
            trackEvent("call_click", { surface: "mobile-bar" });
          }}
        >
          <Phone aria-hidden="true" className="h-5 w-5" />
          Call
        </a>
        <a
          href={whatsappHref}
          {...safeLinkProps(whatsappHref)}
          className="inline-flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-md text-label font-semibold text-foreground hover:bg-muted-background"
          onClick={() => {
            trackEvent("whatsapp_click", {
              intent: "general",
              surface: "mobile-bar",
            });
          }}
        >
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
          WhatsApp
        </a>
        <Link
          to={routePaths.bookVisit}
          className="inline-flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-md bg-primary text-label font-semibold text-primary-foreground hover:opacity-90"
          onClick={() => {
            trackEvent("cta_click", {
              label: "Book a Visit",
              surface: "mobile-bar",
            });
          }}
        >
          <CalendarCheck aria-hidden="true" className="h-5 w-5" />
          Book Visit
        </Link>
      </div>
    </div>
  );
}
