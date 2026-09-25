import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/Card.tsx";
import { Badge } from "../ui/Badge.tsx";
import { Button } from "../ui/Button.tsx";
import { routePaths } from "../../config/navigation.ts";
import { cn } from "../../lib/cn.ts";
import type { MembershipPlan } from "../../types/content.ts";

/** Membership pricing card — price may be null ("Fee on enquiry"). */
export function PricingCard({ plan }: { plan: MembershipPlan }): ReactNode {
  return (
    <Card
      className={cn(plan.highlighted && "border-primary ring-1 ring-primary")}
    >
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold">{plan.name}</h3>
          {plan.highlighted && <Badge>Popular</Badge>}
        </div>
        <p className="text-small text-muted">
          {plan.durationLabel} · {plan.seatType}
        </p>
        <p className="text-h3 font-bold">{plan.priceNote}</p>
        <ul className="space-y-2 text-small">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-success"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {plan.isPlaceholder && <Badge>Placeholder</Badge>}
      </CardContent>
      <CardFooter>
        <Button to={routePaths.membershipInquiry} fullWidth={plan.highlighted}>
          {plan.ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
