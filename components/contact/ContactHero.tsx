"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";

/**
 * Editorial opening spread for /contact-us — a page-specific variant of the
 * shared PageHero (kept separate so About/Brands/Products/Services are
 * untouched) with a decorative low-opacity numeral and a scroll indicator,
 * matching the homepage Hero's existing indicator pattern.
 */
export function ContactHero() {
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = indicatorRef.current;
    if (!el || reducedMotion) return;

    const loop = gsap.to(el, {
      y: 10,
      opacity: 0.3,
      duration: 1.4,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.4,
    });

    return () => {
      loop.kill();
    };
  }, [reducedMotion]);

  return (
    <div className="shell relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <span
        aria-hidden
        className="pointer-events-none absolute top-4 right-0 hidden font-heading text-[clamp(8rem,20vw,18rem)] leading-none text-brand-ink/[0.04] select-none sm:block md:top-0"
      >
        07
      </span>

      <div className="relative">
        <RevealText>
          <SectionLabel index="07">Contact Us</SectionLabel>
        </RevealText>
        <RevealText delay={0.1} className="mt-6">
          <h1 className="max-w-4xl font-heading text-[clamp(2.5rem,5vw+1rem,5.5rem)] leading-[0.98] tracking-tight uppercase">
            Let&apos;s Build Something Remarkable.
          </h1>
        </RevealText>
        <RevealText delay={0.2} className="mt-8">
          <p className="max-w-lg text-base leading-relaxed text-brand-muted">
            Start a project or simply get in touch — tell us what
            you&apos;re working on and we&apos;ll take it from there.
          </p>
        </RevealText>

        <RevealText
          delay={0.32}
          className="mt-16 flex items-center justify-between border-t border-brand-line pt-6 md:mt-24"
        >
          <span className="label-caps text-brand-muted">Scroll</span>
          <span
            ref={indicatorRef}
            aria-hidden
            className="block h-10 w-px bg-brand-line"
          />
        </RevealText>
      </div>
    </div>
  );
}
