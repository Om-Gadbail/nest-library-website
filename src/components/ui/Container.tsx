import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Narrower measure for prose-heavy pages. */
  narrow?: boolean;
}

/**
 * Responsive centered content container.
 * Mobile-first gutters, capped max width, no horizontal overflow.
 */
export function Container({
  children,
  className,
  narrow = false,
}: ContainerProps): ReactNode {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 xs:px-6 md:px-8",
        narrow ? "max-w-3xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
