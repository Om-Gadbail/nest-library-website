/**
 * Nest Library — Rules, FAQ, Location pages.
 */

import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ClipboardList, MessageCircle } from "lucide-react";
import { Seo } from "../components/common/Seo.tsx";
import { Section } from "../components/ui/Section.tsx";
import { Container } from "../components/ui/Container.tsx";
import { PageHero } from "../components/ui/PageHero.tsx";
import { FAQItem } from "../components/business/FAQItem.tsx";
import { LocationCard } from "../components/integrations/LocationCard.tsx";
import { GoogleMap } from "../components/integrations/GoogleMap.tsx";
import { GetDirectionsButton } from "../components/integrations/GetDirectionsButton.tsx";
import { CallButton } from "../components/integrations/CallButton.tsx";
import { FinalCTA } from "../components/sections/HomeSectionsC.tsx";
import { PageTransition, FadeIn } from "../components/motion/Motion.tsx";
import { routePaths } from "../config/navigation.ts";
import { nestRules, rulesNote } from "../data/rules.ts";
import { faqCategories, faqs } from "../data/faq.ts";
import { contactConfig } from "../config/contact.ts";
import { businessConfig } from "../config/business.ts";
import { buildWhatsAppUrl } from "../lib/whatsapp.ts";
import { trackEvent } from "../lib/analytics.ts";
import { safeLinkProps } from "../lib/urls.ts";
import { faqJsonLd } from "../lib/seo.ts";
import { cn } from "../lib/cn.ts";

export function RulesPage(): ReactNode {
  return (
    <PageTransition>
      <Seo
        title="Rules — Community Guidelines"
        description="Nest Library community guidelines for a focused, distraction-free study environment. Confirmed rules will be published here."
      />
      <PageHero
        eyebrow="Rules"
        title="A focused environment needs clear expectations"
        description="Guidelines that protect everyone's study time — published only once confirmed by the Nest team."
        crumbs={[{ label: "Rules" }]}
      />
      <Section labelledBy="community-rules">
        {nestRules.length === 0 ? (
          <div className="mx-auto max-w-2xl text-center">
            <ClipboardList
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-muted"
            />
            <h2
              id="community-rules"
              className="subsection-title mt-4 font-extrabold"
            >
              Guidelines coming soon
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
              {rulesNote}
            </p>
            <p className="mx-auto mt-2 max-w-md text-small text-muted">
              We do not invent silence, food, phone, cancellation or refund
              policies — anything not listed here should be confirmed with the
              team.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {nestRules.map((rule) => (
              <article
                key={rule.id}
                className="rounded-lg border border-border bg-card p-6 shadow-subtle"
              >
                <h2 className="font-extrabold">{rule.title}</h2>
                <p className="mt-2 text-small leading-relaxed text-muted">
                  {rule.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}

export function FaqPage(): ReactNode {
  const [category, setCategory] = useState<string>("all");
  const filtered = useMemo(
    () =>
      category === "all"
        ? faqs
        : faqs.filter((faq) => faq.category === category),
    [category],
  );

  return (
    <PageTransition>
      <Seo
        title="FAQ — Seats, Plans, Visit & More"
        description="Answers about Nest Library seats, membership plans, opening offer, facilities, timings, visits and location."
        jsonLd={[faqJsonLd(faqs)]}
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered honestly"
        description="Only confirmed information. Timings and availability answers direct you to the team rather than guessing."
        crumbs={[{ label: "FAQ" }]}
      />
      <Section labelledBy="faq-list">
        <div
          className="flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter FAQs by category"
        >
          {faqCategories.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setCategory(option.value);
              }}
              aria-pressed={category === option.value}
              className={cn(
                "min-h-[44px] rounded-full border px-4 py-2 text-small font-semibold",
                category === option.value
                  ? "border-navy bg-navy text-white"
                  : "border-border bg-card hover:bg-muted-background",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          {filtered.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted">
              No questions in this category yet.
            </p>
          )}
        </div>
        <FadeIn className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-small text-muted">Still curious?</p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <Link
              to={routePaths.contact}
              className="inline-flex min-h-[48px] items-center rounded-md bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-soft"
            >
              Contact Nest
            </Link>
            <Link
              to={routePaths.bookVisit}
              className="inline-flex min-h-[48px] items-center rounded-md border border-border px-6 py-3 font-semibold hover:bg-muted-background"
            >
              Book a Visit
            </Link>
          </div>
        </FadeIn>
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}

export function LocationPage(): ReactNode {
  const whatsappHref = buildWhatsAppUrl("general");
  return (
    <PageTransition>
      <Seo
        title="Location — New Narsala, Nagpur"
        description="Find Nest Library: 2nd Floor, New Narsala, Nagpur, Maharashtra, India. Call or WhatsApp for directions and current timings."
      />
      <PageHero
        eyebrow="Location"
        title="Find Nest in New Narsala, Nagpur"
        description="2nd Floor, New Narsala, Nagpur, Maharashtra, India."
        crumbs={[{ label: "Location" }]}
      />
      <Section labelledBy="location-details">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <LocationCard showMap={false} />
            <div className="rounded-xl border border-border bg-card p-6 shadow-subtle">
              <h2 className="font-extrabold">Visit checklist</h2>
              <ul className="mt-3 space-y-2 text-small text-muted">
                <li>
                  · {businessConfig.openingHours.days} ·{" "}
                  {businessConfig.openingHours.hours}
                </li>
                <li>· Carry a valid phone number for entry coordination</li>
                <li>· Ask for the study hall on the 2nd Floor</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <GetDirectionsButton size="lg" />
                <a
                  href={whatsappHref}
                  {...safeLinkProps(whatsappHref)}
                  className="inline-flex min-h-[52px] items-center gap-2 rounded-md border border-border px-6 py-3 font-semibold hover:bg-muted-background"
                  onClick={() => {
                    trackEvent("whatsapp_click", {
                      intent: "general",
                      surface: "location-page",
                    });
                  }}
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  Ask for Directions
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <GoogleMap />
            <div className="rounded-xl border border-border bg-card p-6 shadow-subtle">
              <h2 className="font-extrabold">Contact before you come</h2>
              <p className="mt-2 text-small leading-relaxed text-muted">
                {contactConfig.phone.value} — the team confirms timings and
                guides you to the entrance.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <CallButton size="lg" />
                <Link
                  to={routePaths.bookVisit}
                  className="inline-flex min-h-[52px] items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
                >
                  Book a Visit{" "}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Container className="pb-16 md:pb-24">
        <p className="text-center text-small text-muted">
          Map embed and one-tap directions appear here once the verified Google
          Maps URL is configured. No coordinates are guessed.
        </p>
      </Container>
      <FinalCTA />
    </PageTransition>
  );
}
