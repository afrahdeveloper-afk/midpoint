"use client";
import { useEffect, useRef, useState } from "react";
import { BrandHero } from "./BrandHero";
import { BrandSubNav } from "./BrandSubNav";
import { BrandMark } from "./BrandMark";
import { Media } from "@/components/media/Media";
import { BrandTimeline } from "./BrandTimeline";
import { LineMedia } from "./LineMedia";
import { GalleryLightbox } from "./GalleryLightbox";
import { brandSlides } from "./slides";
import { Logo } from "@/components/media/Logo";
import { FACT_PATHS, IcArrow, IcArrowL, IcExt, IcPin, IcWa } from "@/components/icons";
import { OpenStatus } from "@/components/chrome/Header";
import { BrandLink, SecLink } from "@/components/nav/Links";
import { BRANDS } from "@/data/brands";
import { BDATA } from "@/data/brand-details";
import { LOGOS } from "@/data/logos";
import { PRODUCTS } from "@/data/products";
import { T } from "@/data/translations";
import { SITE, waLink } from "@/data/site";
import { pad2, useIsoLayoutEffect, useLocale } from "@/lib/hooks";
import { useGoBrand, useGoHome, wipe } from "@/lib/nav";
import { bodyClass, emit, getShared, persist } from "@/lib/store";

/** About text: the first sentence becomes the large lead, the rest the body. */
function splitLead(text: string): [string, string] {
  const m = /[.!?؟](\s+)/.exec(text);
  return m && m.index < text.length - 2 ? [text.slice(0, m.index + 1), text.slice(m.index + 1 + m[1].length)] : [text, ""];
}

/**
 * In Arabic, wrap Latin runs (names, slogans: "It's time to create, it's time of AB") in an LTR
 * <bdi> so the bidi algorithm doesn't reorder their words and punctuation.
 */
function isolateLatin(text: string, locale: string): React.ReactNode {
  if (locale !== "ar") return text;
  return text.split(/([A-Za-z][A-Za-z0-9'’&×+.,\- ]*[A-Za-z0-9+])/).map((part, i) => (i % 2 ? <bdi key={i} dir="ltr">{part}</bdi> : part));
}

/* line cards: all the same size (3 columns ≥1080px, 2 ≥640px, 1 on phones) */
const LINE_SIZES = "(min-width: 1080px) 33vw, (min-width: 640px) 50vw, 100vw";

export function BrandPage({ k }: { k: number }) {
  const locale = useLocale();
  const L = T[locale];
  const b = BRANDS[k], d = BDATA[b.slug];
  const goBrand = useGoBrand();
  const goHome = useGoHome();
  const [langSwitch] = useState(() => persist.langSwitch);
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const slides = brandSlides(d);
  const rail = useRef<HTMLElement>(null);

  /* entering a brand page (the original route() swap) */
  useIsoLayoutEffect(() => {
    bodyClass("on-brand", true);
    emit("showHeader");
    if (wipe.covered) emit("wipe", "uncover");
    // direct load without the preloader: keep the section's arrival fade off (see lib/preloader-mode.ts)
    if (document.documentElement.classList.contains("np-boot")) document.getElementById("bp")?.style.setProperty("animation", "none");
    return () => void bodyClass("on-brand", false);
  }, []);
  useEffect(() => {
    if (langSwitch) return;
    // centre the current brand in the rail (horizontal only), measured after the first frame
    const raf = requestAnimationFrame(() => {
      const r = rail.current, a = r?.querySelector<HTMLElement>('[aria-current="page"]');
      if (!r || !a) return;
      const rr = r.getBoundingClientRect(), ar = a.getBoundingClientRect();
      r.scrollBy({ left: ar.left + ar.width / 2 - (rr.left + rr.width / 2), behavior: "instant" });
    });
    const t = setTimeout(() => document.getElementById("bpName")?.focus({ preventScroll: true }), 60);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [langSwitch]);

  /* ← / → switch brand (direction follows the reading order) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = getShared();
      if (s.menuOpen || s.drOpen || s.waOpen || document.querySelector("#bpLb[open]")) return;
      if (/INPUT|TEXTAREA|SELECT/.test((document.activeElement as HTMLElement | null)?.tagName ?? "")) return;
      const ar = document.documentElement.dir === "rtl";
      const fwd = ar ? "ArrowLeft" : "ArrowRight", back = ar ? "ArrowRight" : "ArrowLeft";
      if (e.key === fwd) goBrand(BRANDS[(k + 1) % BRANDS.length].slug);
      if (e.key === back) goBrand(BRANDS[(k - 1 + BRANDS.length) % BRANDS.length].slug);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [k, goBrand]);

  const quote = () => goHome("contact", { type: "prefill", brand: k + 1, msg: `${L.px_q_msg} ${b.n}` });
  const seeCategory = () => goHome("products", { type: "openDrawer", i: d.cat, delay: 350 });

  const facts: [string, string][] = [[L.f_country, b[locale][0]]];
  if (d.year) facts.push([L.f_year, d.year]);
  else if (d.hq) facts.push([L.f_hq, d.hq[locale === "ar" ? 1 : 0]]);
  facts.push([L.f_spec, PRODUCTS[d.cat][locale].t], [L.f_iraq, L.f_iraq_v]);

  const rel = BRANDS.map((_, i) => i)
    .filter((i) => (i !== k && BDATA[BRANDS[i].slug].cat === d.cat) || (i !== k && BRANDS[i].cat === b.cat))
    .filter((v, i, a) => a.indexOf(v) === i);
  const p = (k - 1 + BRANDS.length) % BRANDS.length, n = (k + 1) % BRANDS.length;
  // the original forced transform:none on these (no RTL flip: the arrow itself is chosen per locale)
  const arrR = <IcArrow style={{ transform: "none" }} />, arrL = <IcArrowL style={{ transform: "none" }} />;
  const prevIco = locale === "ar" ? arrR : arrL, nextIco = locale === "ar" ? arrL : arrR;
  const [p2a, p2b] = L.bp_about_p2.split("{b}");
  const [lead, rest] = splitLead(d[locale]);
  const cat = PRODUCTS[d.cat][locale];

  return (
    <>
      <BrandSubNav k={k} />
      <GalleryLightbox k={k} slides={slides} index={lbIndex} onChange={setLbIndex} />
      <main>
        <section className="bp" id="bp" aria-labelledby="bpName" style={langSwitch ? { animation: "none" } : undefined}>
          <BrandHero k={k} slides={slides} onOpenGallery={setLbIndex} />
          <nav className="bp-rail" id="bpRail" aria-label={L.bp_rail} ref={rail}>
            {BRANDS.map((x, i) => (
              <BrandLink key={x.slug} slug={x.slug} aria-current={i === k ? "page" : undefined} aria-label={x.n}>
                {LOGOS[x.n] ? <Logo name={x.n} /> : x.n}
              </BrandLink>
            ))}
          </nav>
          <dl className="bp-facts" id="bpFacts">
            {facts.map((f, i) => (
              <div key={f[0]}>
                <dt>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{FACT_PATHS[i] || FACT_PATHS[3]}</svg>
                  {f[0]}
                </dt>
                <dd>{f[1]}</dd>
              </div>
            ))}
          </dl>
          <section className="bp-about" id="bpAbout" aria-labelledby="bpAboutH">
            <div className="bpa-head">
              <p className="kicker">{L.bp_about_k}</p>
              <h2 id="bpAboutH">{L.bp_about_h} <BrandMark k={k} /></h2>
            </div>
            <div className="bpa-body">
              <p className="bpa-lead" id="bpAboutP">{isolateLatin(lead, locale)}</p>
              {rest.split(/\n\n+/).filter(Boolean).map((para, j) => <p key={j} className="bpa-text">{isolateLatin(para, locale)}</p>)}
              <p className="bpa-tags-k">{L.bp_lines_k}</p>
              <ul className="bpa-tags" id="bpAboutTags">{b.tg[locale].map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <aside className="bpa-card">
              <span className="bpa-card-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{FACT_PATHS[3]}</svg></span>
              <p className="bpa-p" id="bpAboutP2">{p2a}<span dir="ltr">{b.n}</span>{p2b}</p>
              <div className="bpa-card-act">
                <a className="btn solid-dark" href={waLink(`${L.bp_wa} ${b.n}`)} target="_blank" rel="noopener"><IcWa full={false} /><span>WhatsApp</span></a>
                <a className="link-arrow" id="bpAboutSite" href={b.url} target="_blank" rel="noopener"><span>{L.br_site}</span><IcExt /></a>
              </div>
            </aside>
          </section>
          <BrandTimeline k={k} />
          <div className="bp-sec" id="bpLinesSec">
            <div className="bp-head">
              <p className="kicker">{L.bp_lines_k}</p>
              <h2 id="bpLinesH">{L.bp_lines_h} <BrandMark k={k} /></h2>
            </div>
            <ul className="bp-lines" id="bpLines">
              {d.lines.map((l, i) => {
                const title = locale === "ar" ? l[2] : l[0];
                return (
                  <li key={i} className="bp-line" style={{ animationDelay: `${0.1 + i * 0.07}s` }}>
                    <LineMedia
                      keys={[d.mats[i % d.mats.length], ...(d.extra ?? []).filter(([, li]) => li === i).map(([key]) => key)]}
                      seed={1200 + k * 31 + i * 7}
                      sizes={LINE_SIZES}
                      label={`${L.bp_zoom}: ${title}`}
                      onOpen={(key) => {
                        const at = slides.findIndex((s) => s.key === key);
                        if (at >= 0) setLbIndex(at);
                      }}
                    />
                    {/* .ln-b, not .lb: that class belongs to the lightbox dialog (display:none) */}
                    <div className="ln-b">
                      <span className="ln-n">{pad2(i + 1)}</span>
                      <h3>{title}</h3>
                      <p>{locale === "ar" ? l[3] : l[1]}</p>
                      <a className="ln-ask" target="_blank" rel="noopener" href={waLink(`${L.bp_wa} ${b.n}: ${title}`)}>
                        <IcWa full={false} />
                        <span>{L.bp_ask_line}</span>
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
            {/* the brand's category: a card opening the category drawer on the home page */}
            <button className="bp-cat" type="button" id="bpCat" onClick={seeCategory} aria-label={`${L.bp_cat}: ${cat.t}`}>
              <span className="cat-img" aria-hidden="true">
                <Media k={PRODUCTS[d.cat].mat} seed={1900 + d.cat * 13} sizes="(min-width: 760px) 34vw, 100vw" />
              </span>
              <span className="cat-b">
                <span className="cat-k">{L.bp_cat}</span>
                <span className="cat-t">{cat.t}</span>
                <span className="cat-s">{cat.s}</span>
                <span className="cat-u">
                  {cat.u.slice(0, 4).map((x) => <span key={x}>{x}</span>)}
                </span>
                <span className="cat-f">
                  <span className="cat-n">{cat.n}</span>
                  <span className="cat-go" aria-hidden="true"><IcArrow /></span>
                </span>
              </span>
            </button>
          </div>
          <div className="bp-rel" id="bpRelWrap" hidden={!rel.length}>
            <p className="kicker">{L.bp_rel}</p>
            <ul className="bp-rel-list" id="bpRel">
              {rel.map((i) => {
                const r = BRANDS[i], rd = BDATA[r.slug];
                return (
                  <li key={i}>
                    <BrandLink slug={r.slug} className="rel-card">
                      <span className="rel-img" aria-hidden="true">
                        <Media k={rd.hero || rd.mats[0]} seed={1500 + i * 7} sizes="(min-width: 1080px) 25vw, (min-width: 640px) 50vw, 100vw" />
                        <span className="rel-logo">{LOGOS[r.n] ? <Logo name={r.n} slug={r.slug} /> : <b dir="ltr">{r.n}</b>}</span>
                      </span>
                      <span className="rel-b">
                        <span className="rel-n" dir="ltr">{r.n}</span>
                        <span className="rel-m">{r[locale][0]} · {r[locale][1]}</span>
                      </span>
                      <span className="rel-go" aria-hidden="true"><IcArrow /></span>
                    </BrandLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="bp-band" id="bpBandSec">
            <div className="band-img" aria-hidden="true">
              <Media k={d.hero || d.mats[0]} seed={1700 + k * 11} sizes="(min-width: 900px) 45vw, 100vw" />
            </div>
            <div className="band-b">
              <h2 id="bpBandH">{L.bp_band_h} <BrandMark k={k} dark /></h2>
              <p className="band-p">{L.bp_band_p}</p>
              <ul className="band-info">
                <li>
                  <IcPin />
                  <span><small>{L.c_address}</small><a href={SITE.maps} target="_blank" rel="noopener">{L.address}</a></span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
                  <span><small>{L.c_hours}</small><span className="band-hours">{L.hours}<OpenStatus className="status band-status" /></span></span>
                </li>
              </ul>
              <div className="bp-band-act">
                <button className="btn solid-dark" type="button" id="bpQuote" onClick={quote}>{L.px_quote}<IcArrow className="band-arr" /></button>
                <a className="btn line" id="bpWa" href={waLink(`${L.bp_wa} ${b.n}`)} target="_blank" rel="noopener"><IcWa full={false} /><span>WhatsApp</span></a>
              </div>
            </div>
          </div>
          <nav className="bp-pn" id="bpPn" aria-label="Brands">
            <BrandLink slug={BRANDS[p].slug}>
              <small>{prevIco}{L.bp_prev}</small>
              {LOGOS[BRANDS[p].n] ? <Logo name={BRANDS[p].n} alt={BRANDS[p].n} slug={BRANDS[p].slug} /> : <b dir="ltr">{BRANDS[p].n}</b>}
            </BrandLink>
            <BrandLink slug={BRANDS[n].slug}>
              <small>{L.bp_next}{nextIco}</small>
              {LOGOS[BRANDS[n].n] ? <Logo name={BRANDS[n].n} alt={BRANDS[n].n} slug={BRANDS[n].slug} /> : <b dir="ltr">{BRANDS[n].n}</b>}
            </BrandLink>
          </nav>
          <div className="bp-all">
            <SecLink
              sec="brands"
              className="link-arrow"
              id="bpBack"
              onClick={(e) => {
                e.preventDefault();
                goHome("brands", { type: "selectBrand", k });
              }}
            >
              <span>{L.bp_all}</span>
              <IcArrow />
            </SecLink>
          </div>
        </section>
      </main>
    </>
  );
}
