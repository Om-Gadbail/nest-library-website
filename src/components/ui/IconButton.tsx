import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name — required since the button shows an icon only. */
  label: string;
  children: ReactNode;
}

/** Icon-only button with a guaranteed accessible name and touch target. */
export function IconButton({
  label,
  children,
  className,
  type = "button",
  ...props
}: IconButtonProps): ReactNode {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-md",
        "border border-border bg-card hover:bg-muted-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
