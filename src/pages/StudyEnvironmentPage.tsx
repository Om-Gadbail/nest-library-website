/**
 * Nest Library — Study Environment page.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "../components/common/Seo.tsx";
import { Container } from "../components/ui/Container.tsx";
import { Section } from "../components/ui/Section.tsx";
import { PageHero } from "../components/ui/PageHero.tsx";
import { FinalCTA } from "../components/sections/HomeSectionsC.tsx";
import {
  PageTransition,
  FadeIn,
  Stagger,
  StaggerItem,
} from "../components/motion/Motion.tsx";
import { routePaths } from "../config/navigation.ts";

const MOMENTS = [
  {
    title: "Arrive to calm",
    text: "A quiet room, your seat waiting, no negotiation with noise or family interruptions.",
  },
  {
    title: "Settle into deep work",
    text: "Long, comfortable sessions supported by air cooling and a study-first setup.",
  },
  {
    title: "Stay connected",
    text: "Wi-Fi for resources, mocks and online learning — without leaving your desk.",
  },
  {
    title: "Repeat daily",
    text: "The same environment every day turns motivation into routine — the real exam edge.",
  },
];

export function StudyEnvironmentPage(): ReactNode {
  return (
    <PageTransition>
      <Seo
        title="Study Environment"
        description="Inside the Nest Library study environment — focused seating, calm atmosphere and a setup designed for consistent daily study in Nagpur."
      />
      <PageHero
        eyebrow="Study Environment"
        title="Your Study Space, Our Priority"
        description="What a focused day at Nest feels like — atmosphere, rhythm and the details that protect your attention."
        crumbs={[{ label: "Study Environment" }]}
      />
      <Section labelledBy="a-day-at-nest">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="a-day-at-nest" className="section-title font-extrabold">
            A day at Nest
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            Real photography will illustrate each moment below once available.
            The descriptions reflect the confirmed setup — nothing embellished.
          </p>
        </div>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2">
          {MOMENTS.map((moment, index) => (
            <StaggerItem key={moment.title}>
              <article className="h-full overflow-hidden rounded-xl border border-border bg-card shadow-card">
                <div className="nest-dark relative aspect-[16/8]">
                  <div
                    aria-hidden="true"
                    className="nest-hero-grid absolute inset-0 opacity-60"
                  />
                  <p className="absolute bottom-3 left-5 text-label font-bold tracking-[0.2em] text-accent uppercase">
                    Moment {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold">{moment.title}</h3>
                  <p className="mt-2 text-small leading-relaxed text-muted">
                    {moment.text}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn className="mt-8 text-center">
          <Link
            to={routePaths.bookVisit}
            className="inline-flex min-h-[52px] items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:opacity-90"
          >
            Come see it in person{" "}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </FadeIn>
      </Section>
      <Container className="pb-16 md:pb-24">
        <div className="rounded-xl bg-gold-soft p-6 text-center md:p-8">
          <p className="font-extrabold">Photography note</p>
          <p className="mx-auto mt-2 max-w-xl text-small leading-relaxed text-muted">
            This page intentionally uses branded panels instead of stock photos.
            Genuine Nest photographs (entrance, study hall, desks, seating) will
            replace them — staged stock will never pretend to be Nest.
          </p>
        </div>
      </Container>
      <FinalCTA />
    </PageTransition>
  );
}
