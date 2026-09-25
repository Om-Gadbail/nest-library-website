import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

type BadgeTone = "neutral" | "primary" | "success" | "warning";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const toneStyles: Record<BadgeTone, string> = {
  neutral: "bg-muted-background text-foreground",
  primary: "bg-primary text-primary-foreground",
  success: "bg-success text-white",
  warning: "bg-warning text-white",
};

/** Small status/label pill. Never the sole conveyor of meaning. */
export function Badge({
  children,
  tone = "neutral",
  className,
}: BadgeProps): ReactNode {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-label font-semibold tracking-wide uppercase",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
