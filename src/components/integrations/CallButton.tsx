import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { Button } from "../ui/Button.tsx";
import { contactConfig } from "../../config/contact.ts";
import { env } from "../../lib/env.ts";
import { trackEvent } from "../../lib/analytics.ts";

interface CallButtonProps {
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/** `tel:` call button. Number comes from env (fallback: central config). */
export function CallButton({
  label,
  variant = "outline",
  size = "md",
  className,
}: CallButtonProps): ReactNode {
  const display = env.phoneNumber ?? contactConfig.phone.value;
  const href = env.phoneNumber
    ? `tel:${env.phoneNumber.replace(/\s/g, "")}`
    : contactConfig.phone.href;

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        trackEvent("call_click");
      }}
    >
      <Phone aria-hidden="true" className="h-4 w-4" />
      {label ?? `Call ${display}`}
    </Button>
  );
}
