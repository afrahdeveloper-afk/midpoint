"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { MediaFrame } from "@/components/custom/media-frame";
import { RevealText } from "@/components/custom/reveal-text";
import type { Project } from "@/data/projects";

export function ProjectHero({ project }: { project: Project }) {
  const imageRef = useRef<HTMLDivElement>(null);
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
      duration: 1.4,
      ease: "power4.inOut",
    });

    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <section className="relative flex min-h-[85vh] items-end overflow-hidden bg-brand-navy text-white">
      <div ref={imageRef} className="absolute inset-0">
        <MediaFrame
          src={project.coverImage}
          alt={project.title}
          label={`${project.title} — hero image`}
          ratio="auto"
          className="h-full w-full"
          priority
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
        />
      </div>

      <div className="shell relative z-10 flex w-full flex-col gap-6 pt-40 pb-20 md:pb-24">
        <RevealText>
          <span className="label-caps text-white/70">{project.number}</span>
        </RevealText>
        <RevealText delay={0.1}>
          <h1 className="max-w-4xl font-heading text-[clamp(2.25rem,4.4vw+1.22rem,5.5rem)] leading-[0.98] tracking-tight uppercase">
            {project.title}
          </h1>
        </RevealText>
        <RevealText
          delay={0.2}
          className="flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          <span className="label-caps text-white/70">{project.category}</span>
          {project.location && (
            <span className="label-caps text-white/70">
              — {project.location}
            </span>
          )}
          {project.year && (
            <span className="label-caps text-white/70">— {project.year}</span>
          )}
        </RevealText>
      </div>
    </section>
  );
}
