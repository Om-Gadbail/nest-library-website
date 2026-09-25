import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, type WhatsAppIntent } from "../../lib/whatsapp.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";
import { cn } from "../../lib/cn.ts";

interface FloatingWhatsAppProps {
  intent?: WhatsAppIntent;
  detail?: string;
  label?: string;
  className?: string;
}

/**
 * Floating WhatsApp action (once per layout, bottom-right).
 * Lifts above the mobile action bar on small screens.
 */
export function FloatingWhatsApp({
  intent = "general",
  detail,
  label = "Chat with Nest Library on WhatsApp",
  className,
}: FloatingWhatsAppProps): ReactNode {
  const href = buildWhatsAppUrl(intent, detail);

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
        "fixed right-4 bottom-24 z-40 inline-flex h-14 w-14 items-center justify-center",
        "rounded-full bg-[#25D366] text-white shadow-raised",
        "transition-opacity hover:opacity-90 print:hidden",
        "md:right-6 md:bottom-6",
        className,
      )}
    >
      <MessageCircle aria-hidden="true" className="h-6 w-6" />
    </a>
  );
}
