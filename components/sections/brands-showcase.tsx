"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { brands } from "@/data/brands";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { SectionLabel } from "@/components/custom/section-label";
import { RevealText } from "@/components/custom/reveal-text";
import { Arrow } from "@/components/custom/arrow";

export function BrandsShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: brands.length * 3.2,
      ease: "none",
      repeat: -1,
    });
    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

  const items = reducedMotion ? brands : [...brands, ...brands];

  return (
    <section className="shell-y border-t border-brand-line bg-white">
      <div className="shell">
        <RevealText>
          <SectionLabel index="03">Brands</SectionLabel>
        </RevealText>
        <RevealText delay={0.1} className="mt-4">
          <h2 className="max-w-2xl font-heading text-[clamp(1.9rem,3vw+1rem,3.25rem)] leading-[1.05] tracking-tight">
            Superior brands, imported for architects and designers
          </h2>
        </RevealText>
      </div>

      <div
        className={
          reducedMotion
            ? "shell mt-12 flex gap-10 overflow-x-auto pb-2"
            : "mt-12 overflow-hidden"
        }
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
        onFocus={() => tweenRef.current?.pause()}
        onBlur={() => tweenRef.current?.play()}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center gap-10 whitespace-nowrap will-change-transform"
        >
          {items.map((brand, index) => (
            <div key={`${brand.slug}-${index}`} className="flex items-center gap-10">
              <Link href={`/brands/${brand.slug}`} className="group flex items-baseline gap-3 py-2">
                <span className="label-caps text-brand-blue">
                  {String((index % brands.length) + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-2xl tracking-tight transition-colors group-hover:text-brand-blue sm:text-3xl">
                  {brand.name}
                </span>
                <Arrow className="text-brand-blue opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <span aria-hidden className="h-8 w-px bg-brand-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
