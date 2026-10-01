"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Media } from "@/components/media/Media";
import { IcArrow } from "@/components/icons";
import { ProductDrawer } from "./ProductDrawer";
import { PRODUCTS, SPACES } from "@/data/products";
import { T } from "@/data/translations";
import { pad2, prefersReduced, useLocale } from "@/lib/hooks";
import { useGoBrand } from "@/lib/nav";
import { BRANDS } from "@/data/brands";
import { emit, on, persist, rememberSpace, takeIntent } from "@/lib/store";
import { useReveal } from "@/lib/reveal";

type Space = (typeof SPACES)[number];

/* per-card `sizes`, matching the bento grid breakpoints in globals.css */
const CARD_SIZES = [
  "(min-width: 1080px) 62vw, 100vw",
  "(min-width: 700px) 50vw, 100vw",
  "(min-width: 1080px) 32vw, (min-width: 700px) 50vw, 100vw",
  "(min-width: 1080px) 32vw, (min-width: 700px) 50vw, 100vw",
  "(min-width: 700px) 50vw, 100vw",
  "(min-width: 700px) 50vw, 100vw",
];

export function ProductsSection() {
  const locale = useLocale();
  const L = T[locale];
  const goBrand = useGoBrand();
  const [space, setSpace] = useState<Space>(() => persist.pxSpace as Space);
  const [drawer, setDrawer] = useState({ open: false, i: 0, nonce: 0 });
  const lastFocus = useRef<HTMLElement | null>(null);
  const cardBtns = useRef<(HTMLButtonElement | null)[]>([]);
  const root = useRef<HTMLElement>(null);
  useReveal("products", root);

  const openDrawer = useCallback((i: number, from?: HTMLElement | null) => {
    lastFocus.current = from || (document.activeElement as HTMLElement | null);
    setDrawer((d) => ({ open: true, i, nonce: d.nonce + 1 }));
  }, []);
  const closeDrawer = useCallback(() => {
    setDrawer((d) => (d.open ? { ...d, open: false } : d));
    lastFocus.current?.focus?.({ preventScroll: true });
  }, []);
  const fill = (i: number) => setDrawer((d) => ({ ...d, i, nonce: d.nonce + 1 }));

  /* deep links: from the menu (same page) or from a brand page (intent) */
  useEffect(() => {
    const off = on("openDrawer", (i, from) => openDrawer(i, from ?? cardBtns.current[i]));
    const it = takeIntent("openDrawer");
    const t = it ? window.setTimeout(() => openDrawer(it.i, cardBtns.current[it.i]), it.delay) : 0;
    return () => {
      off();
      clearTimeout(t);
    };
  }, [openDrawer]);

  const quote = () => {
    const reduce = prefersReduced();
    emit("prefill", { msg: `${L.px_q_msg} ${PRODUCTS[drawer.i][locale].t}`, focusDelay: reduce ? 0 : 700 });
    closeDrawer();
    document.getElementById("contact")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const count = PRODUCTS.filter((p) => space === "all" || p.sp.includes(space)).length;

  return (
    <>
      <section className="sec products" id="products" ref={root}>
        <div className="sec-head rv">
          <div><p className="kicker">{L.nav_products}</p><h2>{L.prod_h}</h2></div>
          <p>{L.prod_p}</p>
        </div>
        <div className="px-bar rv">
          <p className="px-lbl">{L.px_space}</p>
          <div className="chips" role="group" id="pxChips">
            {SPACES.map((s) => (
              <button
                key={s}
                className="chip"
                type="button"
                data-sp={s}
                aria-pressed={s === space}
                onClick={() => {
                  rememberSpace(s);
                  setSpace(s);
                }}
              >
                {L[`sp_${s}`]}
                <small>{s === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.sp.includes(s)).length}</small>
              </button>
            ))}
          </div>
          <p className="px-count" id="pxCount" aria-live="polite">{`${count} ${count === 1 ? L.px_cat1 : L.px_cats}`}</p>
        </div>
        <ul className="bento rv" id="bento">
          {PRODUCTS.map((p, i) => {
            const d = p[locale];
            const on = space === "all" || p.sp.includes(space);
            return (
              <li key={i} className={"card" + (on ? "" : " dim")} data-i={i}>
                <button
                  className="card-btn"
                  type="button"
                  aria-haspopup="dialog"
                  aria-controls="drawer"
                  ref={(el) => void (cardBtns.current[i] = el)}
                  onClick={(e) => openDrawer(i, e.currentTarget)}
                >
                  <span className="card-mat" aria-hidden="true"><Media k={p.mat} seed={200 + i * 9} sizes={CARD_SIZES[i] ?? "50vw"} /></span>
                  <span className="card-top"><span className="card-idx">{pad2(i + 1)}</span><span className="card-n">{d.n}</span></span>
                  <span className="card-arr" aria-hidden="true"><IcArrow /></span>
                  <span className="card-bot">
                    <span className="card-t">{d.t}</span>
                    {i === 0 && <span className="card-s">{d.s}</span>}
                    <span className="card-more">
                      <span>
                        <span className="card-uses">{d.u.join(locale === "ar" ? "، " : ", ")}</span>
                        <span className="card-go">{L.px_explore}<IcArrow /></span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <ProductDrawer
        open={drawer.open}
        i={drawer.i}
        nonce={drawer.nonce}
        onClose={closeDrawer}
        onGo={fill}
        onQuote={quote}
        onBrand={(k) => {
          closeDrawer();
          goBrand(BRANDS[k].slug);
        }}
      />
    </>
  );
}
