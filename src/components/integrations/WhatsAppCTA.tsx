import type { ReactNode } from "react";
import { Card, CardContent } from "../ui/Card.tsx";
import { WhatsAppButton } from "./WhatsAppButton.tsx";
import type { WhatsAppIntent } from "../../lib/whatsapp.ts";

interface WhatsAppCTAProps {
  title?: string;
  description?: string;
  intent?: WhatsAppIntent;
  buttonLabel?: string;
  className?: string;
}

/** Card-style conversion block for section footers and contact pages. */
export function WhatsAppCTA({
  title = "Have a question? Message us",
  description = "Send a WhatsApp message and we'll help you pick the right seat or plan.",
  intent = "general",
  buttonLabel = "Chat on WhatsApp",
  className,
}: WhatsAppCTAProps): ReactNode {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-h3 font-semibold">{title}</h3>
          <p className="mt-1 text-muted">{description}</p>
        </div>
        <WhatsAppButton intent={intent} label={buttonLabel} />
      </CardContent>
    </Card>
  );
}
