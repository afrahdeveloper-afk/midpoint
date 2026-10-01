"use client";
import { useRef } from "react";
import { BrandPair } from "@/components/media/Logo";
import { BRANDS } from "@/data/brands";
import { T } from "@/data/translations";
import { bodyClass, emit, persist, setShared } from "@/lib/store";
import { prefersReduced, useIsoLayoutEffect, useLocale } from "@/lib/hooks";

/**
 * Preloader: real progress (DOM ready → fonts → window load), a minimum display time of 1.5 s,
 * then the slab exit. Shown only on desktop, on the first visit of the session; phones/tablets
 * and repeat visits skip it (decided before paint — see lib/preloader-mode.ts).
 * Runs once per page load; remounts (language switch) skip straight to "loaded".
 */
export function Preloader() {
  const locale = useLocale();
  const L = T[locale];
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const num = useRef<HTMLElement>(null);
  const txt = useRef<HTMLSpanElement>(null);
  const done = persist.preloaderDone;

  useIsoLayoutEffect(() => {
    if (persist.preloaderDone) {
      bodyClass("loading", false);
      bodyClass("loaded", true);
      setShared({ loaded: true });
      return;
    }
    const ld = root.current!;
    // No preloader (phone/tablet, or already seen this session): hand over immediately.
    if (document.documentElement.classList.contains("np")) {
      ld.classList.add("out", "gone");
      ld.setAttribute("aria-live", "off");
      bodyClass("loading", false);
      bodyClass("loaded", true);
      persist.preloaderDone = true;
      persist.heroStarted = true;
      setShared({ loaded: true });
      document.getElementById("main")?.setAttribute("aria-busy", "false");
      emit("heroStart");
      return;
    }
    const reduce = prefersReduced();
    bodyClass("loading", true);
    try {
      sessionStorage.setItem("mp-seen", "1");
    } catch {}
    const MIN = reduce ? 0 : 1500;
    const t0 = performance.now();
    let target = 35, shown = 0, finished = false, raf = 0;
    const timers: number[] = [];
    const bump = (v: number) => {
      target = Math.max(target, v);
    };
    const onDom = () => bump(60);
    const onLoad = () => bump(100);
    if (document.readyState !== "loading") bump(60);
    else document.addEventListener("DOMContentLoaded", onDom);
    if (document.fonts?.ready) document.fonts.ready.then(() => bump(85));
    else bump(85);
    if (document.readyState === "complete") bump(100);
    else addEventListener("load", onLoad);
    timers.push(window.setTimeout(() => bump(100), 5000)); // never hold the page hostage

    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(200, now - last);
      last = now;
      const cap = now - t0 < MIN ? Math.min(target, 20 + (80 * (now - t0)) / Math.max(MIN, 1)) : target;
      shown += Math.max(dt * 0.06, (cap - shown) * (1 - Math.exp(-dt / 90)));
      if (shown > cap) shown = cap;
      if (bar.current) bar.current.style.transform = `scaleX(${shown / 100})`;
      if (num.current) num.current.textContent = String(Math.round(shown));
      if (shown >= 100 && !finished) {
        finished = true;
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    function finish() {
      if (txt.current) txt.current.textContent = T[locale].ready;
      timers.push(
        window.setTimeout(() => {
          ld.classList.add("out");
          ld.setAttribute("aria-live", "off");
          timers.push(
            window.setTimeout(() => {
              bodyClass("loading", false);
              bodyClass("loaded", true);
              persist.preloaderDone = true;
              setShared({ loaded: true });
            }, reduce ? 0 : 420),
          );
          timers.push(
            window.setTimeout(() => {
              persist.heroStarted = true;
              emit("heroStart");
            }, reduce ? 0 : 900),
          );
          timers.push(
            window.setTimeout(() => {
              ld.classList.add("gone");
              document.getElementById("main")?.setAttribute("aria-busy", "false");
            }, reduce ? 250 : 1500),
          );
        }, reduce ? 0 : 220),
      );
    }
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.removeEventListener("DOMContentLoaded", onDom);
      removeEventListener("load", onLoad);
    };
  }, [locale]);

  return (
    <div className={done ? "loader out gone" : "loader"} ref={root} role="status" aria-live={done ? "off" : "polite"}>
      <div className="ld-slabs" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      <div className="ld-center" aria-hidden="true">
        <BrandPair className="pair ld-pair" decorative preload />
        <p className="ld-tag">{L.tagline}</p>
        <div className="ld-line"><i ref={bar}></i></div>
      </div>
      <div className="ld-foot">
        <span className="ld-brands" aria-hidden="true" dir="ltr">{BRANDS.map((b) => b.n).join("  ·  ")}</span>
        <span className="ld-meter">
          <span className="ld-txt" ref={txt}>{L.loading}</span>
          <span className="ld-num" aria-hidden="true"><b ref={num}>0</b><small>%</small></span>
        </span>
      </div>
    </div>
  );
}
