"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export function MagneticButton({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const quickToRef = useRef<{
    x: (value: number) => void;
    y: (value: number) => void;
  } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    quickToRef.current = {
      x: gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" }),
    };

    return () => {
      quickToRef.current = null;
      gsap.killTweensOf(el);
    };
  }, [reducedMotion]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el || !quickToRef.current) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;
    quickToRef.current.x(relX * strength);
    quickToRef.current.y(relY * strength);
  }

  function handleMouseLeave() {
    if (reducedMotion) return;
    quickToRef.current?.x(0);
    quickToRef.current?.y(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </div>
  );
}
