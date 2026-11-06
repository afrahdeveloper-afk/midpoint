"use client";
import { useEffect, useRef, useState } from "react";
import { Media } from "@/components/media/Media";
import { LogoOr } from "@/components/media/Logo";
import { IcArrow, IcWa } from "@/components/icons";
import { BrandLink } from "@/components/nav/Links";
import { BRANDS, type Brand, type BrandCat } from "@/data/brands";
import { LOGOS } from "@/data/logos";
import { T } from "@/data/translations";
import { waLink } from "@/data/site";
import { pad2, useLocale } from "@/lib/hooks";
import { useGoHome } from "@/lib/nav";
import { persist, remember, takeIntent } from "@/lib/store";
import { useReveal } from "@/lib/reveal";

type Cat = "all" | BrandCat;
const CATS: Cat[] = ["all", "surf", "tile", "bath", "mosaic"];
const mono = (n: string) =>
  n.split(/\s+/).filter((w) => w.length > 1).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
const inCat = (b: Brand, c: Cat) => c === "all" || b.cat === c;
/** Tags shown on a card; the rest are summed up as "+n". */
const TAGS_SHOWN = 2;

/** The brands page (/[locale]/brands): heading, category sidebar, a card per brand, closing call to action. */
export function BrandsSection() {
  const locale = useLocale();
  const L = T[locale];
  const goHome = useGoHome();
  const [cat, setCatState] = useState<Cat>(() => persist.brands.cat as Cat);
  const [hl, setHl] = useState<number | null>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const root = useRef<HTMLElement>(null);
  useReveal("brands", root);

  const setCat = (c: Cat) => {
    remember("brands", { cat: c });
    setCatState(c);
  };

  /* back from a brand page ("All brands"): show every brand, scroll to the one we came from and flash it */
  useEffect(() => {
    const it = takeIntent("selectBrand");
    if (!it) return;
    const t = window.setTimeout(() => {
      setCatState("all");
      setHl(it.k);
      cards.current[it.k]?.scrollIntoView({ block: "center", behavior: "instant" });
    }, 40);
    return () => clearTimeout(t);
  }, []);

  const list = BRANDS.map((b, i) => [b, i] as const).filter(([b]) => inCat(b, cat));
  const groups: Cat[][] = [["all"], CATS.slice(1)];

  return (
    <section className="sec brands" id="brands" ref={root}>
      <div className="sec-head rv">
        <div><p className="kicker">{L.nav_brands}</p><h1>{L.brands_h}</h1></div>
        <p>{L.brands_p}</p>
      </div>
      <div className="side-body">
        <aside className="side-filter rv" aria-label={L.br_filter}>
          <div className="chips" id="bxChips">
            {groups.map((items, gi) => (
              <div key={gi} className="side-fg" role="group" aria-labelledby={gi ? "bxFh" : undefined}>
                {gi > 0 && <h2 className="side-fh" id="bxFh">{L.br_filter}</h2>}
                {items.map((c) => (
                  <button key={c} className="chip" type="button" data-cat={c} aria-pressed={c === cat} onClick={() => setCat(c)}>
                    {L[`br_${c}`]}
                    <small>{c === "all" ? BRANDS.length : BRANDS.filter((x) => x.cat === c).length}</small>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <p className="px-count" id="bxCount" aria-live="polite">{`${list.length} ${list.length === 1 ? L.br_n1 : L.br_n}`}</p>
        </aside>
        {/* keyed by category so the cards replay their staggered entrance on every change */}
        <ul className="bc-grid" key={cat}>
          {list.map(([b, i], k) => {
            const tags = b.tg[locale];
            return (
              <li key={b.slug} style={{ "--k": k } as React.CSSProperties}>
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
      </div>
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
