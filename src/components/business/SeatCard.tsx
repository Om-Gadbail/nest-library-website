import type { ReactNode } from "react";
import { Card, CardContent, CardFooter } from "../ui/Card.tsx";
import { Badge } from "../ui/Badge.tsx";
import { Button } from "../ui/Button.tsx";
import { routePaths } from "../../config/navigation.ts";
import type { SeatOption } from "../../types/content.ts";

/** Seat option card — price/availability are nullable, never fabricated. */
export function SeatCard({ seat }: { seat: SeatOption }): ReactNode {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold">{seat.name}</h3>
          {seat.isPlaceholder && <Badge>Placeholder</Badge>}
        </div>
        <p className="text-small text-muted">{seat.description}</p>
        <p className="text-small font-semibold">{seat.priceLabel}</p>
        <ul className="space-y-1 text-small text-muted">
          {seat.features.map((feature) => (
            <li key={feature}>· {feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button to={routePaths.seatInquiry} variant="outline" size="sm">
          {seat.ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
