import type { InputHTMLAttributes } from "react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/** Accessible text input primitive with an error state hook. */
export function Input({ className, id, ...props }: InputProps): ReactNode {
  return (
    <input
      id={id}
      className={cn(
        "w-full rounded-md border border-border bg-card px-4 py-2.5",
        "placeholder:text-muted focus-visible:outline-2",
        "aria-[invalid=true]:border-destructive",
        className,
      )}
      {...props}
    />
  );
}
