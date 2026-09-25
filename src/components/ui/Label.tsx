import type { LabelHTMLAttributes } from "react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

/** Accessible form label primitive. Pair with input `id` via `htmlFor`. */
export function Label({
  className,
  children,
  ...props
}: LabelProps): ReactNode {
  return (
    <label
      className={cn("mb-1.5 block text-small font-semibold", className)}
      {...props}
    >
      {children}
    </label>
  );
}
