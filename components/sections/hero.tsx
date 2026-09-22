"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { HERO_REVEAL_DELAY } from "@/lib/motion-timing";
import { RevealText } from "@/components/custom/reveal-text";
import { MediaFrame } from "@/components/custom/media-frame";
import { MagneticButton } from "@/components/custom/magnetic-button";
import { Arrow } from "@/components/custom/arrow";

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)" });
    const tween = gsap.to(el, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.6,
      delay: HERO_REVEAL_DELAY - 0.2,
      ease: "power4.inOut",
    });

    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

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
      delay: HERO_REVEAL_DELAY + 1.2,
    });

    return () => {
      loop.kill();
    };
  }, [reducedMotion]);

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-brand-navy text-white">
      <div ref={imageRef} className="absolute inset-0">
        <MediaFrame
          src="/hero/hero-interior.webp"
          alt="Kitchen interior with dark veined stone cabinetry and a city skyline view"
          label="Hero — cinematic architectural / interior image"
          ratio="auto"
          className="h-full w-full"
          priority
          sizes="100vw"
        />
      </div>

      <div className="shell relative z-10 flex w-full flex-col gap-10 pb-24 pt-40 md:pb-32">
        <div>
          <RevealText delay={HERO_REVEAL_DELAY} y={36}>
            <h1 className="max-w-4xl font-heading text-[clamp(2.25rem,4.4vw+1.22rem,6.5rem)] leading-[0.98] font-normal tracking-tight uppercase">
              Architectural Materials &amp; Solutions
            </h1>
          </RevealText>

          <RevealText
            delay={HERO_REVEAL_DELAY + 0.15}
            y={20}
            className="mt-3 md:mt-4"
          >
            <p className="label-caps max-w-md text-white/70">
              Curated surfaces and architectural materials for spaces
              designed to endure.
            </p>
          </RevealText>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-end">
          <RevealText delay={HERO_REVEAL_DELAY + 0.3} y={24}>
            <MagneticButton>
              <Link
                href="/products"
                className="group flex items-center gap-2 border border-white/30 px-6 py-3 label-caps text-white transition-colors hover:border-white hover:bg-white hover:text-brand-navy"
              >
                Explore Our Products
                <Arrow />
              </Link>
            </MagneticButton>
          </RevealText>
        </div>

        <RevealText
          delay={HERO_REVEAL_DELAY + 0.45}
          y={16}
          className="flex items-center justify-between border-t border-white/15 pt-6"
        >
          <span className="label-caps text-white/50">Baghdad / Iraq</span>
          <div
            ref={indicatorRef}
            className="flex flex-col items-center gap-2 text-white/50"
            aria-hidden
          >
            <span className="h-10 w-px bg-white/30" />
          </div>
        </RevealText>
      </div>
    </section>
  );
}
