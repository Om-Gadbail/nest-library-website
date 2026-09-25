import type { ReactNode } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/Card.tsx";
import { Badge } from "../ui/Badge.tsx";
import type { Testimonial } from "../../types/content.ts";

/**
 * Testimonial card. Rating renders only when a verified rating exists;
 * placeholder entries show a "Placeholder" badge and never fake stars.
 */
export function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}): ReactNode {
  const ratingLabel =
    testimonial.rating === null
      ? null
      : `Rated ${String(testimonial.rating)} out of 5`;

  return (
    <Card>
      <CardContent className="space-y-3">
        {testimonial.rating !== null && (
          <div
            role="img"
            aria-label={ratingLabel ?? undefined}
            className="flex gap-1"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                className={
                  index < (testimonial.rating ?? 0)
                    ? "h-4 w-4 fill-accent text-accent"
                    : "h-4 w-4 text-border"
                }
              />
            ))}
          </div>
        )}
        <blockquote className="text-body">“{testimonial.quote}”</blockquote>
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-small text-muted">{testimonial.role}</p>
        </div>
        {testimonial.isPlaceholder && <Badge>Placeholder</Badge>}
      </CardContent>
    </Card>
  );
}
