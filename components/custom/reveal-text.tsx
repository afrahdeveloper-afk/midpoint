"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type RevealTextProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  /** "scroll" reveals when the element enters the viewport; "mount" reveals immediately (e.g. hero). */
  trigger?: "scroll" | "mount";
};

export function RevealText({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.9,
  trigger = "scroll",
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y });

    const animation = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger:
        trigger === "scroll"
          ? { trigger: el, start: "top 88%", once: true }
          : undefined,
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [reducedMotion, delay, y, duration, trigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
