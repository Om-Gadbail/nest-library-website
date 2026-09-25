import type { ReactNode } from "react";
import { contactConfig } from "../../config/contact.ts";
import { env } from "../../lib/env.ts";
import { cn } from "../../lib/cn.ts";

interface GoogleMapProps {
  title?: string;
  className?: string;
}

/**
 * Google Maps embed (integration-ready, no API key needed).
 * Uses the `mapsEmbedUrl` / `VITE_GOOGLE_MAPS_URL` embed URL when configured;
 * otherwise renders a clearly-labelled placeholder frame so no fake map or
 * fake location is ever presented.
 */
export function GoogleMap({
  title = "Nest Library location map",
  className,
}: GoogleMapProps): ReactNode {
  const embedUrl = env.googleMapsUrl ?? contactConfig.mapsEmbedUrl;

  if (!embedUrl) {
    return (
      <div
        role="img"
        aria-label="Map placeholder — verified location will be shown here"
        className={cn(
          "flex aspect-video w-full items-center justify-center rounded-lg",
          "border border-border bg-muted-background text-center text-muted",
          className,
        )}
      >
        <p className="max-w-sm px-6 text-small">
          Map placeholder — the verified Nest Library location will be embedded
          here once the address is confirmed.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "aspect-video w-full overflow-hidden rounded-lg border border-border",
        className,
      )}
    >
      <iframe
        title={title}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}
