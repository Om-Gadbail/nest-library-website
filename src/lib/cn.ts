import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Nest Library — class-name composer.
 * Combines conditional classes (clsx) with Tailwind conflict resolution
 * (tailwind-merge) so variant overrides always win predictably.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}
