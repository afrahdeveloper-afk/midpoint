"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { PHILOSOPHY } from "@/data/philosophy";
import { cn } from "@/lib/utils";

export function PhilosophyWords({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const words = el.querySelectorAll("[data-word]");

    if (reducedMotion) {
      gsap.set(words, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(words, { opacity: 0, y: 20 });
    const animation = gsap.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.07,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [reducedMotion]);

  return (
    <ul
      ref={listRef}
      className={cn(
        "flex flex-wrap items-baseline gap-x-8 gap-y-5 md:gap-x-12 lg:gap-x-16",
        className,
      )}
    >
      {PHILOSOPHY.map((word) => (
        <li
          key={word}
          data-word
          className={cn(
            "font-heading text-[clamp(1.75rem,3.2vw+1rem,4.25rem)] leading-[1.05] tracking-tight",
            light ? "text-white/95" : "text-brand-ink",
          )}
        >
          {word}
        </li>
      ))}
    </ul>
  );
}
