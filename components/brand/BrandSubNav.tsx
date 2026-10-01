"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Logo } from "@/components/media/Logo";
import { IcExt } from "@/components/icons";
import { SecLink } from "@/components/nav/Links";
import { BRANDS } from "@/data/brands";
import { LOGOS, MARKS } from "@/data/logos";
import { T } from "@/data/translations";
import { prefersReduced, useLocale } from "@/lib/hooks";
const TABS = ["bpAbout", "bpLinesSec", "bpBandSec"] as const;

/**
 * Brand sub-navigation, fixed under the header and always visible; the active tab follows
 * the scroll position (the original bpSubCheck).
 */
export function BrandSubNav({ k }: { k: number }) {
  const L = T[useLocale()];
  const b = BRANDS[k];
  const [act, setAct] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const check = () => {
      ticking.current = false;
      let a = 0;
      TABS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.4) a = i;
      });
      setAct(a);
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(check);
    };
    addEventListener("scroll", onScroll, { passive: true });
    const raf = requestAnimationFrame(check);
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id)!;
    scrollTo({ top: el.getBoundingClientRect().top + scrollY - 130, behavior: prefersReduced() ? "auto" : "smooth" });
  };

  return (
    <div className="bp-sub on" id="bpSub">
      <div className="bp-sub-in">
        <SecLink sec="home" className="bp-sub-home" aria-label="Midpoint">
          <Image src={MARKS.wordmark.src} width={MARKS.wordmark.w} height={MARKS.wordmark.h} alt="" unoptimized />
        </SecLink>
        <div className="bp-sub-tabs" role="tablist">
          {TABS.map((id, i) => (
            <button key={id} type="button" role="tab" data-go={id} aria-selected={i === act} onClick={() => go(id)}>
              {L[`bp_t${(i + 1) as 1 | 2 | 3}`]}
            </button>
          ))}
        </div>
        <a className="bp-sub-brand" href={b.url} target="_blank" rel="noopener" aria-label={`${b.n}: ${L.br_site}`} title={L.br_site}>
          {LOGOS[b.n] ? <Logo name={b.n} slug={b.slug} /> : <span dir="ltr">{b.n}</span>}
          <IcExt />
        </a>
      </div>
    </div>
  );
}
