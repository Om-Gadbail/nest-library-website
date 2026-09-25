import type { ReactNode } from "react";

/** Lightweight loading / skeleton fallback for lazy routes and suspense. */
export function LoadingFallback({
  label = "Loading…",
}: {
  label?: string;
}): ReactNode {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[40vh] items-center justify-center px-4"
    >
      <p className="animate-pulse text-muted">{label}</p>
    </div>
  );
}
