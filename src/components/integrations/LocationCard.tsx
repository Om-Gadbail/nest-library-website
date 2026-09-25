/**
 * Nest Library — address + hours + actions card.
 * Honest states: map/directions render only when configured;
 * hours show the owner-editable placeholder line otherwise.
 */

import type { ReactNode } from "react";
import { Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "../ui/Card.tsx";
import { GetDirectionsButton } from "./GetDirectionsButton.tsx";
import { GoogleMap } from "./GoogleMap.tsx";
import { contactConfig } from "../../config/contact.ts";
import { businessConfig } from "../../config/business.ts";
import { env } from "../../lib/env.ts";

interface LocationCardProps {
  className?: string;
  showMap?: boolean;
}

export function LocationCard({
  className,
  showMap = false,
}: LocationCardProps): ReactNode {
  // Mirrors GetDirectionsButton's config check so no empty action
  // wrapper renders while directions are unconfigured.
  const hasDirections = Boolean(
    env.googleDirectionsUrl ?? contactConfig.directionsUrl,
  );
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
            <p className="mt-1 text-muted">
              <strong className="font-semibold text-foreground">
                {contactConfig.addressParts.floor}
              </strong>
              <br />
              {contactConfig.addressParts.area},{" "}
              {contactConfig.addressParts.city}
              <br />
              {contactConfig.addressParts.state},{" "}
              {contactConfig.addressParts.country}
            </p>
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
            {businessConfig.openingHours.isPlaceholder && (
              <p className="mt-1 text-small text-muted">
                Call or WhatsApp Nest for current timings.
              </p>
            )}
          </div>
        </div>
        {showMap && <GoogleMap />}
        {hasDirections && (
          <div className="flex flex-wrap gap-2">
            <GetDirectionsButton />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
