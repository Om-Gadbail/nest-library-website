import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/common/Seo.tsx";
import { PageContainer } from "../layouts/PageContainer.tsx";
import { Badge } from "../components/ui/Badge.tsx";
import { Button } from "../components/ui/Button.tsx";
import { routePaths } from "../config/navigation.ts";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

/**
 * Temporary placeholder for planned pages that are not built yet.
 * Keeps routing verifiable without inventing page content.
 */
export function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps): ReactNode {
  return (
    <>
      <Seo title={title} description={description} />
      <PageContainer narrow>
        <Badge tone="neutral">Coming soon</Badge>
        <h1 className="mt-4 text-h1 font-bold">{title}</h1>
        <p className="mt-3 text-muted">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to={routePaths.bookVisit}>Book a visit</Button>
          <Button to={routePaths.seatInquiry} variant="outline">
            Enquire about a seat
          </Button>
        </div>
        <p className="mt-8 text-small text-muted">
          This is a routing placeholder from the frontend-foundation phase. Real
          content will be added in a later phase.{" "}
          <Link to={routePaths.home} className="underline underline-offset-4">
            Back home
          </Link>
        </p>
      </PageContainer>
    </>
  );
}
