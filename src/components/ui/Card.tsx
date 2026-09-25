import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Generic card surface. Composable — no business logic inside. */
export function Card({ children, className }: CardProps): ReactNode {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps): ReactNode {
  return <div className={cn("p-6 pb-0", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps): ReactNode {
  return <h3 className={cn("text-h3 font-semibold", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: CardProps): ReactNode {
  return (
    <p className={cn("mt-1 text-small text-muted", className)}>{children}</p>
  );
}

export function CardContent({ children, className }: CardProps): ReactNode {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardProps): ReactNode {
  return (
    <div className={cn("flex flex-wrap gap-3 p-6 pt-0", className)}>
      {children}
    </div>
  );
}
