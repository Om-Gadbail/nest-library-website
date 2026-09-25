import type { ReactNode } from "react";
import { Container } from "../ui/Container.tsx";
import { Badge } from "../ui/Badge.tsx";

interface PlaceholderSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

/**
 * Generic content-section scaffold for future page sections.
 * Not a final design — establishes heading hierarchy + spacing only.
 */
export function PlaceholderSection({
  eyebrow,
  title,
  description,
  children,
}: PlaceholderSectionProps): ReactNode {
  const headingId = `section-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section aria-labelledby={headingId} className="py-16 md:py-24">
      <Container>
        {eyebrow && (
          <Badge tone="neutral" className="mb-4">
            {eyebrow}
          </Badge>
        )}
        <h2 id={headingId} className="max-w-2xl text-h2 font-bold">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-muted">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
