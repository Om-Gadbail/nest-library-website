import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/**
 * Accessible checkbox primitive. Always pair with a <label> (or FormField).
 * 20px box keeps the touch target comfortable without layout shifts.
 */
export function Checkbox({
  className,
  id,
  ...props
}: CheckboxProps): ReactNode {
  return (
    <input
      type="checkbox"
      id={id}
      className={cn(
        "h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-sm border border-border bg-card",
        "transition-colors checked:border-primary checked:bg-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
