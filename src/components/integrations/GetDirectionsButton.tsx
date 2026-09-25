/**
 * Nest Library — directions button.
 * Renders only when a real Google Directions URL is configured.
 * No dead buttons: returns null while unconfigured.
 */

import type { ReactNode } from "react";
import { MapPin } from "lucide-react";
import { Button } from "../ui/Button.tsx";
import { contactConfig } from "../../config/contact.ts";
import { env } from "../../lib/env.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";

interface GetDirectionsButtonProps {
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GetDirectionsButton({
  label = "Get Directions",
  variant = "primary",
  size = "md",
  className,
}: GetDirectionsButtonProps): ReactNode {
  const href = env.googleDirectionsUrl ?? contactConfig.directionsUrl;
  if (!href) return null;

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        trackEvent("directions_click");
      }}
      {...safeLinkProps(href)}
    >
      <MapPin aria-hidden="true" className="h-4 w-4" />
      {label}
    </Button>
  );
}
