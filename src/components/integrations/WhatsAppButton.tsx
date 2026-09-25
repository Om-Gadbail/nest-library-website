import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "../ui/Button.tsx";
import { buildWhatsAppUrl, type WhatsAppIntent } from "../../lib/whatsapp.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";

interface WhatsAppButtonProps {
  intent?: WhatsAppIntent;
  detail?: string;
  label?: string;
  surface?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * WhatsApp deep-link button with contextual pre-filled message.
 * Number + templates come from central config.
 */
export function WhatsAppButton({
  intent = "general",
  detail,
  label = "Chat on WhatsApp",
  surface = "page",
  variant = "primary",
  size = "md",
  className,
}: WhatsAppButtonProps): ReactNode {
  const href = buildWhatsAppUrl(intent, detail);
  const external = safeLinkProps(href);

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        trackEvent("whatsapp_click", { intent, surface });
      }}
      {...external}
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4" />
      {label}
    </Button>
  );
}
