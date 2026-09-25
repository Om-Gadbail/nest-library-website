/**
 * Nest Library — About page.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "../components/common/Seo.tsx";
import { Container } from "../components/ui/Container.tsx";
import { Section } from "../components/ui/Section.tsx";
import { PageHero } from "../components/ui/PageHero.tsx";
import { WhyNest } from "../components/sections/HomeSectionsA.tsx";
import { FinalCTA } from "../components/sections/HomeSectionsC.tsx";
import { PageTransition, FadeIn } from "../components/motion/Motion.tsx";
import { routePaths } from "../config/navigation.ts";
import { organizationJsonLd } from "../lib/seo.ts";

export function AboutPage(): ReactNode {
  return (
    <PageTransition>
      <Seo
        title="About Nest Library"
        description="About Nest Library — a self study center and co-working study space in New Narsala, Nagpur. Better Space Bigger Dreams."
        jsonLd={[organizationJsonLd()]}
      />
      <PageHero
        eyebrow="About Nest"
        title="A study space built around consistency"
        description="Nest Library is a self study center and co-working study space in New Narsala, Nagpur — designed for students and working learners who take their preparation seriously."
        crumbs={[{ label: "About" }]}
      />
      <Section labelledBy="nest-story">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn>
            <h2 id="nest-story" className="subsection-title font-extrabold">
              Why does this place exist?
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-muted">
              <p>
                Studying at home comes with distractions. Cafes are noisy and
                unpredictable. Nest exists to remove that friction — a calm,
                dedicated environment where showing up daily feels natural.
              </p>
              <p>
                With dedicated Regular and Confirmed seating, air cooling, Wi-Fi
                and a convenient setup, Nest supports the unglamorous truth of
                exam success: consistent hours, repeated over months.
              </p>
              <p className="font-semibold text-foreground">
                Better Space Bigger Dreams — Your Study Space, Our Priority.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="rounded-xl border border-border bg-card p-7 shadow-card">
              <h3 className="font-extrabold">Nest at a glance</h3>
              <dl className="mt-4 space-y-3 text-small">
                <div className="flex justify-between gap-4 border-b border-border pb-3">
                  <dt className="text-muted">What</dt>
                  <dd className="text-right font-semibold">
                    Self Study Center · Co-Working Space
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-3">
                  <dt className="text-muted">Where</dt>
                  <dd className="text-right font-semibold">
                    2nd Floor, New Narsala, Nagpur
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-3">
                  <dt className="text-muted">Seats</dt>
                  <dd className="text-right font-semibold">
                    Regular · Confirmed (priority selection)
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Contact</dt>
                  <dd className="text-right font-semibold">+91 70382 01884</dd>
                </div>
              </dl>
              <Link
                to={routePaths.bookVisit}
                className="mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
              >
                Experience it yourself{" "}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>
      <WhyNest />
      <Container className="pb-16 md:pb-24">
        <div className="rounded-xl border border-border bg-card p-6 text-center shadow-subtle md:p-8">
          <p className="text-small text-muted">Same building as</p>
          <p className="mt-1 font-extrabold">Study hard. Train smart.</p>
          <p className="mx-auto mt-2 max-w-md text-small text-muted">
            Prime Fitness operates in the same building — a subtle cross-note
            for members who want both focus and fitness. Nest remains its own
            brand.
          </p>
        </div>
      </Container>
      <FinalCTA />
    </PageTransition>
  );
}
