"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { MediaFrame } from "@/components/custom/media-frame";
import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";
import { cn } from "@/lib/utils";

// Deterministic cycle of proportions/spans so the grid reads as an edited
// sequence (full-width, two-up, detail crop) rather than a uniform grid.
const LAYOUT = [
  { ratio: "16/9", span: true, offset: false },
  { ratio: "4/5", span: false, offset: false },
  { ratio: "4/5", span: false, offset: true },
  { ratio: "3/2", span: true, offset: false },
] as const;

export function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const frames = Array.from(
      container.querySelectorAll<HTMLElement>("[data-gallery-frame]"),
    );

    if (reducedMotion) {
      gsap.set(frames, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const timelines = frames.map((frame) => {
      const media = frame.querySelector("[data-media-frame-image]");
      gsap.set(frame, { clipPath: "inset(0% 0% 6% 0%)" });
      if (media) gsap.set(media, { scale: 1.04 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: frame, start: "top 88%", once: true },
      });
      tl.to(frame, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: "power3.out",
      });
      if (media) {
        tl.to(
          media,
          { scale: 1, duration: 1.2, ease: "power3.out" },
          "<",
        );
      }
      return tl;
    });

    return () => {
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
    };
  }, [reducedMotion, images]);

  return (
    <section
      ref={containerRef}
      className="shell shell-y border-t border-brand-line"
    >
      <RevealText>
        <SectionLabel index="05">Gallery</SectionLabel>
      </RevealText>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
        {images.map((src, index) => {
          const layout = LAYOUT[index % LAYOUT.length];
          return (
            <div
              key={src}
              data-gallery-frame
              className={cn(
                "overflow-hidden",
                layout.span && "sm:col-span-2",
                layout.offset && "sm:mt-10",
              )}
            >
              <MediaFrame
                src={src}
                alt={`${title} — gallery image ${index + 1}`}
                label={`${title} — gallery image ${index + 1}`}
                ratio={layout.ratio}
                className="h-full w-full"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
