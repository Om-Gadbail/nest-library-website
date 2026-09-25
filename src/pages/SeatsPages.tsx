/**
 * Nest Library — Seats overview + Regular / Confirmed detail pages.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Crown } from "lucide-react";
import { Seo } from "../components/common/Seo.tsx";
import { Section } from "../components/ui/Section.tsx";
import { Container } from "../components/ui/Container.tsx";
import { PageHero } from "../components/ui/PageHero.tsx";
import { SeatCard } from "../components/business/SeatCard.tsx";
import { PricingCard } from "../components/business/PricingCard.tsx";
import { FAQItem } from "../components/business/FAQItem.tsx";
import { AvailabilityNote } from "../components/sections/HomeSectionsB.tsx";
import { FinalCTA } from "../components/sections/HomeSectionsC.tsx";
import { SectionHeading } from "../components/sections/SectionHeading.tsx";
import { PageTransition, FadeIn } from "../components/motion/Motion.tsx";
import { routePaths } from "../config/navigation.ts";
import { seats } from "../data/seats.ts";
import { pricedPlans } from "../data/pricing.ts";
import { faqs } from "../data/faq.ts";
import { formatINR, lowestCurrentPrice } from "../lib/pricing.ts";
import { trackEvent } from "../lib/analytics.ts";

export function SeatsPage(): ReactNode {
  return (
    <PageTransition>
      <Seo
        title="Seat Options — Regular & Confirmed"
        description="Compare Nest Library seat options: Regular Seat and Confirmed Seat with priority seat selection. Opening-offer prices in Nagpur."
      />
      <PageHero
        eyebrow="Seats"
        title="Choose your space"
        description="Two clear options with honest, configuration-driven pricing. Availability is confirmed on enquiry."
        crumbs={[{ label: "Seats" }]}
      />
      <Section labelledBy="seat-options">
        <div className="grid gap-5 lg:grid-cols-2">
          <SeatCard
            seat={seats[0]}
            seatType="regular"
            detailsTo={routePaths.seatsRegular}
            intent="regular-seat"
          />
          <SeatCard
            seat={seats[1]}
            seatType="confirmed"
            detailsTo={routePaths.seatsConfirmed}
            intent="confirmed-seat"
            featured
          />
        </div>
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <AvailabilityNote />
        </FadeIn>
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}

function SeatDetail({
  seatId,
  title,
  crumbs,
  description,
  featured,
}: {
  seatId: "regular-seat" | "confirmed-seat";
  title: string;
  crumbs: { label: string; to?: string }[];
  description: string;
  featured?: boolean;
}): ReactNode {
  const seat = seats.find((s) => s.id === seatId) ?? seats[0];
  const seatType = seatId === "confirmed-seat" ? "confirmed" : "regular";
  const seatPlans = pricedPlans.filter((p) => p.seatType === seatType);
  const seatFaqs = faqs.filter((f) =>
    [
      "regular-vs-confirmed",
      "admission-plans",
      "availability",
      "visit-before-joining",
    ].includes(f.id),
  );

  return (
    <PageTransition>
      <Seo title={title} description={description} />
      <PageHero
        eyebrow={seat.name}
        title={title}
        description={description}
        crumbs={crumbs}
      />
      <Section labelledBy="seat-detail">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div>
            <h2 id="seat-detail" className="subsection-title font-extrabold">
              Who is it for?
            </h2>
            <ul className="mt-4 space-y-2">
              {seat.suitableFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-small">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-leaf"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-extrabold">What is included?</h3>
            <ul className="mt-3 space-y-2">
              {seat.features.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-small">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-leaf"
                  />
                  {item}
                </li>
              ))}
            </ul>
            {featured && (
              <p className="mt-5 flex items-start gap-2 rounded-lg bg-gold-soft p-4 text-small font-medium">
                <Crown
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                />
                Priority seat selection is confirmed for Confirmed-Seat members
                — pick your preferred seat first.
              </p>
            )}
            <p className="mt-5 text-small text-muted">
              From {formatINR(lowestCurrentPrice(seatType))} ·{" "}
              <Link
                to={routePaths.membership}
                className="font-semibold text-foreground underline underline-offset-4"
              >
                see all durations
              </Link>
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to={routePaths.seatInquiry}
                className="inline-flex min-h-[48px] items-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
                onClick={() => {
                  trackEvent("seat_view", { seat: seatType });
                }}
              >
                Enquire{" "}
                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to={routePaths.bookVisit}
                className="inline-flex min-h-[48px] items-center rounded-md border border-border px-6 py-3 font-semibold hover:bg-muted-background"
              >
                Book a Visit
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-extrabold">Available durations & prices</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {seatPlans.map((plan) => (
                <PricingCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section labelledBy="seat-faq" compact>
        <Container className="mx-auto max-w-3xl">
          <SectionHeading title="Seat questions" />
          <div className="mt-8 space-y-3">
            {seatFaqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </Container>
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}

export function RegularSeatPage(): ReactNode {
  return (
    <SeatDetail
      seatId="regular-seat"
      title="Regular Seat — flexible study option"
      crumbs={[
        { label: "Seats", to: routePaths.seats },
        { label: "Regular Seat" },
      ]}
      description="The Regular Seat at Nest Library is a flexible study option for members, available in 1–12 month durations with opening-offer prices from ₹699."
    />
  );
}

export function ConfirmedSeatPage(): ReactNode {
  return (
    <SeatDetail
      seatId="confirmed-seat"
      title="Confirmed Seat — dedicated option with priority selection"
      crumbs={[
        { label: "Seats", to: routePaths.seats },
        { label: "Confirmed Seat" },
      ]}
      description="The Confirmed Seat at Nest Library is a more dedicated option with priority seat selection, available in 1–12 month durations from ₹899 (opening offer)."
      featured
    />
  );
}
