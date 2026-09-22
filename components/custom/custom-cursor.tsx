"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/use-media-query";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Desktop-only cursor companion. Disabled on touch/coarse pointers and under
 * prefers-reduced-motion. Elements can opt in with `data-cursor="View"` (or
 * "Open" / "Drag") to swap the dot for a labelled state on hover.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const supportsHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useReducedMotion();
  const enabled = supportsHover && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    // Centering is done via GSAP's xPercent/yPercent (composed into the
    // same transform as the x/y position tween below) rather than a
    // Tailwind translate class, since GSAP's inline transform would
    // otherwise clobber it outright. Parked at a small in-bounds offset,
    // invisible, until the first real mousemove — a fixed element sitting
    // at the untransformed (0,0) origin can push the document's
    // scrollable area into negative X in Chromium.
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: 24, y: 24, opacity: 0 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });

    let revealed = false;
    function handleMove(event: MouseEvent) {
      xTo(event.clientX);
      yTo(event.clientY);
      if (!revealed) {
        revealed = true;
        gsap.to(dot, { opacity: 1, duration: 0.4, ease: "power2.out" });
      }
    }

    function handleOver(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest?.(
        "[data-cursor]",
      );
      setLabel(target ? target.getAttribute("data-cursor") : null);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[999] will-change-transform"
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-brand-blue text-[10px] font-medium uppercase tracking-[0.15em] text-white transition-[width,height] duration-300 ease-out",
          label ? "size-16" : "size-2.5",
        )}
      >
        {label}
      </div>
    </div>
  );
}
