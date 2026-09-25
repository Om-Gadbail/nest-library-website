/**
 * Nest Library — shared section heading (consistent rhythm).
 */

import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";
import { Badge } from "../ui/Badge.tsx";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps): ReactNode {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <Badge tone={dark ? "warning" : "primary"} className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h2
        className={cn(
          "section-title font-extrabold text-balance",
          dark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-body leading-relaxed",
            dark ? "text-white/70" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
