import type { ReactNode } from "react";
import { Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "../ui/Card.tsx";
import { GetDirectionsButton } from "./GetDirectionsButton.tsx";
import { contactConfig } from "../../config/contact.ts";
import { businessConfig } from "../../config/business.ts";

interface LocationCardProps {
  className?: string;
}

/** Address + hours + directions entry point for location/contact pages. */
export function LocationCard({ className }: LocationCardProps): ReactNode {
  return (
    <Card className={className}>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin
            aria-hidden="true"
            className="mt-1 h-5 w-5 shrink-0 text-primary"
          />
          <div>
            <h3 className="font-semibold">Find us</h3>
            <p className="mt-1 text-muted">{contactConfig.address.value}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock
            aria-hidden="true"
            className="mt-1 h-5 w-5 shrink-0 text-primary"
          />
          <div>
            <h3 className="font-semibold">Opening hours</h3>
            <p className="mt-1 text-muted">
              {businessConfig.openingHours.days} ·{" "}
              {businessConfig.openingHours.hours}
            </p>
          </div>
        </div>
        <GetDirectionsButton />
      </CardContent>
    </Card>
  );
}
