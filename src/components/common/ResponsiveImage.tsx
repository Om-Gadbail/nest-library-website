import { useState, type ReactNode } from "react";
import { ImageOff } from "lucide-react";
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
 * lazy loading support, enforced alt text, graceful loading fade-in and
 * an honest error state (labelled placeholder, never a broken-image icon).
 */
export function ResponsiveImage({
  src,
  alt,
  aspectRatio = "16 / 9",
  lazy = true,
  className,
  imgClassName,
}: ResponsiveImageProps): ReactNode {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn("w-full overflow-hidden bg-muted-background", className)}
      style={{ aspectRatio }}
    >
      {failed ? (
        <div
          role="img"
          aria-label={`Photo unavailable: ${alt}`}
          className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-muted"
        >
          <ImageOff aria-hidden="true" className="h-6 w-6" />
          <p className="text-small">Photo unavailable</p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={lazy ? "lazy" : "eager"}
          decoding="async"
          onLoad={() => {
            setLoaded(true);
          }}
          onError={() => {
            setFailed(true);
          }}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
