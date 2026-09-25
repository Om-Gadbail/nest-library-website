/**
 * Nest Library — Gallery, Member Stories, Reviews pages.
 * Honest empty states: no fake photos, stories or ratings.
 */

import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Images, Quote } from "lucide-react";
import { Seo } from "../components/common/Seo.tsx";
import { Section } from "../components/ui/Section.tsx";
import { Container } from "../components/ui/Container.tsx";
import { PageHero } from "../components/ui/PageHero.tsx";
import { Gallery } from "../components/gallery/Gallery.tsx";
import { FinalCTA } from "../components/sections/HomeSectionsC.tsx";
import { PageTransition, FadeIn } from "../components/motion/Motion.tsx";
import { routePaths } from "../config/navigation.ts";
import { galleryCategories, galleryImages } from "../data/gallery.ts";
import { memberStories, testimonials } from "../data/testimonials.ts";
import { cn } from "../lib/cn.ts";

export function GalleryPage(): ReactNode {
  const [category, setCategory] = useState<string>("all");
  const filtered =
    category === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.category === category);

  return (
    <PageTransition>
      <Seo
        title="Gallery — Inside Nest Library"
        description="Photos of the Nest Library study space, seating and facilities in New Narsala, Nagpur. Real photography coming soon."
      />
      <PageHero
        eyebrow="Gallery"
        title="Inside Nest"
        description="Real Nest photography will live here — study space, seats, facilities and interiors."
        crumbs={[{ label: "Gallery" }]}
      />
      {galleryImages.length === 0 ? (
        <Section labelledBy="gallery-empty">
          <div className="mx-auto max-w-2xl text-center">
            <Images
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-muted"
            />
            <h2
              id="gallery-empty"
              className="subsection-title mt-4 font-extrabold"
            >
              Photography coming soon
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
              We are photographing the real space — entrance, study hall, desks
              and seating. Until then, the honest move is a visit, not stock
              photos.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to={routePaths.bookVisit}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:opacity-90"
              >
                Book a Visit{" "}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Section>
      ) : (
        <Section labelledBy="gallery-grid">
          <div
            className="flex flex-wrap justify-center gap-2"
            role="group"
            aria-label="Filter photos by category"
          >
            {galleryCategories.map((option) => (
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
          <div className="mt-8">
            <Gallery images={filtered} />
          </div>
        </Section>
      )}
      <FinalCTA />
    </PageTransition>
  );
}

export function MemberStoriesPage(): ReactNode {
  return (
    <PageTransition>
      <Seo
        title="Member Stories"
        description="Member stories from Nest Library — real study journeys will be published here with permission."
      />
      <PageHero
        eyebrow="Member Stories"
        title="Journeys built on consistency"
        description="Long-form member experiences will live here — published only with permission and factual claims."
        crumbs={[{ label: "Member Stories" }]}
      />
      <Section labelledBy="stories-empty">
        {memberStories.length === 0 ? (
          <div className="mx-auto max-w-2xl text-center">
            <Quote
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-muted"
            />
            <h2
              id="stories-empty"
              className="subsection-title mt-4 font-extrabold"
            >
              First stories are being written
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
              Nest is newly opening. As members build routines here, their
              stories — goals, time at Nest, experience — will appear in this
              space.
            </p>
            <Link
              to={routePaths.join}
              className="mt-6 inline-flex min-h-[52px] items-center gap-2 rounded-md bg-navy px-7 py-3.5 font-semibold text-white hover:bg-navy-soft"
            >
              Start Yours — Join Nest{" "}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}

export function ReviewsPage(): ReactNode {
  return (
    <PageTransition>
      <Seo
        title="Reviews"
        description="Genuine Nest Library member reviews. Real feedback will be published here once collected."
      />
      <PageHero
        eyebrow="Reviews"
        title="What members say"
        description="Only genuine reviews — no fabricated names, ratings or achievements."
        crumbs={[{ label: "Reviews" }]}
      />
      <Section labelledBy="reviews-list">
        {testimonials.length === 0 ? (
          <div className="mx-auto max-w-2xl text-center">
            <Camera
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-muted"
            />
            <h2
              id="reviews-list"
              className="subsection-title mt-4 font-extrabold"
            >
              No reviews yet — and that is honest
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
              Rather than inventing testimonials, this page waits for real
              member feedback. After your first month at Nest, tell us how the
              space worked for you.
            </p>
            <Container className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to={routePaths.bookVisit}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:opacity-90"
              >
                Visit First{" "}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Container>
          </div>
        ) : (
          <FadeIn className="grid gap-4 md:grid-cols-2">
            {testimonials.map((review) => (
              <figure
                key={review.id}
                className="rounded-xl border border-border bg-card p-7 shadow-card"
              >
                <blockquote className="leading-relaxed">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-4 font-bold">
                  {review.name}
                </figcaption>
              </figure>
            ))}
          </FadeIn>
        )}
      </Section>
      <FinalCTA />
    </PageTransition>
  );
}
