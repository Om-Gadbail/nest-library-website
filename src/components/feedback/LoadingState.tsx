import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";
import { Spinner } from "../ui/Spinner.tsx";
import { Skeleton } from "../ui/Skeleton.tsx";

/** Full-region loading state: spinner + polite announcement. */
export function LoadingState({
  label = "Loading…",
  className,
}: {
  label?: string;
  className?: string;
}): ReactNode {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        className,
      )}
    >
      <Spinner label={label} size="lg" />
      <p className="mt-3 text-muted" aria-hidden="true">
        {label}
      </p>
    </div>
  );
}

/** Grid loading state: reserved-space skeletons (no layout shift). */
export function LoadingGrid({
  count = 3,
  className,
}: {
  count?: number;
  className?: string;
}): ReactNode {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className={
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 " +
        (className ?? "")
      }
    >
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className="h-48 w-full" />
      ))}
    </div>
  );
}
