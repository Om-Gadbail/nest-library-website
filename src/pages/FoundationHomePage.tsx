import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Seo } from "../components/common/Seo.tsx";
import { Badge } from "../components/ui/Badge.tsx";
import { Button } from "../components/ui/Button.tsx";
import { Card, CardContent } from "../components/ui/Card.tsx";
import { Container } from "../components/ui/Container.tsx";
import { navigationConfig, routePaths } from "../config/navigation.ts";
import { siteConfig } from "../config/site.ts";

const foundationChecks = [
  "Central site, contact, business & navigation config",
  "Typed data structures for facilities, seats, plans, FAQ & gallery",
  "Design tokens, global CSS & responsive primitives",
  "Accessible UI primitives, layouts & routing",
] as const;

/**
 * TEMPORARY foundation home — NOT the final homepage or hero.
 * Verifies the shell, config wiring and responsive layout.
 * The real homepage will be designed in a later phase.
 */
export function FoundationHomePage(): ReactNode {
  return (
    <>
      <Seo
        title="Focused Study Environment"
        description={siteConfig.description}
      />

      <section className="border-b border-border bg-card">
        <Container className="py-16 md:py-24">
          <Badge tone="primary">Frontend foundation</Badge>
          <h1 className="mt-4 max-w-2xl text-h1 font-bold md:text-display">
            {siteConfig.name} — foundation shell
          </h1>
          <p className="mt-4 max-w-xl text-muted">{siteConfig.tagline}</p>
          <p className="mt-2 max-w-xl text-small text-muted">
            This is a structural placeholder, not the final homepage. It
            confirms configuration, layout, routing and responsiveness before
            visual design begins.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={routePaths.bookVisit}>
              {siteConfig.cta.secondary}
            </Button>
            <Button to={routePaths.seatInquiry} variant="outline">
              {siteConfig.cta.primary}
            </Button>
            <Button to={routePaths.plans} variant="ghost">
              {siteConfig.cta.tertiary}
            </Button>
          </div>
        </Container>
      </section>

      <section aria-labelledby="foundation-checks" className="py-16 md:py-24">
        <Container>
          <h2 id="foundation-checks" className="text-h2 font-bold">
            What this foundation establishes
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {foundationChecks.map((check) => (
              <Card key={check}>
                <CardContent className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-success"
                  />
                  <p className="font-medium">{check}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="mt-16 text-h2 font-bold">Planned routes</h2>
          <p className="mt-2 max-w-xl text-small text-muted">
            Every future page already has a reserved, extendable route.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[...navigationConfig.primary, ...navigationConfig.conversions].map(
              (item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex items-center justify-between gap-2 rounded-md border border-border bg-card px-4 py-3 font-medium hover:bg-muted-background"
                  >
                    {item.label}
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="text-muted transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ),
            )}
          </ul>
        </Container>
      </section>
    </>
  );
}
