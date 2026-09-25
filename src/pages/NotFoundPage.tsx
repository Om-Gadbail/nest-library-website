import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/common/Seo.tsx";
import { PageContainer } from "../layouts/PageContainer.tsx";
import { Button } from "../components/ui/Button.tsx";
import { routePaths } from "../config/navigation.ts";

/** 404 page for unknown routes. */
export function NotFoundPage(): ReactNode {
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you are looking for does not exist on the Nest Library website."
      />
      <PageContainer narrow>
        <div className="py-8 text-center">
          <p aria-hidden="true" className="text-display font-bold text-primary">
            404
          </p>
          <h1 className="mt-2 text-h1 font-bold">Page not found</h1>
          <p className="mx-auto mt-3 max-w-md text-muted">
            The page you are looking for may have moved or does not exist yet.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button to={routePaths.home}>Go home</Button>
            <Button to={routePaths.contact} variant="outline">
              Contact us
            </Button>
          </div>
          <p className="mt-8 text-small text-muted">
            Looking for something specific?{" "}
            <Link to={routePaths.faq} className="underline underline-offset-4">
              Visit the FAQ
            </Link>
          </p>
        </div>
      </PageContainer>
    </>
  );
}
