import type { ReactNode } from "react";
import { AppProviders } from "./providers.tsx";
import { AppRouter } from "./router.tsx";
import { ErrorBoundary } from "../components/common/ErrorBoundary.tsx";
import { ScrollToTop } from "../components/common/ScrollToTop.tsx";

/** Application root: providers + error boundary + router. */
export default function App(): ReactNode {
  return (
    <AppProviders>
      <ErrorBoundary>
        <ScrollToTop />
        <AppRouter />
      </ErrorBoundary>
    </AppProviders>
  );
}
