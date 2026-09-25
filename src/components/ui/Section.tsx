import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";
import { Container } from "./Container.tsx";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Associates the section with a heading id for screen readers. */
  labelledBy?: string;
  /** Tighter rhythm for stacked/secondary sections. */
  compact?: boolean;
}

/**
 * Generic page section wrapper: semantic <section> + vertical rhythm.
 */
export function Section({
  children,
  className,
  labelledBy,
  compact = false,
}: SectionProps): ReactNode {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn(compact ? "py-10 md:py-14" : "py-16 md:py-24", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
