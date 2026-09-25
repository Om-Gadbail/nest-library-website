/**
 * Nest Library — homepage sections batch 3:
 * GalleryPreview, ReviewsSection, FaqPreview, LocationSection, FinalCTA.
 * Honest empty states everywhere — no fabricated photos or reviews.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Star,
} from "lucide-react";
import { routePaths } from "../../config/navigation.ts";
import { galleryImages } from "../../data/gallery.ts";
import { testimonials } from "../../data/testimonials.ts";
import { faqs } from "../../data/faq.ts";
import { contactConfig } from "../../config/contact.ts";
import { businessConfig } from "../../config/business.ts";
import { buildWhatsAppUrl } from "../../lib/whatsapp.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";
import { Container } from "../ui/Container.tsx";
import { Section } from "../ui/Section.tsx";
import { FAQItem } from "../business/FAQItem.tsx";
import { LocationCard } from "../integrations/LocationCard.tsx";
import { GoogleMap } from "../integrations/GoogleMap.tsx";
import { GetDirectionsButton } from "../integrations/GetDirectionsButton.tsx";
import { SectionHeading } from "./SectionHeading.tsx";
import { FadeIn, Stagger, StaggerItem } from "../motion/Motion.tsx";

/* ——— Gallery preview (honest empty state) ——— */

export function GalleryPreview(): ReactNode {
  const preview = galleryImages.slice(0, 4);
  return (
    <Section labelledBy="gallery-preview">
      <SectionHeading
        eyebrow="Gallery"
        title="See the space"
        description="Real Nest photography will live here. Visit once — the environment speaks for itself."
      />
      {preview.length === 0 ? (
        <FadeIn className="mt-10">
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted-background/60 p-6 text-center"
              >
                <Camera aria-hidden="true" className="h-6 w-6 text-muted" />
                <p className="text-small font-medium text-muted">
                  Nest photo {index + 1} — coming soon
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to={routePaths.bookVisit}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-md bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-soft"
            >
              Visit to see the space{" "}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              to={routePaths.gallery}
              className="inline-flex min-h-[48px] items-center rounded-md border border-border px-6 py-3 font-semibold hover:bg-muted-background"
            >
              Open Gallery
            </Link>
          </div>
        </FadeIn>
      ) : (
        <FadeIn className="mt-10 text-center">
          <Link
            to={routePaths.gallery}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-md bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-soft"
          >
            Open Gallery <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </FadeIn>
      )}
    </Section>
  );
}

/* ——— Reviews (hidden when no real reviews) ——— */

export function ReviewsSection(): ReactNode {
  if (testimonials.length === 0) return null;
  return (
    <Section labelledBy="reviews">
      <SectionHeading
        eyebrow="Reviews"
        title="What members say"
        description="Genuine member feedback — nothing fabricated."
      />
      <Stagger className="mt-10 grid gap-4 md:grid-cols-2">
        {testimonials.map((review) => (
          <StaggerItem key={review.id}>
            <figure className="h-full rounded-xl border border-border bg-card p-7 shadow-card">
              <Quote aria-hidden="true" className="h-6 w-6 text-accent" />
              <blockquote className="mt-3 leading-relaxed">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-4">
                <p className="font-bold">{review.name}</p>
                <p className="text-small text-muted">{review.role}</p>
                {typeof review.rating === "number" && (
                  <p
                    className="mt-1 inline-flex items-center gap-1 text-small font-semibold"
                    aria-label={`Rated ${String(review.rating)} out of 5`}
                  >
                    <Star
                      aria-hidden="true"
                      className="h-4 w-4 fill-accent text-accent"
                    />
                    {review.rating}/5
                  </p>
                )}
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/** Compact trust line shown when reviews are absent (no fake social proof). */
export function ReviewsEmptyNote(): ReactNode {
  if (testimonials.length > 0) return null;
  return (
    <Section labelledBy="reviews-note" compact>
      <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 text-center shadow-subtle md:p-8">
        <h2 id="reviews-note" className="font-extrabold">
          Early days, honest record
        </h2>
        <p className="mx-auto mt-2 max-w-md text-small leading-relaxed text-muted">
          Nest is newly opening — member reviews will be published here once
          real members share them. The best review is a visit.
        </p>
        <Link
          to={routePaths.bookVisit}
          className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-md bg-navy px-6 py-3 text-small font-semibold text-white hover:bg-navy-soft"
        >
          Book a Visit <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

/* ——— FAQ preview ——— */

export function FaqPreview(): ReactNode {
  const preview = faqs.slice(0, 5);
  return (
    <Section labelledBy="faq-preview">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions, answered honestly"
        description="Only confirmed information. Anything else — ask the team directly."
      />
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {preview.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))}
      </div>
      <FadeIn className="mt-8 text-center">
        <Link
          to={routePaths.faq}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-md border border-border bg-card px-6 py-3 font-semibold hover:bg-muted-background"
        >
          View all FAQs <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </FadeIn>
    </Section>
  );
}

/* ——— Location ——— */

export function LocationSection(): ReactNode {
  const whatsappHref = buildWhatsAppUrl("general");
  return (
    <section
      aria-labelledby="find-nest"
      className="bg-muted-background/60 py-16 md:py-24"
    >
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-label font-bold tracking-[0.2em] text-primary uppercase">
              Location
            </p>
            <h2 id="find-nest" className="section-title mt-2 font-extrabold">
              Find Nest in New Narsala, Nagpur
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              {contactConfig.addressParts.floor},{" "}
              {contactConfig.addressParts.area},{" "}
              {contactConfig.addressParts.city},{" "}
              {contactConfig.addressParts.state},{" "}
              {contactConfig.addressParts.country}.
            </p>
            <p className="mt-2 text-small text-muted">
              {businessConfig.openingHours.days} ·{" "}
              {businessConfig.openingHours.hours} — call or WhatsApp for current
              timings.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <GetDirectionsButton size="lg" />
              <a
                href={whatsappHref}
                {...safeLinkProps(whatsappHref)}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-md border border-border bg-card px-6 py-3 font-semibold hover:bg-muted-background"
                onClick={() => {
                  trackEvent("whatsapp_click", {
                    intent: "general",
                    surface: "location-section",
                  });
                }}
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                WhatsApp for Location
              </a>
              <Link
                to={routePaths.location}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-md bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-soft"
              >
                <MapPin aria-hidden="true" className="h-4 w-4" />
                Location Details
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <GoogleMap />
            <LocationCard />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ——— Final CTA ——— */

export function FinalCTA(): ReactNode {
  const whatsappHref = buildWhatsAppUrl("join");
  return (
    <section
      aria-labelledby="final-cta"
      className="nest-dark-deep py-16 md:py-24"
    >
      <Container className="mx-auto max-w-3xl text-center">
        <p className="text-label font-bold tracking-[0.22em] text-accent uppercase">
          Better Space Bigger Dreams
        </p>
        <h2
          id="final-cta"
          className="section-title mt-3 font-extrabold text-white"
        >
          Ready to find your study space?
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/70">
          Explore the plans, or visit Nest and experience the environment
          yourself.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to={routePaths.membership}
            className="inline-flex min-h-[52px] items-center rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:opacity-90"
            onClick={() => {
              trackEvent("join_click", { surface: "final-cta" });
            }}
          >
            View Admission Plans
          </Link>
          <Link
            to={routePaths.bookVisit}
            className="inline-flex min-h-[52px] items-center gap-2 rounded-md border border-white/25 px-7 py-3.5 font-semibold text-white hover:bg-white/10"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
            Book a Visit
          </Link>
          <a
            href={whatsappHref}
            {...safeLinkProps(whatsappHref)}
            className="inline-flex min-h-[52px] items-center gap-2 rounded-md px-4 py-3.5 font-semibold text-white/85 hover:bg-white/10 hover:text-white"
            onClick={() => {
              trackEvent("whatsapp_click", {
                intent: "join",
                surface: "final-cta",
              });
            }}
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>
      </Container>
    </section>
  );
}
