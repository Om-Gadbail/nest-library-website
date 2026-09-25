/**
 * Nest Library — Membership, Admission, Opening Offer pages.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "../components/common/Seo.tsx";
import { Section } from "../components/ui/Section.tsx";
import { Container } from "../components/ui/Container.tsx";
import { PageHero } from "../components/ui/PageHero.tsx";
import {
  PlanComparison,
  MembershipCalculator,
  PricingSection,
  OpeningOfferSection,
  HowItWorks,
  AvailabilityNote,
} from "../components/sections/HomeSectionsB.tsx";
import { FinalCTA } from "../components/sections/HomeSectionsC.tsx";
import { SectionHeading } from "../components/sections/SectionHeading.tsx";
import { PageTransition, FadeIn } from "../components/motion/Motion.tsx";
import { routePaths } from "../config/navigation.ts";
import { openingOffer } from "../data/offers.ts";
import { faqJsonLd } from "../lib/seo.ts";
import { faqs } from "../data/faq.ts";
import { trackEvent } from "../lib/analytics.ts";

export function MembershipPage(): ReactNode {
  return (
    <PageTransition>
      <Seo
        title="Membership & Admission Plans"
        description="Nest Library membership plans: Regular and Confirmed Seats in 1–12 month durations. Compare prices, calculate savings and enquire."
      />
      <PageHero
        eyebrow="Membership"
        title="Admission plans that fit your preparation"
        description="Compare Regular vs Confirmed, calculate your exact plan, and enquire in one step."
        crumbs={[{ label: "Membership" }]}
      />
      <Container className="pt-10 md:pt-14">
        <SectionHeading
          eyebrow="Compare"
          title="Regular vs Confirmed at a glance"
          description="Opening-offer prices shown while the offer is active."
        />
        <div className="mt-8">
          <PlanComparison />
        </div>
      </Container>
      <Container className="pt-10 md:pt-14">
        <SectionHeading eyebrow="Calculator" title="Find your exact plan" />
        <div className="mt-8">
          <MembershipCalculator />
        </div>
      </Container>
      <PricingSection />
      <Container className="mx-auto max-w-2xl pb-16 md:pb-24">
        <AvailabilityNote />
      </Container>
      <FinalCTA />
    </PageTransition>
  );
}

export function AdmissionPage(): ReactNode {
  return (
    <PageTransition>
      <Seo
        title="Admission — How Joining Works"
        description="How admission works at Nest Library: choose a plan, enquire or book a visit, confirm your seat and start studying."
      />
      <PageHero
        eyebrow="Admission"
        title="Joining Nest takes four steps"
        description="No accounts, no confusion — the team confirms everything with you directly."
        crumbs={[{ label: "Admission" }]}
      />
      <HowItWorks />
      <Section labelledBy="admission-cta" compact>
        <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            { label: "Seat Inquiry", to: routePaths.seatInquiry },
            { label: "Book a Visit", to: routePaths.bookVisit },
            { label: "Membership Inquiry", to: routePaths.membershipInquiry },
          ].map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-navy px-5 py-3 font-semibold text-white hover:bg-navy-soft"
              onClick={() => {
                trackEvent("admission_start", { action: action.label });
              }}
            >
              {action.label}{" "}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}

export function OpeningOfferPage(): ReactNode {
  const offerFaqs = faqs.filter((f) =>
    ["opening-offer", "admission-plans", "how-to-join"].includes(f.id),
  );
  return (
    <PageTransition>
      <Seo
        title="Opening Offer — Special Introductory Prices"
        description="Nest Library opening offer: special introductory prices, free registration for early admissions and priority seat selection for Confirmed-Seat members."
        jsonLd={[faqJsonLd(offerFaqs)]}
      />
      <PageHero
        eyebrow={openingOffer.eyebrow}
        title={openingOffer.title}
        description={`${openingOffer.validityNote}. ${openingOffer.freeRegistrationNote}; ${openingOffer.prioritySeatSelectionNote}.`}
        crumbs={[{ label: "Opening Offer" }]}
      />
      <OpeningOfferSection />
      <FadeIn>
        <Container className="pb-16 text-center md:pb-24">
          <Link
            to={routePaths.membership}
            className="inline-flex min-h-[52px] items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:opacity-90"
            onClick={() => {
              trackEvent("offer_click", { surface: "offer-page" });
            }}
          >
            View Admission Plans{" "}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Container>
      </FadeIn>
      <FinalCTA />
    </PageTransition>
  );
}
