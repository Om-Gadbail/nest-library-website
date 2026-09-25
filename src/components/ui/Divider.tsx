import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

interface DividerProps {
  className?: string;
  label?: ReactNode;
}

/** Horizontal rule, optionally with a centered label. */
export function Divider({ className, label }: DividerProps): ReactNode {
  if (!label) {
    return <hr className={cn("border-border", className)} />;
  }

  return (
    <div
      role="separator"
      className={cn("flex items-center gap-4 text-small text-muted", className)}
    >
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
      <span>{label}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  );
}
