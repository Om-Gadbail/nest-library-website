/**
 * Nest Library — opening-offer announcement bar.
 * Config-driven: hides automatically when `openingOffer.active` is false.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { openingOffer } from "../../data/offers.ts";
import { routePaths } from "../../config/navigation.ts";
import { trackEvent } from "../../lib/analytics.ts";

export function AnnouncementBar(): ReactNode {
  if (!openingOffer.active) return null;

  return (
    <div
      role="region"
      aria-label="Opening offer announcement"
      className="bg-primary text-primary-foreground"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-small font-semibold xs:px-6">
        <span className="inline-flex items-center gap-1.5">
          <Flame aria-hidden="true" className="h-4 w-4" />
          Opening Offer — Special Introductory Prices
        </span>
        <Link
          to={routePaths.membership}
          className="underline underline-offset-4 hover:opacity-90"
          onClick={() => {
            trackEvent("offer_click", { surface: "announcement-bar" });
          }}
        >
          View Plans
        </Link>
      </div>
    </div>
  );
}
