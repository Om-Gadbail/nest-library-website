/**
 * Shared inner-page hero (navy editorial band + breadcrumbs).
 */

import type { ReactNode } from "react";
import { Container } from "./Container.tsx";
import { Breadcrumbs, type Crumb } from "../common/Breadcrumbs.tsx";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
}

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: PageHeroProps): ReactNode {
  return (
    <div className="nest-dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="nest-hero-grid absolute inset-0 opacity-60"
      />
      <Container className="relative pt-2 pb-12 md:pb-16">
        <Breadcrumbs items={crumbs} />
        <p className="text-label font-bold tracking-[0.22em] text-accent uppercase">
          {eyebrow}
        </p>
        <h1 className="section-title mt-2 max-w-3xl font-extrabold text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl leading-relaxed text-white/70">
            {description}
          </p>
        )}
      </Container>
    </div>
  );
}
