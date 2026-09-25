import type { ReactNode } from "react";
import type { UseFormRegister } from "react-hook-form";

/**
 * Nest Library — spam-defense honeypot field.
 *
 * Visually hidden from real visitors (off-screen, aria-hidden, unfocusable);
 * bots that auto-fill every input reveal themselves. The zod schemas reject
 * any non-empty value and `submitForm` silently discards it.
 */
interface HoneypotFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

export function HoneypotField({ register }: HoneypotFieldProps): ReactNode {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        top: "auto",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label htmlFor="company-field">
        Company (leave blank)
        <input
          id="company-field"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...register("company")}
        />
      </label>
    </div>
  );
}
