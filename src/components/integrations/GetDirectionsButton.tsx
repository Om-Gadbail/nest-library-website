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

/**
 * Google Directions link button. No API key required — plain shareable URL.
 * Falls back to `#location` while the real URL is unconfigured.
 */
export function GetDirectionsButton({
  label = "Get directions",
  variant = "primary",
  size = "md",
  className,
}: GetDirectionsButtonProps): ReactNode {
  const href =
    env.googleDirectionsUrl ??
    (contactConfig.isPlaceholder ? "#location" : contactConfig.directionsUrl);

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
