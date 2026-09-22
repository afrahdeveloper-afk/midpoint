"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { SITE_NAME } from "@/lib/site-config";

/**
 * Intro plays on the homepage only — a direct/hard load of an inner route
 * (e.g. from organic search landing on /products) must show content
 * immediately rather than sit behind a ~2.5s curtain meant as a homepage
 * arrival moment. Root layout persists across client-side navigation, so
 * this never re-triggers when navigating within the site.
 */
export function PageLoader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(isHome);
  const [percent, setPercent] = useState(0);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const finishRef = useRef(() => {});

  useEffect(() => {
    if (!isHome || reducedMotion) return;

    document.body.style.overflow = "hidden";
    skipButtonRef.current?.focus();

    const counter = { value: 0 };
    let panelTween: ReturnType<typeof gsap.to> | null = null;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      counterTween.kill();
      panelTween?.kill();
      document.body.style.overflow = "";
      setVisible(false);
      document.getElementById("main-content")?.focus();
    };
    finishRef.current = finish;

    const counterTween = gsap.to(counter, {
      value: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => setPercent(Math.round(counter.value)),
      onComplete: () => {
        panelTween = gsap.to("[data-loader-panel]", {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          delay: 0.15,
          onComplete: finish,
        });
      },
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") finish();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      counterTween.kill();
      panelTween?.kill();
      document.body.style.overflow = "";
    };
  }, [isHome, reducedMotion]);

  if (!isHome || reducedMotion || !visible) return null;

  return (
    <div
      data-loader-panel
      role="dialog"
      aria-modal="true"
      aria-labelledby="page-loader-title"
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-brand-navy text-white"
    >
      <span
        id="page-loader-title"
        className="font-heading text-xl tracking-[0.1em] uppercase"
      >
        {SITE_NAME}
      </span>
      <div
        role="progressbar"
        aria-label="Loading"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-px w-40 overflow-hidden bg-white/15"
      >
        <div className="h-full bg-white" style={{ width: `${percent}%` }} />
      </div>
      <span aria-hidden className="label-caps text-white/50">
        {percent}%
      </span>
      <button
        ref={skipButtonRef}
        type="button"
        onClick={() => finishRef.current()}
        className="label-caps absolute right-6 bottom-6 border border-white/30 px-4 py-2 text-white/70 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
      >
        Skip Intro
      </button>
    </div>
  );
}
