"use client";
import { useEffect, useRef, useState } from "react";
import { Media } from "@/components/media/Media";
import { Logo, LogoOr } from "@/components/media/Logo";
import { IcArrow, IcWa } from "@/components/icons";
import { BrandLink } from "@/components/nav/Links";
import { BRANDS } from "@/data/brands";
import { LOGOS } from "@/data/logos";
import { T } from "@/data/translations";
import { waLink } from "@/data/site";
import { pad2, useLocale } from "@/lib/hooks";
import { useGoHome } from "@/lib/nav";
import { takeIntent } from "@/lib/store";
import { useReveal } from "@/lib/reveal";

const mono = (n: string) =>
  n.split(/\s+/).filter((w) => w.length > 1).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
/** Tags shown on a card; the rest are summed up as "+n". */
const TAGS_SHOWN = 2;

/** The brands page (/[locale]/brands): a card per brand, then the closing call to action. */
export function BrandsSection() {
  const locale = useLocale();
  const L = T[locale];
  const goHome = useGoHome();
  const [hl, setHl] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const root = useRef<HTMLElement>(null);
  useReveal("brands", root);

  /* back from a brand page ("All brands"): scroll to the card we came from and flash it */
  useEffect(() => {
    const it = takeIntent("selectBrand");
    if (!it) return;
    const t = window.setTimeout(() => {
      setHl(it.k);
      cards.current[it.k]?.scrollIntoView({ block: "center", behavior: "instant" });
    }, 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="sec brands" id="brands" ref={root}>
      {/* no visible heading or filters: the brand cards open the page; the h1 stays for screen readers and search */}
      <h1 className="sr">{L.nav_brands}</h1>
      {/* opening frame (navy, attached to the header): the partnership line, then the band of logo
          tiles gliding past (pauses on hover / focus / the button at its end) */}
      <div className="br-hero">
        <div className="br-hero-in rv">
          <p className="br-lead">{L.tagline}</p>
        </div>
        <div className="br-band">
          <div className={"br-mq" + (paused ? " paused" : "")} role="region" aria-label={L.mq_label}>
            <div className="br-mq-track">
              {[false, true].flatMap((dup) =>
                BRANDS.map((b) => (
                  <BrandLink key={`${dup}-${b.slug}`} slug={b.slug} className="br-mq-tile" aria-label={b.n} aria-hidden={dup || undefined} tabIndex={dup ? -1 : undefined}>
                    {LOGOS[b.n] ? <Logo name={b.n} slug={b.slug} /> : b.n}
                  </BrandLink>
                )),
              )}
            </div>
          </div>
          <button className="br-mq-btn" type="button" aria-pressed={paused} aria-label={paused ? L.mq_play : L.mq_pause} onClick={() => setPaused(!paused)}>
            <svg className="i-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3" height="14" /><rect x="14" y="5" width="3" height="14" /></svg>
            <svg className="i-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
          </button>
        </div>
      </div>
      <ul className="bc-grid">
        {BRANDS.map((b, i) => {
          const tags = b.tg[locale];
          return (
            <li key={b.slug} style={{ "--k": i } as React.CSSProperties}>
              <BrandLink
                slug={b.slug}
                className={"bc-card" + (hl === i ? " hl" : "")}
                ref={(el: HTMLAnchorElement | null) => void (cards.current[i] = el)}
                onAnimationEnd={(e) => e.animationName === "bcFlash" && setHl(null)}
              >
                <span className="bc-img" aria-hidden="true">
                  <Media k={b.mat} seed={100 + i * 7} sizes="(min-width: 1080px) 26vw, (min-width: 640px) 46vw, 92vw" />
                  <span className="bc-idx">{pad2(i + 1)}</span>
                  <span className="bc-cc">{b[locale][0]}</span>
                </span>
                <span className={"bc-logo" + (LOGOS[b.n] ? " has-logo" : "")}><LogoOr name={b.n} fallback={mono(b.n)} /></span>
                <span className="bc-body">
                  <b className="bc-name" dir="ltr">{b.n}</b>
                  <span className="bc-sub">{b[locale][1]}</span>
                  <span className="bc-tags">
                    {tags.slice(0, TAGS_SHOWN).map((t) => <i key={t}>{t}</i>)}
                    {tags.length > TAGS_SHOWN && <i className="more" dir="ltr">{`+${tags.length - TAGS_SHOWN}`}</i>}
                  </span>
                  <span className="bc-go">{L.br_more}<IcArrow /></span>
                </span>
              </BrandLink>
            </li>
          );
        })}
      </ul>
      <div className="page-cta rv">
        <div>
          <h2>{L.br_cta_t}</h2>
          <p>{L.br_cta_p}</p>
        </div>
        <div className="page-cta-act">
          <button type="button" className="btn solid" onClick={() => goHome("contact")}>{L.cta_contact}<IcArrow /></button>
          <a className="btn ghost" href={waLink(L.br_cta_wa)} target="_blank" rel="noopener"><IcWa full={false} /><span>WhatsApp</span></a>
        </div>
      </div>
    </section>
  );
}
