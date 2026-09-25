import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { BadgeCheck, Leaf, ShieldCheck, VolumeX } from "lucide-react";
import { cn } from "../../lib/cn.ts";

interface TrustBadgeProps {
  icon?: LucideIcon;
  label: string;
  hint?: string;
  className?: string;
}

/** Small trust signal (quiet hours, discipline, cleanliness…). */
export function TrustBadge({
  icon,
  label,
  hint,
  className,
}: TrustBadgeProps): ReactNode {
  const Icon = icon ?? ShieldCheck;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border",
        "bg-card px-4 py-2 text-small font-medium",
        className,
      )}
    >
      <Icon aria-hidden="true" className="h-4 w-4 text-primary" />
      <span>{label}</span>
      {hint && <span className="sr-only">({hint})</span>}
    </div>
  );
}

/** Ready-made calm-study badge row for future sections. */
export function TrustBadgeRow({
  className,
}: {
  className?: string;
}): ReactNode {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <TrustBadge icon={VolumeX} label="Quiet-first halls" />
      <TrustBadge icon={Leaf} label="Clean, calm space" />
      <TrustBadge icon={BadgeCheck} label="Disciplined environment" />
    </div>
  );
}
