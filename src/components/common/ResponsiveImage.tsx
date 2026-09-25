import type { ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

interface ResponsiveImageProps {
  src: string;
  /** Meaningful alt text — required for accessibility. Empty only if decorative. */
  alt: string;
  /** Aspect ratio box to reserve space and avoid layout shift, e.g. "16 / 9". */
  aspectRatio?: string;
  /** Native lazy loading for below-the-fold images. */
  lazy?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * Responsive image foundation: reserved aspect ratio (no layout shift),
 * lazy loading support, and enforced alt text.
 */
export function ResponsiveImage({
  src,
  alt,
  aspectRatio = "16 / 9",
  lazy = true,
  className,
  imgClassName,
}: ResponsiveImageProps): ReactNode {
  return (
    <div
      className={cn("w-full overflow-hidden bg-muted-background", className)}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
