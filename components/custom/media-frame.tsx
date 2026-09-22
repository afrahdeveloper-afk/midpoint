import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  src?: string;
  alt: string;
  label: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Aspect-ratio image slot. Renders the real image once `src` is supplied;
 * until then it renders a labelled placeholder so layout, grid, and motion
 * read correctly with the final photography dropped in later.
 */
export function MediaFrame({
  src,
  alt,
  label,
  ratio = "4/5",
  className,
  priority,
  sizes,
}: MediaFrameProps) {
  return (
    <div
      className={cn("relative overflow-hidden bg-muted", className)}
      style={{ aspectRatio: ratio }}
      data-media-frame
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "100vw"}
          className="object-cover"
          data-media-frame-image
        />
      ) : (
        // Caption anchors to a corner rather than dead-center: on full-bleed
        // frames (e.g. Hero) foreground copy usually sits in the visual
        // center, and a centered placeholder icon/label would collide with it.
        <div className="absolute inset-0 border border-dashed border-brand-line bg-[repeating-linear-gradient(135deg,transparent,transparent_18px,rgba(17,17,17,0.03)_18px,rgba(17,17,17,0.03)_19px)]">
          <div className="absolute right-4 bottom-4 left-4 flex items-center gap-2 sm:right-6 sm:bottom-6 sm:left-auto">
            <ImageIcon
              className="size-4 shrink-0 text-brand-muted/60"
              strokeWidth={1.25}
              aria-hidden
            />
            <span className="label-caps truncate text-brand-muted/80">
              {label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
