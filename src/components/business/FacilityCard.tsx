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
import { Card, CardContent } from "../ui/Card.tsx";
import { Badge } from "../ui/Badge.tsx";
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

/** Facility card — renders typed facility data; placeholder-aware. */
export function FacilityCard({ facility }: { facility: Facility }): ReactNode {
  const Icon = ICONS[facility.icon];

  return (
    <Card>
      <CardContent className="space-y-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary-muted text-primary">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <h3 className="font-semibold">{facility.title}</h3>
        <p className="text-small text-muted">{facility.description}</p>
        {facility.isPlaceholder && <Badge>Placeholder</Badge>}
      </CardContent>
    </Card>
  );
}
