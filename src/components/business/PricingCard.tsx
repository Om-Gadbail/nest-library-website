/**
 * Nest Library — pricing card for a single duration plan.
 * Shows standard vs opening price, savings, best-value badge.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { routePaths } from "../../config/navigation.ts";
import {
  currentPrice,
  formatINR,
  isOfferActive,
  savingsFor,
} from "../../lib/pricing.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { cn } from "../../lib/cn.ts";
import type { PricedPlan } from "../../types/content.ts";

export function PricingCard({ plan }: { plan: PricedPlan }): ReactNode {
  const current = currentPrice(plan);
  const savings = savingsFor(plan);
  const offer = isOfferActive();

  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border bg-card p-6 shadow-card",
        plan.bestValue
          ? "border-accent ring-2 ring-accent/30"
          : "border-border",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold">{plan.durationLabel}</h3>
        <div className="flex gap-1.5">
          {offer && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-label font-bold text-primary-foreground">
              Offer
            </span>
          )}
          {plan.bestValue && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-label font-bold text-accent-foreground">
              Best Value
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <p className="text-h2 font-extrabold">{formatINR(current)}</p>
        {offer && savings > 0 && (
          <p className="text-small text-muted line-through">
            {formatINR(plan.standardPrice)}
          </p>
        )}
      </div>
      <p className="mt-1 text-small text-muted">
        {plan.seatTypeLabel} ·{" "}
        {offer && savings > 0 ? (
          <>You save {formatINR(savings)} vs standard</>
        ) : (
          <>Standard admission price</>
        )}
      </p>

      <ul className="mt-4 space-y-2 text-small">
        {(plan.bestValue
          ? [
              "Opening-offer price",
              "Best value for long-term study",
              "Free registration for early admissions",
            ]
          : ["Opening-offer price", "Free registration for early admissions"]
        ).map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-leaf"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`${routePaths.membershipInquiry}?seat=${plan.seatType}&duration=${plan.duration}`}
        className={cn(
          "mt-5 inline-flex min-h-[48px] items-center justify-center rounded-md px-5 py-2.5 font-semibold",
          plan.bestValue
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "border border-border hover:bg-muted-background",
        )}
        onClick={() => {
          trackEvent("plan_view", {
            seat: plan.seatType,
            duration: plan.duration,
          });
        }}
      >
        {plan.ctaLabel}
      </Link>
    </article>
  );
}
