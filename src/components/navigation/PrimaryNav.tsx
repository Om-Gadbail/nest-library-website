import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { navigationConfig } from "../../config/navigation.ts";
import { cn } from "../../lib/cn.ts";

/** Desktop primary navigation driven by central navigation config. */
export function PrimaryNav(): ReactNode {
  return (
    <nav aria-label="Primary">
      <ul className="flex flex-wrap items-center gap-1">
        {navigationConfig.primary.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-small font-medium hover:bg-muted-background",
                  isActive && "bg-muted-background font-semibold",
                )
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
