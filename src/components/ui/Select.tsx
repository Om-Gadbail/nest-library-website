import type { SelectHTMLAttributes } from "react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

/** Accessible native select primitive (mobile-friendly by default). */
export function Select({
  className,
  children,
  ...props
}: SelectProps): ReactNode {
  return (
    <select
      className={cn(
        "w-full rounded-md border border-border bg-card px-4 py-2.5",
        "aria-[invalid=true]:border-destructive",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
