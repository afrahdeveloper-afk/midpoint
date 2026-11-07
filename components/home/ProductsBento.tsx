"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Media } from "@/components/media/Media";
import { IcArrow, IcWa } from "@/components/icons";
import { ProductDrawer } from "./ProductDrawer";
import { PRODUCTS } from "@/data/products";
import { T } from "@/data/translations";
import { waLink } from "@/data/site";
import { pad2, useLocale } from "@/lib/hooks";
import { useGoBrand, useGoHome } from "@/lib/nav";
import { BRANDS } from "@/data/brands";
import { on, takeIntent } from "@/lib/store";
import { useReveal } from "@/lib/reveal";

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
  const goHome = useGoHome();
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

  /* deep links: from the menu (on this page) or from another page (intent) */
  useEffect(() => {
    const off = on("openDrawer", (i, from) => openDrawer(i, from ?? cardBtns.current[i]));
    const it = takeIntent("openDrawer");
    const t = it ? window.setTimeout(() => openDrawer(it.i, cardBtns.current[it.i]), it.delay) : 0;
    return () => {
      off();
      clearTimeout(t);
    };
  }, [openDrawer]);

  /* the contact form lives on the home page: go there with the message prefilled */
  const quote = () => {
    closeDrawer();
    goHome("contact", { type: "prefill", msg: `${L.px_q_msg} ${PRODUCTS[drawer.i][locale].t}` });
  };

  return (
    <>
      <section className="sec products" id="products" ref={root}>
        {/* no visible heading: the filters and cards open the page; the h1 stays for screen readers and search */}
        <h1 className="sr">{L.nav_products}</h1>
        <ul className="bento rv" id="bento">
          {PRODUCTS.map((p, i) => {
            const d = p[locale];
            return (
              <li key={i} className="card" data-i={i}>
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
        <div className="page-cta rv">
          <div>
            <h2>{L.px_cta_t}</h2>
            <p>{L.px_cta_p}</p>
          </div>
          <div className="page-cta-act">
            <button type="button" className="btn solid" onClick={() => goHome("contact")}>{L.cta_contact}<IcArrow /></button>
            <a className="btn ghost" href={waLink(L.px_cta_wa)} target="_blank" rel="noopener"><IcWa full={false} /><span>WhatsApp</span></a>
          </div>
        </div>
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
