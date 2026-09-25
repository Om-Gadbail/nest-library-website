/**
 * Nest Library — logo mark (replaceable asset slot).
 *
 * Inline SVG interpretation of the poster identity: circular emblem,
 * open book, nest arc and leaf-green accent with the NEST LIBRARY
 * wordmark. To replace with the high-resolution owner asset, drop the
 * file at `src/assets/nest-logo.svg` and update this component to
 * render it (single change point — navbar, footer, favicon stay wired).
 */

import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

interface NestLogoProps {
  variant?: "light" | "dark";
  compact?: boolean;
  className?: string;
}

export function NestLogoMark({ className }: { className?: string }): ReactNode {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Nest Library emblem"
      className={cn("h-9 w-9 shrink-0", className)}
    >
      <circle cx="24" cy="24" r="22" fill="#0F2340" />
      <circle
        cx="24"
        cy="24"
        r="22"
        fill="none"
        stroke="#C9A227"
        strokeWidth="1.6"
      />
      {/* open book */}
      <path
        d="M10 19.5c4.5-2.2 9.3-2.2 14 0 4.7-2.2 9.5-2.2 14 0v12c-4.5-2.2-9.3-2.2-14 0-4.7-2.2-9.5-2.2-14 0v-12Z"
        fill="#F4F7FC"
      />
      <path d="M24 17.5v14" stroke="#0F2340" strokeWidth="1.6" />
      {/* nest arc */}
      <path
        d="M12 33c3.5 3.4 7.7 5 12 5s8.5-1.6 12-5"
        fill="none"
        stroke="#E86A1F"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* leaves */}
      <path
        d="M17 13.5c2.4-2.6 5.4-3.4 8-2.6-0.6 2.8-2.8 4.6-5.6 4.6-1 0-1.8-.4-2.4-2Z"
        fill="#2F7D4F"
      />
      <path
        d="M31 13.5c-2.4-2.6-5.4-3.4-8-2.6 0.6 2.8 2.8 4.6 5.6 4.6 1 0 1.8-.4 2.4-2Z"
        fill="#3E9B63"
      />
    </svg>
  );
}

export function NestLogo({
  variant = "light",
  compact = false,
  className,
}: NestLogoProps): ReactNode {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <NestLogoMark />
      {!compact && (
        <span className="leading-none">
          <span
            className={cn(
              "block text-[17px] font-extrabold tracking-[0.08em]",
              variant === "light" ? "text-white" : "text-navy",
            )}
          >
            NEST LIBRARY
          </span>
          <span
            className={cn(
              "mt-1 block text-[10px] font-semibold tracking-[0.22em] uppercase",
              variant === "light" ? "text-white/60" : "text-muted",
            )}
          >
            Better Space Bigger Dreams
          </span>
        </span>
      )}
    </span>
  );
}
