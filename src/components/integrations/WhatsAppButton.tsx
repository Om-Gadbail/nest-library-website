import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "../ui/Button.tsx";
import { buildWhatsAppUrl, type WhatsAppIntent } from "../../lib/whatsapp.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";

interface WhatsAppButtonProps {
  intent?: WhatsAppIntent;
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * WhatsApp deep-link button. Number + template come from central config;
 * while unconfigured the link falls back to `#contact-fallback`.
 */
export function WhatsAppButton({
  intent = "general",
  label = "Chat on WhatsApp",
  variant = "primary",
  size = "md",
  className,
}: WhatsAppButtonProps): ReactNode {
  const href = buildWhatsAppUrl(intent);
  const external = safeLinkProps(href);

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        trackEvent("whatsapp_click", { intent });
      }}
      {...external}
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4" />
      {label}
    </Button>
  );
}
