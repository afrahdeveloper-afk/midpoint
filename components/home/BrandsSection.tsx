"use client";
import { useEffect, useRef, useState } from "react";
import { Media } from "@/components/media/Media";
import { Logo, LogoOr } from "@/components/media/Logo";
import { IcArrow, IcChev, IcExt } from "@/components/icons";
import { BrandLink } from "@/components/nav/Links";
import { BRANDS, type Brand, type BrandCat } from "@/data/brands";
import { LOGOS } from "@/data/logos";
import { T } from "@/data/translations";
import { prefersReduced, useIsoLayoutEffect, useLocale } from "@/lib/hooks";
import { useGoBrand } from "@/lib/nav";
import { emit, on, persist, remember } from "@/lib/store";
import { useReveal } from "@/lib/reveal";

type Cat = "all" | BrandCat;
const CATS: Cat[] = ["all", "surf", "tile", "bath", "mosaic"];
const mono = (n: string) =>
  n.split(/\s+/).filter((w) => w.length > 1).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
const isDesk = () => matchMedia("(min-width:980px)").matches;
const inCat = (b: Brand, c: Cat) => c === "all" || b.cat === c;

/** "Ask about <brand>": pre-select it in the contact form and scroll there. */
export function askBrand(i: number) {
  const reduce = prefersReduced();
  emit("prefill", { brand: i + 1, focusDelay: reduce ? 0 : 700 });
  document.getElementById("contact")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

let layerId = 0;

export function BrandsSection() {
  const locale = useLocale();
  const L = T[locale];
  const goBrand = useGoBrand();

  const [cat, setCatState] = useState<Cat>(() => persist.brands.cat as Cat);
  const [sel, setSel] = useState(() => persist.brands.sel);
  const [shown, setShown] = useState(() => persist.brands.sel);
  const [swap, setSwap] = useState(false);
  const [open, setOpen] = useState(() => persist.brands.open);
  const [layers, setLayers] = useState(() => [{ id: ++layerId, i: persist.brands.sel, entering: false }]);
  const [filterNonce, setFilterNonce] = useState(0);

  const selRef = useRef(sel);
  const swapT = useRef(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const layerEls = useRef(new Map<number, HTMLDivElement>());
  const root = useRef<HTMLElement>(null);
  useReveal("brands", root);

  const select = (i: number, force = false, instant = false) => {
    if (i === selRef.current && !force) return;
    const changed = i !== selRef.current;
    selRef.current = i;
    remember("brands", { sel: i });
    setSel(i);
    if (instant || prefersReduced() || !changed) {
      clearTimeout(swapT.current);
      setLayers([{ id: ++layerId, i, entering: false }]);
      setShown(i);
      setSwap(false);
      return;
    }
    setLayers((ls) => [...ls, { id: ++layerId, i, entering: true }]);
    setTimeout(() => setLayers((ls) => ls.slice(-1)), 750);
    setSwap(true);
    clearTimeout(swapT.current);
    swapT.current = window.setTimeout(() => {
      setShown(i);
      setSwap(false);
    }, 220);
  };

  const setCat = (c: Cat, anim = true) => {
    remember("brands", { cat: c });
    setCatState(c);
    if (anim) setFilterNonce((n) => n + 1);
    // keep a visible selection (the original applyFilter)
    const cur = BRANDS[selRef.current];
    if (cur && !inCat(cur, c)) select(BRANDS.findIndex((b) => inCat(b, c)), true);
  };

  /* showcase wipe: new layer starts clipped (.sw.in), then opens */
  useIsoLayoutEffect(() => {
    const entering = layers.filter((l) => l.entering);
    if (!entering.length) return;
    entering.forEach((l) => void layerEls.current.get(l.id)?.offsetWidth);
    const raf = requestAnimationFrame(() => setLayers((ls) => ls.map((l) => (l.entering ? { ...l, entering: false } : l))));
    return () => cancelAnimationFrame(raf);
  }, [layers]);

  /* filter change: restart the staggered entrance of the visible rows */
  useIsoLayoutEffect(() => {
    if (!filterNonce) return;
    let n = 0;
    items.current.forEach((li, i) => {
      if (!li || !inCat(BRANDS[i], cat)) return;
      li.style.animation = "none";
      void li.offsetWidth;
      li.style.animation = "";
      li.style.animationDelay = n * 50 + "ms";
      n++;
    });
  }, [filterNonce]);

  /* back from a brand page ("All brands"): show every brand and select the one we came from */
  useEffect(
    () =>
      on("selectBrand", (k) => {
        setCat("all", false);
        select(k, true);
        items.current[k]?.scrollIntoView({ block: "center", behavior: "instant" });
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onBtnClick = (i: number) => {
    if (isDesk()) {
      select(i);
      return;
    }
    const o = open !== i;
    setOpen(o ? i : -1);
    remember("brands", { open: o ? i : -1 });
    select(i, true);
  };
  const onBtnKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const vis = BRANDS.map((b, k) => (inCat(b, cat) ? btns.current[k] : null)).filter(Boolean) as HTMLButtonElement[];
    const k = vis.indexOf(btns.current[i]!);
    vis[(k + (e.key === "ArrowDown" ? 1 : vis.length - 1)) % vis.length].focus();
  };

  const count = BRANDS.filter((b) => inCat(b, cat)).length;
  const b = BRANDS[shown];
  const mark = (x: Brand) => <LogoOr name={x.n} fallback={mono(x.n)} />;

  return (
    <section className="sec brands" id="brands" ref={root}>
      <div className="sec-head rv">
        <div><p className="kicker">{L.nav_brands}</p><h2>{L.brands_h}</h2></div>
        <p>{L.brands_p}</p>
      </div>
      <div className="marquee lg-mq" role="region" aria-label={L.mq_label}>
        <div className="mq-track" id="mq">
          {[false, true].flatMap((dup) =>
            BRANDS.map((x, i) => (
              <button
                key={`${dup}-${x.slug}`}
                className="mq-logo"
                type="button"
                data-b={i}
                aria-hidden={dup || undefined}
                tabIndex={dup ? -1 : undefined}
                aria-label={`${x.n}, ${x[locale][0]}`}
                onClick={() => goBrand(x.slug)}
              >
                <Logo name={x.n} />
                <span className="mq-tip">{x[locale][0]}</span>
              </button>
            )),
          )}
        </div>
      </div>
      <div className="bx-bar rv">
        <div className="chips" role="group" id="bxChips" aria-label={L.br_filter}>
          {CATS.map((c) => (
            <button key={c} className="chip" type="button" data-cat={c} aria-pressed={c === cat} onClick={() => setCat(c)}>
              {L[`br_${c}`]}
              <small>{c === "all" ? BRANDS.length : BRANDS.filter((x) => x.cat === c).length}</small>
            </button>
          ))}
        </div>
        <p className="bx-count" id="bxCount" aria-live="polite">{`${count} ${count === 1 ? L.br_n1 : L.br_n}`}</p>
      </div>
      <div className="bx rv">
        <aside className={"show" + (swap ? " swap" : "")} id="bxShow" aria-live="polite">
          <div className="show-mat" id="bxMat">
            {layers.map((l) => (
              <div
                key={l.id}
                className={"sw" + (l.entering ? " in" : "")}
                ref={(el) => {
                  if (el) layerEls.current.set(l.id, el);
                  else layerEls.current.delete(l.id);
                }}
              >
                <Media k={BRANDS[l.i].mat} seed={100 + l.i * 7} sizes="(min-width: 980px) 45vw, 100vw" />
              </div>
            ))}
          </div>
          <div className="show-body">
            <div className="show-top">
              <span className={"mono" + (LOGOS[b.n] ? " has-logo" : "")} id="bxMono">{mark(b)}</span>
              <div>
                <h3 id="bxName" dir="ltr">{b.n}</h3>
                <p className="show-meta" id="bxMeta">{b[locale][0]}</p>
              </div>
            </div>
            <p className="show-desc" id="bxDesc">{b[locale][1]}</p>
            <p className="show-lbl">{L.br_supply}</p>
            <ul className="tags" id="bxTags">{b.tg[locale].map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="show-act">
              <BrandLink slug={b.slug} className="btn solid-dark show-more" id="bxMore"><span>{L.br_more}</span><IcArrow /></BrandLink>
              <button className="btn line" type="button" id="bxAsk" onClick={() => askBrand(selRef.current)}>{`${L.br_ask} ${b.n}`}</button>
              <a className="btn line" id="bxVisit" href={b.url} target="_blank" rel="noopener"><span>{L.br_site}</span><IcExt /></a>
            </div>
            <p className="show-pos" aria-hidden="true" dir="ltr">{`${String(BRANDS.indexOf(b) + 1).padStart(2, "0")} / ${String(BRANDS.length).padStart(2, "0")}`}</p>
          </div>
        </aside>
        <ul className="bx-list" id="bxList">
          {BRANDS.map((x, i) => (
            <li
              key={x.slug}
              className={"bx-item" + (i === sel ? " sel" : "") + (i === open ? " open" : "")}
              data-i={i}
              hidden={!inCat(x, cat)}
              ref={(el) => void (items.current[i] = el)}
            >
              <button
                className="bx-btn"
                type="button"
                aria-expanded={i === open}
                aria-controls={`bxd${i}`}
                ref={(el) => void (btns.current[i] = el)}
                onMouseEnter={() => isDesk() && select(i)}
                onFocus={() => isDesk() && select(i)}
                onClick={() => onBtnClick(i)}
                onKeyDown={(e) => onBtnKey(e, i)}
              >
                <span className={"bx-mono" + (LOGOS[x.n] ? " has-logo" : "")} aria-hidden="true">{mark(x)}</span>
                <span>
                  <span className="bx-name" dir="ltr">{x.n}</span>
                  <span className="bx-sub">{x[locale][1]}</span>
                </span>
                <span className="bx-cc">{x[locale][0]}</span>
                <IcChev />
              </button>
              <div className="bx-det" id={`bxd${i}`}>
                <div>
                  <div className="bx-det-in">
                    <div className="mini" aria-hidden="true"><Media k={x.mat} seed={100 + i * 7} sizes="100vw" /></div>
                    <p>{L.br_supply}</p>
                    <ul className="tags">{x.tg[locale].map((t) => <li key={t}>{t}</li>)}</ul>
                    <div className="show-act">
                      <BrandLink slug={x.slug} className="btn solid-dark">{L.br_more}</BrandLink>
                      <button className="btn line" type="button" data-ask={i} onClick={() => askBrand(i)}>{`${L.br_ask} ${x.n}`}</button>
                      <a className="btn line" href={x.url} target="_blank" rel="noopener">{L.br_site}<IcExt /></a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
