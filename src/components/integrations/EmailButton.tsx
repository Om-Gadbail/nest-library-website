import type { ReactNode } from "react";
import { Mail } from "lucide-react";
import { Button } from "../ui/Button.tsx";
import { contactConfig } from "../../config/contact.ts";
import { env } from "../../lib/env.ts";
import { trackEvent } from "../../lib/analytics.ts";

interface EmailButtonProps {
  label?: string;
  subject?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/** `mailto:` email button. Address comes from env (fallback: central config). */
export function EmailButton({
  label,
  subject,
  variant = "outline",
  size = "md",
  className,
}: EmailButtonProps): ReactNode {
  const address = env.email ?? contactConfig.email.value;
  // No verified Nest email yet → hide the CTA entirely (Point 19:
  // never invent or display a guessed address).
  if (!address || contactConfig.email.isPlaceholder) return null;
  const href = subject
    ? `mailto:${address}?subject=${encodeURIComponent(subject)}`
    : `mailto:${address}`;

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        trackEvent("email_click");
      }}
    >
      <Mail aria-hidden="true" className="h-4 w-4" />
      {label ?? address}
    </Button>
  );
}
