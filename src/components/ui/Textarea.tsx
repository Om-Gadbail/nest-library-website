import type { TextareaHTMLAttributes } from "react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

/** Accessible textarea primitive. */
export function Textarea({ className, ...props }: TextareaProps): ReactNode {
  return (
    <textarea
      rows={4}
      className={cn(
        "w-full rounded-md border border-border bg-card px-4 py-2.5",
        "placeholder:text-muted",
        "aria-[invalid=true]:border-destructive",
        className,
      )}
      {...props}
    />
  );
}
