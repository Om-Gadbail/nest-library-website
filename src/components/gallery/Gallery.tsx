import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { GalleryItem } from "../business/GalleryItem.tsx";
import { ResponsiveImage } from "../common/ResponsiveImage.tsx";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.ts";
import { motionDuration, motionEasing } from "../../lib/motion.ts";
import type { GalleryImage as GalleryImageType } from "../../types/content.ts";

interface GalleryProps {
  images: GalleryImageType[];
  className?: string;
}

/**
 * Responsive gallery grid (1–2 cols mobile, 2–3 tablet, 3–4 desktop)
 * with a built-in lightbox. Entrance animation is intentionally left to the
 * parent via motion primitives so grids can stagger with surrounding content.
 */
export function Gallery({ images, className }: GalleryProps): ReactNode {
  const [selected, setSelected] = useState<GalleryImageType | null>(null);
  const close = useCallback(() => {
    setSelected(null);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, close]);

  return (
    <>
      <div
        className={
          "grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 " +
          (className ?? "")
        }
      >
        {images.map((image) => (
          <GalleryItem key={image.id} image={image} onSelect={setSelected} />
        ))}
      </div>
      <Lightbox image={selected} onClose={close} />
    </>
  );
}

/** Grid-only variant without lightbox state (parent manages selection). */
export function GalleryGrid({
  images,
  onSelect,
  className,
}: GalleryProps & { onSelect?: (image: GalleryImageType) => void }): ReactNode {
  return (
    <div
      className={
        "grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 " +
        (className ?? "")
      }
    >
      {images.map((image) => (
        <GalleryItem key={image.id} image={image} onSelect={onSelect} />
      ))}
    </div>
  );
}

/** Accessible lightbox dialog with backdrop + Escape dismissal. */
export function Lightbox({
  image,
  onClose,
}: {
  image: GalleryImageType | null;
  onClose: () => void;
}): ReactNode {
  const reduce = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${image.title}`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduce ? 0.01 : motionDuration.fast,
            ease: motionEasing.standard,
          }}
          onClick={onClose}
        >
          <motion.figure
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{
              duration: reduce ? 0.01 : motionDuration.normal,
              ease: motionEasing.standard,
            }}
            className="w-full max-w-3xl overflow-hidden rounded-lg bg-card"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <ResponsiveImage
              src={image.src}
              alt={image.alt}
              aspectRatio="16 / 10"
              className="rounded-none"
            />
            <figcaption className="flex items-start justify-between gap-4 p-4">
              <span className="font-semibold">{image.title}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close photo viewer"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border hover:bg-muted-background"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
