import type { ReactNode } from "react";
import { Card, CardContent } from "../ui/Card.tsx";
import {
  CallButton,
  EmailButton,
  WhatsAppButton,
} from "../integrations/index.ts";

interface ContactCardProps {
  title?: string;
  description?: string;
  className?: string;
}

/** Contact options card — all channels from central config, no hardcoding. */
export function ContactCard({
  title = "Talk to us",
  description = "Reach out on whichever channel suits you.",
  className,
}: ContactCardProps): ReactNode {
  return (
    <Card className={className}>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-small text-muted">{description}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <WhatsAppButton intent="general" />
          <CallButton />
          <EmailButton />
        </div>
      </CardContent>
    </Card>
  );
}
