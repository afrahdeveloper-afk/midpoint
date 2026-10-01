"use client";
import { useEffect, useRef, useState } from "react";
import { IcNext, IcPrev } from "@/components/icons";
import { BrandMark } from "./BrandMark";
import { BRANDS } from "@/data/brands";
import { BDATA } from "@/data/brand-details";
import { T } from "@/data/translations";
import { prefersReduced, useLocale } from "@/lib/hooks";
import { addInstant } from "@/lib/reveal";
import { persist } from "@/lib/store";

const GAP = 24; // .tl-track gap

/**
 * Heritage timeline: a horizontal, scroll-snapped track (drag with the mouse, swipe on touch),
 * prev/next buttons, a progress line and a staggered reveal once in view. Nothing without `tl`.
 */
export function BrandTimeline({ k }: { k: number }) {
  const locale = useLocale();
  const L = T[locale];
  const ar = locale === "ar";
  const b = BRANDS[k], tl = BDATA[b.slug].tl ?? [];
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* progress line + button state, and mouse drag-to-scroll */
  useEffect(() => {
    const tr = track.current;
    if (!tr) return;
    let raf = 0;
    const update = () => {
      // scrollLeft runs from 0 to negative in RTL
      const max = tr.scrollWidth - tr.clientWidth, x = Math.abs(tr.scrollLeft);
      fill.current!.style.transform = `scaleX(${Math.max(0.08, max > 0 ? x / max : 1)})`;
      setAtStart(x < 4);
      setAtEnd(x > max - 4);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    let down = false, sx = 0, sl = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      sx = e.clientX;
      sl = tr.scrollLeft;
      tr.classList.add("drag");
    };
    const onMove = (e: PointerEvent) => {
      if (down) tr.scrollLeft = sl - (e.clientX - sx);
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      tr.classList.remove("drag");
    };
    tr.addEventListener("scroll", schedule, { passive: true });
    tr.addEventListener("pointerdown", onDown);
    addEventListener("pointermove", onMove);
    addEventListener("pointerup", onUp);
    addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(raf);
      tr.removeEventListener("scroll", schedule);
      tr.removeEventListener("pointerdown", onDown);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerup", onUp);
      removeEventListener("resize", schedule);
    };
  }, []);

  /* reveal once 25% visible; shown at once if already revealed for this brand (e.g. a language switch) */
  useEffect(() => {
    const el = sec.current;
    if (!el) return;
    const id = `bpTl:${b.slug}`;
    if (persist.seenIds.has(id)) return addInstant(el, "seen");
    if (!("IntersectionObserver" in window)) return void el.classList.add("seen");
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((en) => en.isIntersecting)) return;
        el.classList.add("seen");
        persist.seenIds.add(id);
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [b.slug]);

  /** One card forward (+1) or back (-1) in reading order. */
  const step = (dir: 1 | -1) => {
    const tr = track.current!;
    const w = (tr.querySelector<HTMLElement>(".tl-item")?.offsetWidth ?? 300) + GAP;
    tr.scrollBy({ left: dir * w * (ar ? -1 : 1), behavior: prefersReduced() ? "auto" : "smooth" });
  };

  if (!tl.length) return null;

  return (
    <section className="bp-tl" id="bpTl" aria-labelledby="bpTlH" ref={sec}>
      <div className="tl-head">
        <div>
          <p className="kicker">{L.tl_k}</p>
          <h2 id="bpTlH">{L.tl_h} <BrandMark k={k} dark /></h2>
        </div>
        <div className="tl-nav">
          <button className="arrow" type="button" id="tlPrev" aria-label={L.prev} disabled={atStart} onClick={() => step(-1)}><IcPrev /></button>
          <button className="arrow" type="button" id="tlNext" aria-label={L.next} disabled={atEnd} onClick={() => step(1)}><IcNext /></button>
        </div>
      </div>
      <div className="tl-wrap">
        <div className="tl-line" aria-hidden="true"><i id="tlFill" ref={fill}></i></div>
        <ol className="tl-track" id="tlTrack" ref={track}>
          {tl.map((x, i) => (
            <li key={i} className="tl-item" style={{ ["--i" as string]: i }}>
              <span className="tl-dot" aria-hidden="true"></span>
              <b className="tl-year" dir="ltr">{x[0]}</b>
              <h3>{ar ? x[3] : x[1]}</h3>
              <p>{ar ? x[4] : x[2]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
