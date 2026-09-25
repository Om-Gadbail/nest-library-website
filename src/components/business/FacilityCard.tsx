/**
 * Nest Library — facility card (editorial, icon + short text).
 */

import type { ReactNode } from "react";
import {
  Armchair,
  BookOpen,
  Clock,
  Coffee,
  ShieldCheck,
  Snowflake,
  Users,
  Wifi,
  Zap,
  LampDesk,
  type LucideIcon,
} from "lucide-react";
import type { Facility, FacilityIconKey } from "../../types/content.ts";

const ICONS: Record<FacilityIconKey, LucideIcon> = {
  armchair: Armchair,
  wifi: Wifi,
  snowflake: Snowflake,
  "book-open": BookOpen,
  coffee: Coffee,
  "shield-check": ShieldCheck,
  zap: Zap,
  clock: Clock,
  users: Users,
  "lamp-desk": LampDesk,
};

export function FacilityCard({ facility }: { facility: Facility }): ReactNode {
  const Icon = ICONS[facility.icon];

  return (
    <article className="rounded-lg border border-border bg-card p-6 shadow-subtle transition-transform hover:-translate-y-1">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary-muted text-primary">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-[13px] font-bold tracking-[0.14em] uppercase">
        {facility.title}
      </h3>
      <p className="mt-2 text-small leading-relaxed text-muted">
        {facility.description}
      </p>
      <span aria-hidden="true" className="mt-4 block h-px w-10 bg-border" />
    </article>
  );
}
