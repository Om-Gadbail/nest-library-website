/**
 * Nest Library — Facilities page.
 */

import type { ReactNode } from "react";
import { Seo } from "../components/common/Seo.tsx";
import { Section } from "../components/ui/Section.tsx";
import { PageHero } from "../components/ui/PageHero.tsx";
import { FacilityCard } from "../components/business/FacilityCard.tsx";
import { AvailabilityNote } from "../components/sections/HomeSectionsB.tsx";
import { FinalCTA } from "../components/sections/HomeSectionsC.tsx";
import { SectionHeading } from "../components/sections/SectionHeading.tsx";
import {
  PageTransition,
  Stagger,
  StaggerItem,
  FadeIn,
} from "../components/motion/Motion.tsx";
import { facilities } from "../data/facilities.ts";
import { Container } from "../components/ui/Container.tsx";

export function FacilitiesPage(): ReactNode {
  return (
    <PageTransition>
      <Seo
        title="Facilities"
        description="Confirmed Nest Library facilities: air cooling, Wi-Fi, unisex space and convenience space in New Narsala, Nagpur."
      />
      <PageHero
        eyebrow="Facilities"
        title="Everything you need to stay focused"
        description="Only confirmed facilities are listed. New amenities will be added here once verified — never before."
        crumbs={[{ label: "Facilities" }]}
      />
      <Section labelledBy="confirmed-facilities">
        <SectionHeading eyebrow="Confirmed" title="What Nest offers today" />
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility) => (
            <StaggerItem key={facility.id}>
              <FacilityCard facility={facility} />
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn className="mx-auto mt-10 max-w-2xl">
          <AvailabilityNote />
        </FadeIn>
      </Section>
      <Container className="pb-16 md:pb-24">
        <div className="rounded-xl border border-border bg-card p-6 text-center shadow-subtle md:p-8">
          <h2 className="font-extrabold">More facilities on the way?</h2>
          <p className="mx-auto mt-2 max-w-xl text-small leading-relaxed text-muted">
            Charging points, lockers, drinking water, washrooms, parking, CCTV
            and power backup are common requests — they will be published here
            only after the Nest team confirms them. Ask on WhatsApp for the
            latest.
          </p>
        </div>
      </Container>
      <FinalCTA />
    </PageTransition>
  );
}
