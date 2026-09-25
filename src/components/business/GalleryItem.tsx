import type { ReactNode } from "react";
import { ResponsiveImage } from "../common/ResponsiveImage.tsx";
import type { GalleryImage } from "../../types/content.ts";

/**
 * Gallery item (foundation). Wraps the responsive image with a button
 * semantics hook for the future lightbox — `onSelect` opens it.
 */
export function GalleryItem({
  image,
  onSelect,
}: {
  image: GalleryImage;
  onSelect?: (image: GalleryImage) => void;
}): ReactNode {
  const content = (
    <ResponsiveImage
      src={image.src}
      alt={image.alt}
      aspectRatio="4 / 3"
      className="rounded-lg"
    />
  );

  if (!onSelect) return content;

  return (
    <button
      type="button"
      onClick={() => {
        onSelect(image);
      }}
      aria-label={`View photo: ${image.title}`}
      className="block w-full overflow-hidden rounded-lg transition-opacity hover:opacity-90"
    >
      {content}
    </button>
  );
}
