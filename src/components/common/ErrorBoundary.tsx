import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container.tsx";
import { Button } from "../ui/Button.tsx";
import { routePaths } from "../../config/navigation.ts";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Lightweight application error boundary (foundation).
 * Catches render crashes and offers recovery without extra dependencies.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    // Foundation logging: visible in devtools, replace with reporting later.
    console.error("Nest Library — uncaught render error:", error, info);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container narrow className="py-16 md:py-24">
          <div role="alert" className="text-center">
            <p className="text-h2 font-semibold">Something went wrong</p>
            <p className="mt-3 text-muted">
              The page could not be displayed. Please try again or return home.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button onClick={this.handleReset}>Try again</Button>
              <Link
                to={routePaths.home}
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 font-semibold hover:bg-muted-background"
              >
                Go home
              </Link>
            </div>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}
