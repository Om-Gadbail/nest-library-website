/**
 * Nest Library — breadcrumbs (SEO + orientation).
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { routePaths } from "../../config/navigation.ts";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }): ReactNode {
  return (
    <nav aria-label="Breadcrumb" className="py-5">
      <ol className="flex flex-wrap items-center gap-1 text-small text-muted">
        <li>
          <Link
            to={routePaths.home}
            className="hover:underline hover:underline-offset-4"
          >
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1">
            <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
            {item.to ? (
              <Link
                to={item.to}
                className="hover:underline hover:underline-offset-4"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
