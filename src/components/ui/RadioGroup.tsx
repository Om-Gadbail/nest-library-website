import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

interface RadioOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  orientation?: "vertical" | "horizontal";
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "name" | "value" | "onChange"
  >;
}

/**
 * Accessible radio group primitive. Renders a real <input type="radio"> per
 * option inside a fieldset/legend-compatible structure. Keyboard navigation
 * (arrow keys) works natively via the shared `name`.
 */
export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onChange,
  className,
  orientation = "vertical",
  inputProps,
}: RadioGroupProps): ReactNode {
  return (
    <div
      role="radiogroup"
      className={cn(
        "flex gap-3",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className,
      )}
    >
      {options.map((option) => {
        const id = `${name}-${option.value}`;
        return (
          <label
            key={option.value}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-start gap-2.5 text-body",
              option.disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <input
              type="radio"
              id={id}
              name={name}
              value={option.value}
              checked={value !== undefined ? value === option.value : undefined}
              defaultValue={undefined}
              data-default={defaultValue === option.value || undefined}
              defaultChecked={
                value === undefined && defaultValue === option.value
              }
              disabled={option.disabled}
              onChange={(event) => {
                onChange?.(event.target.value);
              }}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary"
              {...inputProps}
            />
            <span>
              <span className="block font-medium">{option.label}</span>
              {option.hint && (
                <span className="block text-small text-muted">
                  {option.hint}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
