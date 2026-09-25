import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

interface SkeletonProps {
  className?: string;
  /** Accessible label for meaningful loading regions. */
  label?: string;
}

/**
 * Content placeholder that reserves layout space (no layout shift).
 * Pulse is CSS-only and disabled under `prefers-reduced-motion` globally.
 */
export function Skeleton({ className, label }: SkeletonProps): ReactNode {
  return (
    <div
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "status" : undefined}
      className={cn(
        "animate-pulse rounded-md bg-muted-background",
        className ?? "h-4 w-full",
      )}
    />
  );
}

/** Card-shaped skeleton for grid loading states. */
export function SkeletonCard({ className }: { className?: string }): ReactNode {
  return (
    <div
      aria-hidden="true"
      className={cn("rounded-lg border border-border bg-card p-6", className)}
    >
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
      <Skeleton className="mt-6 h-10 w-1/3" />
    </div>
  );
}
