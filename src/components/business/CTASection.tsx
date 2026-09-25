import type { ReactNode } from "react";
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

/** Reusable call-to-action band for page footers and section closers. */
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
      <div className="rounded-xl bg-primary px-6 py-12 text-center text-primary-foreground md:py-16">
        <h2 className="text-h2 font-bold">{title}</h2>
        {description && (
          <p className="mx-auto mt-3 max-w-xl opacity-90">{description}</p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            to={primaryTo}
            variant="secondary"
            size="lg"
            onClick={() => {
              trackEvent("cta_click", { label: primaryLabel });
            }}
          >
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryTo && (
            <Button
              href={secondaryTo}
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-white/10"
              onClick={() => {
                trackEvent("cta_click", { label: secondaryLabel });
              }}
            >
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
