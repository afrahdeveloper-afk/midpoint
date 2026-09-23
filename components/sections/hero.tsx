"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { HERO_REVEAL_DELAY } from "@/lib/motion-timing";
import { RevealText } from "@/components/custom/reveal-text";
import { MediaFrame } from "@/components/custom/media-frame";
import { MagneticButton } from "@/components/custom/magnetic-button";
import { Arrow } from "@/components/custom/arrow";

const SLIDES = [
  {
    src: "/hero/hero-interior.webp",
    alt: "Kitchen interior with dark veined stone cabinetry and a city skyline view",
    title: "Veined stone cabinetry",
  },
  {
    src: "/brands/ab-marble-slab-lounge.jpg",
    alt: "Lounge clad in black veined marble slabs with a polished stone floor",
    title: "Black marble cladding",
  },
  {
    src: "/hero/infinity.webp",
    alt: "Infinity architectural surface in a luxury interior",
    title: "Infinity architectural surface",
  },
];

const HOLD_SECONDS = 5;
const FADE_SECONDS = 1.2;
const ZOOM_SCALE = 1.08;
const CAROUSEL_ID = "hero-carousel";

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const zoomRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cycleRef = useRef<gsap.core.Timeline | null>(null);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [userControlled, setUserControlled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // Hover/focus only pauses until the visitor takes explicit control. Without
  // this handover, pressing Play while the pointer is still over the button
  // would leave the slideshow paused and the control looking broken.
  const isPaused = userControlled ? userPaused : hovered || focused;

  const goTo = useCallback((next: number) => {
    const target = (next + SLIDES.length) % SLIDES.length;
    if (target === activeRef.current) return;
    setExiting(activeRef.current);
    activeRef.current = target;
    setActive(target);
  }, []);

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

  // Declared before the cycle effect so the ref is already current when a new
  // cycle is built on the same commit.
  useEffect(() => {
    pausedRef.current = isPaused;
    const cycle = cycleRef.current;
    if (!cycle) return;

    if (isPaused) cycle.pause();
    else cycle.resume();
  }, [isPaused]);

  useEffect(() => {
    if (reducedMotion) {
      const layers = zoomRefs.current.filter(Boolean) as HTMLDivElement[];
      if (layers.length) gsap.set(layers, { clearProps: "transform" });
    }

    const cycle = gsap.timeline({ paused: pausedRef.current });
    cycleRef.current = cycle;

    const el = zoomRefs.current[active];
    if (el && !reducedMotion) {
      cycle.fromTo(
        el,
        { scale: 1 },
        {
          scale: ZOOM_SCALE,
          // Spans exactly the hold so the frame has travelled the full 1 ->
          // 1.08 by the time the crossfade starts; it then rests at 1.08 while
          // it fades out and is reset once transparent.
          duration: HOLD_SECONDS,
          ease: "none",
        },
        0,
      );
    }
    cycle.call(() => goTo(activeRef.current + 1), undefined, HOLD_SECONDS);

    return () => {
      cycle.kill();
      cycleRef.current = null;
    };
  }, [active, reducedMotion, goTo]);

  // The outgoing frame keeps its scale for the length of the crossfade and is
  // only reset once it is fully transparent, so the reset is never visible.
  useEffect(() => {
    if (exiting === null) return;

    const el = zoomRefs.current[exiting];
    const timeout = window.setTimeout(
      () => {
        if (el && activeRef.current !== exiting) gsap.set(el, { scale: 1 });
        setExiting(null);
      },
      FADE_SECONDS * 1000,
    );

    return () => window.clearTimeout(timeout);
  }, [exiting]);

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

  const handleDotKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;

    event.preventDefault();
    // Relative to the focused indicator, not the visible slide: tabbing in
    // lands on the first indicator regardless of which slide is showing.
    const from = dotRefs.current.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    const origin = from === -1 ? activeRef.current : from;
    const next = (origin + step + SLIDES.length) % SLIDES.length;
    goTo(next);
    dotRefs.current[next]?.focus();
  };

  return (
    <section
      className="relative flex min-h-screen items-end overflow-hidden bg-brand-navy text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div ref={imageRef} className="absolute inset-0">
        <div
          id={CAROUSEL_ID}
          role="group"
          aria-roledescription="carousel"
          aria-label="Featured architectural interiors"
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            aria-live={isPaused ? "polite" : "off"}
          >
            {SLIDES.map((slide, index) => {
              const isActive = index === active;

              return (
                <div
                  key={slide.src}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${SLIDES.length}: ${slide.title}`}
                  aria-hidden={!isActive}
                  className="absolute inset-0 transition-opacity ease-in-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transitionDuration: `${FADE_SECONDS * 1000}ms`,
                  }}
                >
                  <div
                    ref={(el) => {
                      zoomRefs.current[index] = el;
                    }}
                    className="h-full w-full"
                  >
                    <MediaFrame
                      src={slide.src}
                      alt={slide.alt}
                      label="Hero — cinematic architectural / interior image"
                      ratio="auto"
                      className="h-full w-full"
                      priority={index === 0}
                      sizes="100vw"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="shell relative z-10 flex w-full flex-col gap-8 pb-16 pt-40 sm:gap-10 sm:pb-24 md:pb-32">
        <div className="flex flex-col items-center text-center">
          <RevealText delay={HERO_REVEAL_DELAY} y={36}>
            <h1 className="text-shadow-soft max-w-4xl font-heading text-[clamp(2.25rem,4.4vw+1.22rem,6.5rem)] leading-[0.98] font-normal tracking-tight uppercase text-balance">
              Architectural Materials &amp; Solutions
            </h1>
          </RevealText>

          <RevealText
            delay={HERO_REVEAL_DELAY + 0.15}
            y={20}
            className="mt-4 md:mt-6"
          >
            <p className="label-caps text-shadow-soft max-w-md text-white">
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
                className="text-shadow-soft group flex items-center gap-2 border border-white/30 px-6 py-3 label-caps text-white transition-colors hover:border-white hover:bg-white hover:text-brand-navy hover:[text-shadow:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore Our Products
                <Arrow />
              </Link>
            </MagneticButton>
          </RevealText>
        </div>

        <RevealText
          delay={HERO_REVEAL_DELAY + 0.4}
          y={16}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          <div
            role="group"
            aria-label="Hero slides"
            onKeyDown={handleDotKeyDown}
            className="flex items-center gap-3"
          >
            {SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                ref={(el) => {
                  dotRefs.current[index] = el;
                }}
                type="button"
                onClick={() => goTo(index)}
                aria-controls={CAROUSEL_ID}
                aria-current={index === active ? "true" : undefined}
                aria-label={`Show slide ${index + 1} of ${SLIDES.length}: ${slide.title}`}
                className="group/dot cursor-pointer py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span
                  aria-hidden
                  className={cn(
                    "block h-px w-8 transition-colors duration-500 sm:w-10",
                    index === active
                      ? "bg-white"
                      : "bg-white/35 group-hover/dot:bg-white/70",
                  )}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setUserControlled(true);
              setUserPaused((paused) => !paused);
            }}
            aria-controls={CAROUSEL_ID}
            aria-label={
              userPaused ? "Play hero slideshow" : "Pause hero slideshow"
            }
            className="label-caps text-shadow-soft cursor-pointer py-2 text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {userPaused ? "Play" : "Pause"}
          </button>
        </RevealText>

        <RevealText
          delay={HERO_REVEAL_DELAY + 0.5}
          y={16}
          className="flex items-center justify-between border-t border-white/15 pt-6"
        >
          <span className="label-caps text-shadow-soft text-white/50">
            Baghdad / Iraq
          </span>
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
