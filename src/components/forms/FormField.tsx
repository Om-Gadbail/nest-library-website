import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Accessible field wrapper: label + control + hint/error wiring.
 * Generic — no business validation inside.
 */
export function FormField({
  label,
  htmlFor,
  hint,
  error,
  required = false,
  children,
  className,
}: FormFieldProps): ReactNode {
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;

  return (
    <div className={cn("w-full", className)}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-small font-semibold"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-destructive">
            *
          </span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-small text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-small text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
