import { useRoutes } from "react-router-dom";
import type { ReactNode } from "react";
import { appRoutes } from "../routes/appRoutes.tsx";

/** Renders the central route table. Extend routes in routes/appRoutes.tsx. */
export function AppRouter(): ReactNode {
  return useRoutes(appRoutes);
}
