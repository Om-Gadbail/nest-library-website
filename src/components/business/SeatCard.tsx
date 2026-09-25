/**
 * Nest Library — premium seat cards (Regular / Confirmed).
 * Only confirmed distinctions claimed; availability is enquiry-based.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Crown, MessageCircle } from "lucide-react";
import { routePaths } from "../../config/navigation.ts";
import { buildWhatsAppUrl, type WhatsAppIntent } from "../../lib/whatsapp.ts";
import {
  lowestCurrentPrice,
  formatINR,
  isOfferActive,
} from "../../lib/pricing.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";
import { cn } from "../../lib/cn.ts";
import type { SeatOption } from "../../types/content.ts";
import type { SeatTypeId } from "../../types/content.ts";

interface SeatCardProps {
  seat: SeatOption;
  seatType: SeatTypeId;
  detailsTo: string;
  intent: WhatsAppIntent;
  featured?: boolean;
}

export function SeatCard({
  seat,
  seatType,
  detailsTo,
  intent,
  featured = false,
}: SeatCardProps): ReactNode {
  const from = lowestCurrentPrice(seatType);
  const whatsappHref = buildWhatsAppUrl(intent);

  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border bg-card p-7 shadow-card md:p-8",
        featured ? "border-navy ring-2 ring-navy/15" : "border-border",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-label font-bold tracking-[0.18em] text-muted uppercase">
          {seat.name}
        </p>
        {featured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-navy px-3 py-1 text-label font-bold text-white">
            <Crown aria-hidden="true" className="h-3.5 w-3.5" />
            Priority Selection
          </span>
        )}
      </div>

      <p className="mt-3 text-h2 font-extrabold">
        From {formatINR(from)}
        <span className="text-small font-medium text-muted">*</span>
      </p>
      <p className="mt-1 text-small font-medium text-primary">
        {isOfferActive() ? "Opening-offer price" : "Standard admission price"}
      </p>

      <p className="mt-4 leading-relaxed text-muted">{seat.description}</p>

      <ul className="mt-5 space-y-2.5">
        {seat.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-small">
            <Check
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-leaf"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 grid gap-2">
        <Link
          to={detailsTo}
          className={cn(
            "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold",
            featured
              ? "bg-navy text-white hover:bg-navy-soft"
              : "bg-primary text-primary-foreground hover:opacity-90",
          )}
          onClick={() => {
            trackEvent("seat_view", { seat: seatType });
          }}
        >
          {seat.ctaLabel}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
        <a
          href={whatsappHref}
          {...safeLinkProps(whatsappHref)}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-border px-5 py-3 font-semibold hover:bg-muted-background"
          onClick={() => {
            trackEvent("whatsapp_click", { intent, surface: "seat-card" });
          }}
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          Ask on WhatsApp
        </a>
      </div>

      <p className="mt-4 text-center text-small text-muted">
        Availability confirmed on enquiry —{" "}
        <Link
          to={routePaths.seatInquiry}
          className="font-semibold text-foreground underline underline-offset-4"
        >
          check availability
        </Link>
      </p>
    </article>
  );
}
