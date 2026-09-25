/**
 * Nest Library — homepage sections batch 1:
 * TrustStrip, WhyNest, StudyEnvironment, WhoItsFor, FacilitiesSection.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Crosshair,
  Armchair,
  Wifi,
  BookOpen,
  Target,
  Landmark,
  GraduationCap,
  Briefcase,
  Laptop,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { routePaths } from "../../config/navigation.ts";
import { facilities } from "../../data/facilities.ts";
import { audienceGroups, whyNestPoints } from "../../data/audience.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { Container } from "../ui/Container.tsx";
import { Section } from "../ui/Section.tsx";
import { FacilityCard } from "../business/FacilityCard.tsx";
import { SectionHeading } from "./SectionHeading.tsx";
import { FadeIn, Stagger, StaggerItem } from "../motion/Motion.tsx";

export function TrustStrip(): ReactNode {
  return (
    <div className="border-b border-border bg-card">
      <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-small font-semibold text-muted md:justify-between">
        {facilities.map((facility) => (
          <span key={facility.id} className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-primary"
            />
            {facility.title}
          </span>
        ))}
        <Link
          to={routePaths.facilities}
          className="inline-flex items-center gap-1 text-foreground hover:underline hover:underline-offset-4"
        >
          All facilities{" "}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </Container>
    </div>
  );
}

const WHY_ICONS: Record<string, LucideIcon> = {
  crosshair: Crosshair,
  armchair: Armchair,
  wifi: Wifi,
};

export function WhyNest(): ReactNode {
  return (
    <Section labelledBy="why-nest">
      <SectionHeading
        eyebrow="Why Nest"
        title="A focused space designed around your study goals"
        description="Nest exists for one reason: to give serious learners in Nagpur a calm, consistent place to study — every day."
      />
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {whyNestPoints.map((point) => {
          const Icon = WHY_ICONS[point.icon] ?? BookOpen;
          return (
            <StaggerItem key={point.id}>
              <article className="h-full rounded-lg border border-border bg-card p-6 shadow-subtle">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-navy text-white">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold">{point.title}</h3>
                <p className="mt-2 text-small leading-relaxed text-muted">
                  {point.description}
                </p>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

const ENVIRONMENT_ROWS = [
  {
    id: "focus",
    eyebrow: "Study Environment",
    title: "Study with focus. Study with consistency.",
    text: "Walk in, take your seat, and start. Nest is arranged around quiet, repeatable study — the same desk, the same calm, every session.",
    points: [
      "Dedicated seating",
      "Calm, academic atmosphere",
      "Designed for long sessions",
    ],
    cta: { label: "Explore the Environment", to: routePaths.environment },
  },
  {
    id: "comfort",
    eyebrow: "Comfort & Setup",
    title: "Comfort that lasts the whole syllabus",
    text: "Air cooling, Wi-Fi and a convenient setup mean fewer reasons to break focus — and more hours that actually count.",
    points: ["Air cooling", "Wi-Fi connectivity", "Convenience space"],
    cta: { label: "See Facilities", to: routePaths.facilities },
  },
];

export function StudyEnvironment(): ReactNode {
  return (
    <section
      aria-labelledby="study-environment"
      className="bg-muted-background/60 py-16 md:py-24"
    >
      <Container className="space-y-14 md:space-y-20">
        <SectionHeading
          eyebrow="Study Environment"
          title="Your Study Space, Our Priority"
          description="Imagine your toughest study weeks — with a place that makes them easier to show up for."
        />
        {ENVIRONMENT_ROWS.map((row, index) => (
          <div
            key={row.id}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
          >
            <FadeIn className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-navy shadow-card">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-navy-soft via-navy to-navy-deep">
                  <div
                    aria-hidden="true"
                    className="nest-hero-grid absolute inset-0 opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <p className="text-label font-bold tracking-[0.22em] text-accent uppercase">
                      {row.eyebrow}
                    </p>
                    <p className="mt-2 max-w-sm text-h3 font-extrabold text-white">
                      {row.title}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn
              delay={0.08}
              className={index % 2 === 1 ? "lg:order-1" : undefined}
            >
              <p className="text-label font-bold tracking-[0.2em] text-primary uppercase">
                {row.eyebrow}
              </p>
              <h3
                id={index === 0 ? "study-environment" : undefined}
                className="subsection-title mt-2 font-extrabold"
              >
                {row.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{row.text}</p>
              <ul className="mt-4 space-y-2">
                {row.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-small font-medium"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-leaf"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                to={row.cta.to}
                className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-foreground hover:underline hover:underline-offset-4"
                onClick={() => {
                  trackEvent("cta_click", { label: row.cta.label });
                }}
              >
                {row.cta.label}{" "}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </FadeIn>
          </div>
        ))}
      </Container>
    </section>
  );
}

const AUDIENCE_ICONS: Record<string, LucideIcon> = {
  target: Target,
  landmark: Landmark,
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  briefcase: Briefcase,
  laptop: Laptop,
};

export function WhoItsFor(): ReactNode {
  return (
    <Section labelledBy="who-nest-for">
      <SectionHeading
        eyebrow="Who Nest Is For"
        title="Made for someone like you"
        description="If your day revolves around studying — Nest is built for your routine."
      />
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {audienceGroups.map((group) => {
          const Icon = AUDIENCE_ICONS[group.icon] ?? BookOpen;
          return (
            <StaggerItem key={group.id}>
              <article className="h-full rounded-lg border border-border bg-card p-6 shadow-subtle">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-gold-soft text-accent-foreground">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold">{group.title}</h3>
                <p className="mt-1.5 text-small leading-relaxed text-muted">
                  {group.description}
                </p>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

export function FacilitiesSection({
  preview = false,
}: {
  preview?: boolean;
}): ReactNode {
  return (
    <Section labelledBy="facilities" compact={preview}>
      <SectionHeading
        eyebrow="Facilities"
        title="Everything you need to stay focused"
        description="Confirmed facilities at Nest — nothing listed here is guesswork."
      />
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facilities.map((facility) => (
          <StaggerItem key={facility.id}>
            <FacilityCard facility={facility} />
          </StaggerItem>
        ))}
      </Stagger>
      {preview && (
        <FadeIn className="mt-8 text-center">
          <Link
            to={routePaths.facilities}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-md border border-border bg-card px-6 py-3 font-semibold hover:bg-muted-background"
          >
            View all facilities{" "}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </FadeIn>
      )}
    </Section>
  );
}
