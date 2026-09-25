import { BrowserRouter } from "react-router-dom";
import type { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Application providers (foundation).
 * Future global providers (theme, data-fetching, etc.) compose here.
 */
export function AppProviders({ children }: AppProvidersProps): ReactNode {
  return <BrowserRouter>{children}</BrowserRouter>;
}
