import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Section } from "../ui/Section.tsx";
import { Button } from "../ui/Button.tsx";
import { trackEvent } from "../../lib/analytics.ts";

interface CTASectionProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  className?: string;
}

/** Reusable call-to-action band (dark premium) for section closers. */
export function CTASection({
  title,
  description,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
  className,
}: CTASectionProps): ReactNode {
  return (
    <Section className={className}>
      <div className="nest-dark relative overflow-hidden rounded-2xl px-6 py-12 text-center md:py-16">
        <div
          aria-hidden="true"
          className="nest-hero-grid absolute inset-0 opacity-50"
        />
        <div className="relative">
          <h2 className="section-title font-extrabold text-white">{title}</h2>
          {description && (
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/70">
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              to={primaryTo}
              size="lg"
              onClick={() => {
                trackEvent("cta_click", { label: primaryLabel });
              }}
            >
              {primaryLabel}
            </Button>
            {secondaryLabel &&
              secondaryTo &&
              (secondaryTo.startsWith("http") ||
              secondaryTo.startsWith("https://wa.me") ? (
                <Button
                  href={secondaryTo}
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-transparent text-white hover:bg-white/10"
                  onClick={() => {
                    trackEvent("cta_click", { label: secondaryLabel });
                  }}
                >
                  {secondaryLabel}
                </Button>
              ) : (
                <Link
                  to={secondaryTo}
                  className="inline-flex min-h-[52px] items-center rounded-md border border-white/25 px-7 py-3.5 font-semibold text-white hover:bg-white/10"
                  onClick={() => {
                    trackEvent("cta_click", { label: secondaryLabel });
                  }}
                >
                  {secondaryLabel}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
