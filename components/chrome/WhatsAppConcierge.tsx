"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { IcWaSolid } from "@/components/icons";
import { OpenStatus } from "./Header";
import { MARKS } from "@/data/logos";
import { T } from "@/data/translations";
import { SITE, waLink } from "@/data/site";
import { prefersReduced, useIsoLayoutEffect, useLocale } from "@/lib/hooks";
import { persist, setShared } from "@/lib/store";

/**
 * Floating WhatsApp button + concierge popover (topic chips → pre-filled chat).
 * Classes on .wa-float are toggled imperatively, like the original, because they
 * are driven by scroll position and a two-step open animation.
 */
export function WhatsAppConcierge() {
  const L = T[useLocale()];
  const root = useRef<HTMLDivElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const fab = useRef<HTMLButtonElement>(null);
  const badge = useRef<HTMLSpanElement>(null);
  const openRef = useRef(false);
  const [open, setOpenState] = useState(false);
  const [topic, setTopic] = useState(-1);

  const setWa = (o: boolean) => {
    const waF = root.current!, p = pop.current!;
    openRef.current = o;
    setOpenState(o);
    setShared({ waOpen: o });
    if (o) {
      p.hidden = false;
      void p.offsetWidth; // make the popover's start state render before animating in
      requestAnimationFrame(() => waF.classList.add("open"));
      badge.current?.classList.remove("on");
      try {
        sessionStorage.setItem("mp-wa", "1");
      } catch {}
      setTimeout(() => document.getElementById("waClose")?.focus(), 80);
    } else {
      waF.classList.remove("open");
      setTimeout(() => {
        if (!openRef.current) p.hidden = true;
      }, prefersReduced() ? 0 : 450);
    }
  };
  const setWaRef = useRef(setWa);
  useIsoLayoutEffect(() => {
    setWaRef.current = setWa;
  });

  useIsoLayoutEffect(() => {
    const waF = root.current!;
    const waCheck = () => waF.classList.toggle("wa-on", scrollY > innerHeight * 0.55);
    addEventListener("scroll", waCheck, { passive: true });
    waCheck();
    if (persist.waBadge) badge.current?.classList.add("on");
    let seen = false;
    try {
      seen = sessionStorage.getItem("mp-wa") === "1";
    } catch {}
    const t = !seen && !persist.waBadge
      ? window.setTimeout(() => {
          if (!openRef.current) {
            badge.current?.classList.add("on");
            persist.waBadge = true;
          }
        }, 6000)
      : 0;
    const onKey = (e: KeyboardEvent) => {
      if (openRef.current && e.key === "Escape") {
        setWaRef.current(false);
        fab.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (openRef.current && !waF.contains(e.target as Node)) setWaRef.current(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      removeEventListener("scroll", waCheck);
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      setShared({ waOpen: false });
    };
  }, []);

  const msg = topic < 0 ? L.wa_def : L.wa_msgs[topic];

  return (
    <div className="wa-float" id="waFloat" ref={root}>
      <div className="wa-pop" id="waPop" role="dialog" aria-modal="false" aria-labelledby="waTitle" hidden ref={pop}>
        <div className="wa-head">
          <span className="wa-av"><Image src={MARKS.heart.src} width={MARKS.heart.w} height={MARKS.heart.h} alt="" unoptimized /></span>
          <div className="wa-who">
            <b id="waTitle">Midpoint</b>
            <OpenStatus className="wa-st js-status" />
          </div>
          <button
            className="wa-x"
            type="button"
            id="waClose"
            aria-label={L.close}
            onClick={() => {
              setWa(false);
              fab.current?.focus();
            }}
          >
            <span className="x" aria-hidden="true"></span>
          </button>
        </div>
        <div className="wa-body">
          <div className="wa-bubble"><p>{L.wa_hi}</p><span className="wa-time">{L.wa_team}</span></div>
          <p className="wa-q">{L.wa_pick}</p>
          <div className="wa-chips" id="waChips" role="group">
            {L.wa_topics.map((x, i) => (
              <button key={i} type="button" aria-pressed={i === topic} style={{ animationDelay: `${0.25 + i * 0.05}s` }} onClick={() => setTopic(topic === i ? -1 : i)}>
                {x}
              </button>
            ))}
          </div>
        </div>
        <a className="wa-start" id="waStart" href={waLink(msg)} target="_blank" rel="noopener" onClick={() => setTimeout(() => setWa(false), 300)}>
          <IcWaSolid />
          <span>{L.wa_start}</span>
          <svg className="wa-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
        </a>
        <p className="wa-note" dir="ltr">{SITE.phoneDisplay}</p>
      </div>
      <button className="wa-fab" type="button" id="waFab" aria-expanded={open} aria-controls="waPop" aria-label={L.wa_float} ref={fab} onClick={() => setWa(!openRef.current)}>
        <span className="wa-ring" aria-hidden="true"></span>
        <span className="wa-ic"><IcWaSolid /></span>
        <span className="wa-lbl">{L.wa_float}</span>
        <span className="wa-badge" id="waBadge" aria-hidden="true" ref={badge}>1</span>
      </button>
    </div>
  );
}
