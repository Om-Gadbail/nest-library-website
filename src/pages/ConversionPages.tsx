/**
 * Nest Library — conversion pages: Contact, Book a Visit, Seat Inquiry,
 * Membership Inquiry, Join Nest (+ Privacy / Terms honesty pages).
 */

import type { ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Seo } from "../components/common/Seo.tsx";
import { Section } from "../components/ui/Section.tsx";
import { Container } from "../components/ui/Container.tsx";
import { PageHero } from "../components/ui/PageHero.tsx";
import { BookVisitForm } from "../components/forms/BookVisitForm.tsx";
import { SeatInquiryForm } from "../components/forms/SeatInquiryForm.tsx";
import { MembershipInquiryForm } from "../components/forms/MembershipInquiryForm.tsx";
import { ContactForm } from "../components/forms/ContactForm.tsx";
import { CallButton } from "../components/integrations/CallButton.tsx";
import { WhatsAppButton } from "../components/integrations/WhatsAppButton.tsx";
import { LocationCard } from "../components/integrations/LocationCard.tsx";
import { FinalCTA } from "../components/sections/HomeSectionsC.tsx";
import { PageTransition, FadeIn } from "../components/motion/Motion.tsx";
import { routePaths } from "../config/navigation.ts";
import { contactConfig } from "../config/contact.ts";
import { trackEvent } from "../lib/analytics.ts";

function ContactAside(): ReactNode {
  return (
    <aside className="space-y-4">
      <LocationCard />
      <div className="rounded-xl border border-border bg-card p-6 shadow-subtle">
        <h2 className="font-extrabold">Prefer to talk directly?</h2>
        <p className="mt-2 text-small leading-relaxed text-muted">
          {contactConfig.phone.value} — call or WhatsApp for the fastest
          response.
        </p>
        <div className="mt-4 grid gap-2">
          <CallButton size="lg" />
          <WhatsAppButton
            intent="general"
            label="WhatsApp Nest"
            surface="contact-aside"
            size="lg"
            variant="outline"
          />
        </div>
      </div>
    </aside>
  );
}

export function ContactPage(): ReactNode {
  return (
    <PageTransition>
      <Seo
        title="Contact Nest Library"
        description={`Contact Nest Library in New Narsala, Nagpur — call, WhatsApp or send an enquiry. ${contactConfig.phone.value}.`}
      />
      <PageHero
        eyebrow="Contact"
        title="Talk to the Nest team"
        description="Call, WhatsApp or send the form — every enquiry reaches a real person."
        crumbs={[{ label: "Contact" }]}
      />
      <Section labelledBy="contact-form">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ContactForm />
          <ContactAside />
        </div>
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}

export function BookVisitPage(): ReactNode {
  return (
    <PageTransition>
      <Seo
        title="Book a Visit"
        description="Book a visit to Nest Library in New Narsala, Nagpur. Share your preferred date and time — the team confirms directly."
      />
      <PageHero
        eyebrow="Book a Visit"
        title="Come experience the environment"
        description="Share your details and preferred time. The Nest team confirms your visit on phone or WhatsApp."
        crumbs={[{ label: "Book a Visit" }]}
      />
      <Section labelledBy="visit-form">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <BookVisitForm />
          <ContactAside />
        </div>
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}

export function SeatInquiryPage(): ReactNode {
  const [params] = useSearchParams();
  return (
    <PageTransition>
      <Seo
        title="Seat Inquiry — Check Availability"
        description="Enquire about Regular or Confirmed Seats at Nest Library. Availability is confirmed enquiry-by-enquiry."
      />
      <PageHero
        eyebrow="Seat Inquiry"
        title="Check availability, honestly"
        description="No live counters, no guesswork — tell us what you need and get a clear answer."
        crumbs={[{ label: "Seat Inquiry" }]}
      />
      <Section labelledBy="seat-form">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <SeatInquiryForm
            defaultSeat={params.get("seat") ?? ""}
            defaultDuration={params.get("duration") ?? ""}
          />
          <ContactAside />
        </div>
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}

export function MembershipInquiryPage(): ReactNode {
  const [params] = useSearchParams();
  return (
    <PageTransition>
      <Seo
        title="Membership Inquiry"
        description="Enquire about Nest Library membership: choose Regular or Confirmed Seat with 1–12 month durations."
      />
      <PageHero
        eyebrow="Membership Inquiry"
        title="Start your membership enquiry"
        description="Pick your seat and duration — admission next steps are confirmed with you directly."
        crumbs={[{ label: "Membership Inquiry" }]}
      />
      <Section labelledBy="membership-form">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <MembershipInquiryForm
            defaultSeat={params.get("seat") ?? ""}
            defaultDuration={params.get("duration") ?? ""}
          />
          <ContactAside />
        </div>
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}

export function JoinPage(): ReactNode {
  return (
    <PageTransition>
      <Seo
        title="Join Nest — Admission"
        description="Join Nest Library: choose your plan, enquire or book a visit, confirm your seat and start studying."
      />
      <PageHero
        eyebrow="Join Nest"
        title="Your study journey starts here"
        description="Discover → see Nest → choose Regular/Confirmed → compare plans → ask → visit → join."
        crumbs={[{ label: "Join Nest" }]}
      />
      <Section labelledBy="join-actions">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "1 · Compare Plans",
              text: "Regular vs Confirmed across 5 durations with opening prices.",
              to: routePaths.membership,
              label: "View Plans",
            },
            {
              title: "2 · Book a Visit",
              text: "See the hall, seating and setup before you decide.",
              to: routePaths.bookVisit,
              label: "Book a Visit",
            },
            {
              title: "3 · Enquire",
              text: "Seat or membership enquiry — confirmed with you directly.",
              to: routePaths.seatInquiry,
              label: "Enquire",
            },
          ].map((card) => (
            <article
              key={card.to}
              className="rounded-xl border border-border bg-card p-7 shadow-card"
            >
              <h2 className="font-extrabold">{card.title}</h2>
              <p className="mt-2 text-small leading-relaxed text-muted">
                {card.text}
              </p>
              <Link
                to={card.to}
                className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:opacity-90"
                onClick={() => {
                  trackEvent("join_click", { action: card.label });
                }}
              >
                {card.label}{" "}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
        <FadeIn className="mx-auto mt-8 max-w-2xl rounded-xl bg-gold-soft p-6 text-center md:p-8">
          <p className="font-extrabold">Fastest path? WhatsApp.</p>
          <p className="mx-auto mt-2 max-w-md text-small text-muted">
            Message the team with your seat + duration and get availability plus
            next steps.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <WhatsAppButton
              intent="join"
              label="Join on WhatsApp"
              surface="join-page"
              size="lg"
            />
            <a
              href={contactConfig.phone.href}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-md border border-border bg-card px-6 py-3 font-semibold hover:bg-muted-background"
              onClick={() => {
                trackEvent("call_click", { surface: "join-page" });
              }}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              Call {contactConfig.phone.value}
            </a>
          </div>
        </FadeIn>
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}

function LegalShell({
  title,
  crumbs,
  children,
}: {
  title: string;
  crumbs: { label: string }[];
  children: ReactNode;
}): ReactNode {
  return (
    <PageTransition>
      <Seo
        title={title}
        description={`${title} — Nest Library, New Narsala, Nagpur.`}
      />
      <PageHero eyebrow="Legal" title={title} crumbs={crumbs} />
      <Section labelledBy="legal">
        <Container narrow>{children}</Container>
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}

export function PrivacyPage(): ReactNode {
  return (
    <LegalShell title="Privacy Policy" crumbs={[{ label: "Privacy" }]}>
      <div className="space-y-4 leading-relaxed text-muted">
        <p>
          Nest Library collects only the details you share in enquiry forms
          (name, phone, study preferences) to respond to your enquiry and
          arrange visits or admissions.
        </p>
        <p>
          Details are used solely for that purpose and are never sold. Analytics
          on this website tracks page interactions only — never phone numbers or
          message content. When the backend CRM launches, records will live in a
          secured database with strict business isolation (Nest data never mixes
          with any other business).
        </p>
        <p>
          To update or remove your enquiry details, contact Nest on{" "}
          <a
            className="font-semibold text-foreground underline underline-offset-4"
            href={contactConfig.phone.href}
          >
            {contactConfig.phone.value}
          </a>{" "}
          or{" "}
          <Link
            className="font-semibold text-foreground underline underline-offset-4"
            to={routePaths.contact}
          >
            via the contact page
          </Link>
          .
        </p>
      </div>
    </LegalShell>
  );
}

export function TermsPage(): ReactNode {
  return (
    <LegalShell title="Terms of Use" crumbs={[{ label: "Terms" }]}>
      <div className="space-y-4 leading-relaxed text-muted">
        <p>
          This website presents verified Nest Library information: seats, plans,
          facilities, FAQs and enquiry flows. Prices shown are the approved
          admission prices; the opening offer applies while marked active.
        </p>
        <p>
          Submitting an enquiry does not reserve a seat or create a membership —
          availability, admission and payments are confirmed with the Nest team
          directly. Seat maps, online booking, payments and member accounts are
          future features and are not claimed as live.
        </p>
        <p className="inline-flex items-center gap-2">
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          Questions?{" "}
          <Link
            className="font-semibold text-foreground underline underline-offset-4"
            to={routePaths.contact}
          >
            Contact Nest
          </Link>
          .
        </p>
      </div>
    </LegalShell>
  );
}
