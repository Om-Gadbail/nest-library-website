/**
 * Nest Library — homepage (conversion journey).
 * Announcement → Hero → Trust → Why → Environment → Audience →
 * Facilities → Seats → Pricing → Offer → How → Gallery →
 * Reviews → FAQ → Location → Final CTA.
 */

import type { ReactNode } from "react";
import { useEffect } from "react";
import { Seo } from "../components/common/Seo.tsx";
import { siteConfig } from "../config/site.ts";
import { trackEvent } from "../lib/analytics.ts";
import { organizationJsonLd, websiteJsonLd } from "../lib/seo.ts";
import { Hero } from "../components/sections/Hero.tsx";
import {
  TrustStrip,
  WhyNest,
  StudyEnvironment,
  WhoItsFor,
  FacilitiesSection,
} from "../components/sections/HomeSectionsA.tsx";
import {
  SeatOptions,
  PricingSection,
  OpeningOfferSection,
  HowItWorks,
} from "../components/sections/HomeSectionsB.tsx";
import {
  GalleryPreview,
  ReviewsSection,
  ReviewsEmptyNote,
  FaqPreview,
  LocationSection,
  FinalCTA,
} from "../components/sections/HomeSectionsC.tsx";
import { PageTransition } from "../components/motion/Motion.tsx";

export function HomePage(): ReactNode {
  useEffect(() => {
    trackEvent("page_view", { path: "/" });
  }, []);

  return (
    <PageTransition>
      <Seo
        title="Self Study Center & Co-Working Study Space in Nagpur"
        description={siteConfig.description}
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />
      <Hero />
      <TrustStrip />
      <WhyNest />
      <StudyEnvironment />
      <WhoItsFor />
      <FacilitiesSection preview />
      <SeatOptions />
      <PricingSection />
      <OpeningOfferSection />
      <HowItWorks />
      <GalleryPreview />
      <ReviewsSection />
      <ReviewsEmptyNote />
      <FaqPreview />
      <LocationSection />
      <FinalCTA />
    </PageTransition>
  );
}
