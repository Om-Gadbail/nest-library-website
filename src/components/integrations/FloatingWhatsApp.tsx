import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, type WhatsAppIntent } from "../../lib/whatsapp.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";
import { cn } from "../../lib/cn.ts";

interface FloatingWhatsAppProps {
  intent?: WhatsAppIntent;
  label?: string;
  className?: string;
}

/**
 * Floating WhatsApp action (rendered once in the layout, bottom-right).
 * 56px touch target; hidden from print. Not rendered on this foundation
 * shell yet — mount it in RootLayout during the UI build.
 */
export function FloatingWhatsApp({
  intent = "general",
  label = "Chat with Nest Library on WhatsApp",
  className,
}: FloatingWhatsAppProps): ReactNode {
  const href = buildWhatsAppUrl(intent);

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      onClick={() => {
        trackEvent("whatsapp_click", { intent, surface: "floating" });
      }}
      {...safeLinkProps(href)}
      className={cn(
        "fixed right-4 bottom-4 z-50 inline-flex h-14 w-14 items-center justify-center",
        "rounded-full bg-primary text-primary-foreground shadow-raised",
        "transition-opacity hover:opacity-90 print:hidden",
        "md:right-6 md:bottom-6",
        className,
      )}
    >
      <MessageCircle aria-hidden="true" className="h-6 w-6" />
    </a>
  );
}
