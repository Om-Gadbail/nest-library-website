import type { ReactNode } from "react";
import { Container } from "../components/ui/Container.tsx";
import { cn } from "../lib/cn.ts";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

/** Page-level vertical rhythm wrapper (consistent top/bottom spacing). */
export function PageContainer({
  children,
  className,
  narrow = false,
}: PageContainerProps): ReactNode {
  return (
    <div className={cn("py-12 md:py-16", className)}>
      <Container narrow={narrow}>{children}</Container>
    </div>
  );
}
