import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";
import { Container } from "./Container.tsx";

interface FeedbackStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

function FeedbackShell({
  title,
  description,
  icon,
  actions,
  className,
  role,
  headingId,
}: FeedbackStateProps & {
  role: "status" | "alert";
  headingId: string;
}): ReactNode {
  return (
    <Container narrow className={cn("py-12 md:py-16", className)}>
      <div role={role} aria-labelledby={headingId} className="text-center">
        {icon && (
          <div aria-hidden="true" className="mb-4 flex justify-center">
            {icon}
          </div>
        )}
        <p id={headingId} className="text-h3 font-semibold">
          {title}
        </p>
        {description && (
          <p className="mx-auto mt-2 max-w-md text-muted">{description}</p>
        )}
        {actions && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </Container>
  );
}

/** Neutral empty state — "nothing here yet", not an error. */
export function EmptyState(props: FeedbackStateProps): ReactNode {
  return (
    <FeedbackShell {...props} role="status" headingId="empty-state-heading" />
  );
}

/** Page/section error state with recovery actions. */
export function ErrorState(props: FeedbackStateProps): ReactNode {
  return (
    <FeedbackShell {...props} role="alert" headingId="error-state-heading" />
  );
}
