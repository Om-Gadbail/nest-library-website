import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

interface SpinnerProps {
  /** Accessible label announced to screen readers. */
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
} as const;

/**
 * Loading spinner primitive. `role="status"` announces it politely;
 * CSS-only animation keeps it cheap on mobile.
 */
export function Spinner({
  label = "Loading…",
  size = "md",
  className,
}: SpinnerProps): ReactNode {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "animate-spin rounded-full border-border border-t-primary",
          sizeStyles[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
