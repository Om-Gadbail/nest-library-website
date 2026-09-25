/**
 * Nest Library — homepage sections batch 2:
 * SeatOptions, PricingSection, PlanComparison, MembershipCalculator,
 * OpeningOfferSection, HowItWorks.
 */

import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Crown, MessageCircle } from "lucide-react";
import { routePaths } from "../../config/navigation.ts";
import { seats } from "../../data/seats.ts";
import { pricedPlans } from "../../data/pricing.ts";
import { openingOffer } from "../../data/offers.ts";
import { buildWhatsAppUrl } from "../../lib/whatsapp.ts";
import {
  calculatePlan,
  currentPrice,
  formatINR,
  isOfferActive,
  savingsFor,
} from "../../lib/pricing.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";
import { cn } from "../../lib/cn.ts";
import { Container } from "../ui/Container.tsx";
import { Section } from "../ui/Section.tsx";
import { Select } from "../ui/Select.tsx";
import { Label } from "../ui/Label.tsx";
import { SeatCard } from "../business/SeatCard.tsx";
import { PricingCard } from "../business/PricingCard.tsx";
import { WhatsAppButton } from "../integrations/WhatsAppButton.tsx";
import { SectionHeading } from "./SectionHeading.tsx";
import { FadeIn, Stagger, StaggerItem } from "../motion/Motion.tsx";
import type { SeatTypeId } from "../../types/content.ts";

/* ——— Seat options ——— */

export function SeatOptions(): ReactNode {
  return (
    <section
      aria-labelledby="seat-options"
      className="nest-dark py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          dark
          eyebrow="Seat Options"
          title="Choose your space"
          description="Two clear options. Availability is confirmed on enquiry — never guessed."
        />
        <Stagger className="mt-10 grid gap-5 lg:grid-cols-2">
          {seats.map((seat) => {
            const seatType: SeatTypeId =
              seat.id === "confirmed-seat" ? "confirmed" : "regular";
            return (
              <StaggerItem key={seat.id}>
                <SeatCard
                  seat={seat}
                  seatType={seatType}
                  detailsTo={
                    seatType === "confirmed"
                      ? routePaths.seatsConfirmed
                      : routePaths.seatsRegular
                  }
                  intent={
                    seatType === "confirmed" ? "confirmed-seat" : "regular-seat"
                  }
                  featured={seatType === "confirmed"}
                />
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

/* ——— Admission plans (pricing) ——— */

export function PricingSection(): ReactNode {
  const offer = isOfferActive();
  return (
    <Section labelledBy="admission-plans">
      <SectionHeading
        eyebrow="Admission Plans"
        title="Simple plans, honest prices"
        description={
          offer
            ? "Standard admission vs limited-period opening prices. 12-month plans are marked Best Value."
            : "Standard admission prices for Regular and Confirmed Seats."
        }
      />
      {(["regular", "confirmed"] as SeatTypeId[]).map((seatType) => (
        <div key={seatType} className="mt-12">
          <h3 className="text-center text-h3 font-extrabold">
            {seatType === "regular" ? "Regular Seat" : "Confirmed Seat"}
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {pricedPlans
              .filter((plan) => plan.seatType === seatType)
              .map((plan) => (
                <PricingCard key={plan.id} plan={plan} />
              ))}
          </div>
        </div>
      ))}
      <FadeIn className="mt-10 text-center">
        <p className="text-small text-muted">
          * Opening-offer prices are limited-period. Free registration applies
          to early admissions.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            to={routePaths.membership}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-md bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-soft"
            onClick={() => {
              trackEvent("cta_click", { label: "Compare Plans" });
            }}
          >
            Compare & calculate{" "}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            to={routePaths.openingOffer}
            className="inline-flex min-h-[48px] items-center rounded-md border border-border px-6 py-3 font-semibold hover:bg-muted-background"
          >
            Opening Offer details
          </Link>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ——— Plan comparison table ——— */

export function PlanComparison(): ReactNode {
  const durations = [
    "1-month",
    "3-months",
    "6-months",
    "8-months",
    "12-months",
  ] as const;
  const label: Record<string, string> = {
    "1-month": "1 Month",
    "3-months": "3 Months",
    "6-months": "6 Months",
    "8-months": "8 Months",
    "12-months": "12 Months",
  };
  const offer = isOfferActive();
  const cell = (seat: SeatTypeId, duration: string): string => {
    const plan = pricedPlans.find(
      (p) => p.seatType === seat && p.duration === duration,
    );
    if (!plan) return "—";
    return formatINR(currentPrice(plan));
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
      <table className="w-full min-w-[520px] border-collapse text-left">
        <caption className="sr-only">
          Membership price comparison between Regular Seat and Confirmed Seat
        </caption>
        <thead>
          <tr className="border-b border-border bg-muted-background/60">
            <th
              scope="col"
              className="px-5 py-4 text-small font-bold tracking-wide uppercase"
            >
              Duration
            </th>
            <th
              scope="col"
              className="px-5 py-4 text-small font-bold tracking-wide uppercase"
            >
              Regular Seat
            </th>
            <th
              scope="col"
              className="px-5 py-4 text-small font-bold tracking-wide uppercase"
            >
              Confirmed Seat
            </th>
          </tr>
        </thead>
        <tbody>
          {durations.map((duration) => (
            <tr key={duration} className="border-b border-border last:border-0">
              <th scope="row" className="px-5 py-4 font-semibold">
                {label[duration]}
                {duration === "12-months" && (
                  <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle text-label font-bold text-accent-foreground">
                    Best Value
                  </span>
                )}
              </th>
              <td className="px-5 py-4 font-semibold">
                {cell("regular", duration)}
              </td>
              <td className="px-5 py-4 font-semibold">
                {cell("confirmed", duration)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-border px-5 py-3 text-small text-muted">
        {offer
          ? "Opening-offer prices shown. Standard prices apply once the offer ends."
          : "Standard admission prices shown."}
      </p>
    </div>
  );
}

/* ——— Membership calculator ——— */

export function MembershipCalculator(): ReactNode {
  const [seatType, setSeatType] = useState<SeatTypeId>("regular");
  const [duration, setDuration] = useState<string>("6-months");
  const result = useMemo(
    () => calculatePlan(seatType, duration),
    [seatType, duration],
  );
  const whatsappHref = result
    ? buildWhatsAppUrl(
        "membership",
        `${result.plan.seatTypeLabel} · ${result.plan.durationLabel} · ${formatINR(result.current)}`,
      )
    : buildWhatsAppUrl("membership");

  return (
    <div className="grid gap-6 rounded-xl border border-border bg-card p-6 shadow-card md:p-8 lg:grid-cols-2">
      <div>
        <h3 className="text-h3 font-extrabold">Calculate your plan</h3>
        <p className="mt-1 text-small text-muted">
          Select a seat type and duration — prices come from the central plan
          configuration.
        </p>
        <div className="mt-5 space-y-4">
          <div>
            <Label htmlFor="calc-seat">Seat type</Label>
            <Select
              id="calc-seat"
              value={seatType}
              onChange={(event) => {
                setSeatType(event.target.value as SeatTypeId);
              }}
            >
              <option value="regular">Regular Seat</option>
              <option value="confirmed">Confirmed Seat</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="calc-duration">Duration</Label>
            <Select
              id="calc-duration"
              value={duration}
              onChange={(event) => {
                setDuration(event.target.value);
              }}
            >
              {pricedPlans
                .filter((p) => p.seatType === seatType)
                .map((p) => (
                  <option key={p.duration} value={p.duration}>
                    {p.durationLabel}
                  </option>
                ))}
            </Select>
          </div>
        </div>
      </div>

      <div aria-live="polite" className="rounded-lg bg-muted-background/70 p-6">
        {result ? (
          <>
            <p className="text-small font-semibold text-muted">
              {result.plan.seatTypeLabel} · {result.plan.durationLabel}
              {result.plan.bestValue && (
                <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-label font-bold text-accent-foreground">
                  Best Value
                </span>
              )}
            </p>
            <dl className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <dt className="text-small text-muted">Standard</dt>
                <dd
                  className={cn(
                    "font-semibold",
                    result.offerActive && "line-through opacity-70",
                  )}
                >
                  {formatINR(result.standard)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-small text-muted">
                  {result.offerActive ? "Opening offer" : "Current price"}
                </dt>
                <dd className="text-h3 font-extrabold text-primary">
                  {formatINR(result.current)}
                </dd>
              </div>
              {result.offerActive && (
                <div className="flex items-center justify-between rounded-md bg-leaf-soft px-3 py-2">
                  <dt className="text-small font-semibold">You save</dt>
                  <dd className="font-extrabold text-leaf">
                    {formatINR(result.savings)}
                  </dd>
                </div>
              )}
            </dl>
            <div className="mt-5 grid gap-2">
              <Link
                to={`${routePaths.membershipInquiry}?seat=${result.plan.seatType}&duration=${result.plan.duration}`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
                onClick={() => {
                  trackEvent("cta_click", {
                    label: "Enquire Now",
                    surface: "calculator",
                  });
                }}
              >
                Enquire Now
              </Link>
              <a
                href={whatsappHref}
                {...safeLinkProps(whatsappHref)}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 font-semibold hover:bg-muted-background"
                onClick={() => {
                  trackEvent("whatsapp_click", {
                    intent: "membership",
                    surface: "calculator",
                  });
                }}
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Enquire on WhatsApp
              </a>
            </div>
          </>
        ) : (
          <p className="text-muted">Please select a valid combination.</p>
        )}
      </div>
    </div>
  );
}

/* ——— Opening offer ——— */

export function OpeningOfferSection(): ReactNode {
  if (!openingOffer.active) return null;
  const whatsappHref = buildWhatsAppUrl("opening-offer");

  return (
    <section aria-labelledby="opening-offer" className="py-16 md:py-24">
      <Container>
        <div className="nest-dark relative overflow-hidden rounded-2xl px-6 py-12 md:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="absolute -top-24 right-[-5%] h-72 w-72 rounded-full bg-primary/30 blur-[90px]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[-30%] left-[-5%] h-72 w-72 rounded-full bg-accent/20 blur-[90px]"
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-label font-bold tracking-[0.16em] uppercase">
              {openingOffer.eyebrow} · {openingOffer.validityNote}
            </p>
            <h2
              id="opening-offer"
              className="section-title mt-4 font-extrabold text-white"
            >
              {openingOffer.title}
            </h2>
            <div className="mx-auto mt-6 grid max-w-xl gap-3 text-left sm:grid-cols-2">
              <p className="flex items-start gap-2.5 rounded-lg border border-white/15 bg-white/5 p-4 text-small font-medium text-white">
                <BadgeCheck
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-leaf"
                />
                {openingOffer.freeRegistrationNote}
              </p>
              <p className="flex items-start gap-2.5 rounded-lg border border-white/15 bg-white/5 p-4 text-small font-medium text-white">
                <Crown
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                />
                {openingOffer.prioritySeatSelectionNote}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to={routePaths.membership}
                className="inline-flex min-h-[52px] items-center rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:opacity-90"
                onClick={() => {
                  trackEvent("offer_click", { surface: "offer-section" });
                }}
              >
                {openingOffer.primaryCtaLabel}
              </Link>
              <a
                href={whatsappHref}
                {...safeLinkProps(whatsappHref)}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-md border border-white/25 px-7 py-3.5 font-semibold text-white hover:bg-white/10"
                onClick={() => {
                  trackEvent("whatsapp_click", {
                    intent: "opening-offer",
                    surface: "offer-section",
                  });
                }}
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                {openingOffer.secondaryCtaLabel}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ——— How it works ——— */

const STEPS = [
  {
    n: "01",
    title: "Choose Your Plan",
    text: "Compare Regular and Confirmed Seats and pick a duration that fits your preparation.",
  },
  {
    n: "02",
    title: "Enquire / Book a Visit",
    text: "Send an enquiry or book a visit — on the website, WhatsApp or phone.",
  },
  {
    n: "03",
    title: "Confirm Your Seat",
    text: "The Nest team confirms availability and your seat with you directly.",
  },
  {
    n: "04",
    title: "Start Your Study Journey",
    text: "Settle into your routine in a calm space built for consistency.",
  },
];

export function HowItWorks(): ReactNode {
  return (
    <Section labelledBy="how-it-works">
      <SectionHeading
        eyebrow="How It Works"
        title="From discovery to your first focused session"
        description="A simple path — no accounts, no confusion. When online booking arrives, this becomes Choose → Reserve → Pay → Confirmation."
      />
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <StaggerItem key={step.n}>
            <article className="h-full rounded-lg border border-border bg-card p-6 shadow-subtle">
              <p className="text-h2 font-extrabold text-primary">{step.n}</p>
              <h3 className="mt-2 font-bold">{step.title}</h3>
              <p className="mt-2 text-small leading-relaxed text-muted">
                {step.text}
              </p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
      <FadeIn className="mt-8 text-center">
        <WhatsAppButton
          intent="seat-availability"
          label="Check Availability on WhatsApp"
          surface="how-it-works"
          variant="outline"
          size="lg"
        />
      </FadeIn>
    </Section>
  );
}

/* ——— Availability note ——— */

export function AvailabilityNote(): ReactNode {
  const href = buildWhatsAppUrl("seat-availability");
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center shadow-subtle md:p-8">
      <h3 className="text-h3 font-extrabold">Interested in a seat?</h3>
      <p className="mx-auto mt-2 max-w-md text-small leading-relaxed text-muted">
        Live seat counts are not published yet — availability is confirmed
        enquiry-by-enquiry. Ask the team and get a clear answer.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <a
          href={href}
          {...safeLinkProps(href)}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
          onClick={() => {
            trackEvent("whatsapp_click", {
              intent: "seat-availability",
              surface: "availability-note",
            });
          }}
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          Check Availability
        </a>
        <Link
          to={routePaths.seatInquiry}
          className="inline-flex min-h-[48px] items-center rounded-md border border-border px-6 py-3 font-semibold hover:bg-muted-background"
        >
          Seat Inquiry
        </Link>
      </div>
    </div>
  );
}

/* savings helper for table footnotes */
export function savingsLine(seat: SeatTypeId, duration: string): string {
  const plan = pricedPlans.find(
    (p) => p.seatType === seat && p.duration === duration,
  );
  if (!plan) return "";
  const savings = savingsFor(plan);
  return savings > 0 ? `Save ${formatINR(savings)}` : "";
}
