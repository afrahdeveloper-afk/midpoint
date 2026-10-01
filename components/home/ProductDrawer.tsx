"use client";
import { useEffect, useRef } from "react";
import { Media } from "@/components/media/Media";
import { Logo } from "@/components/media/Logo";
import { IcNext, IcPrev, IcWa } from "@/components/icons";
import { BRANDS } from "@/data/brands";
import { LOGOS } from "@/data/logos";
import { PFEAT, PRODUCTS } from "@/data/products";
import { T } from "@/data/translations";
import { waLink } from "@/data/site";
import { pad2, prefersReduced, useIsoLayoutEffect, useLocale } from "@/lib/hooks";
import { bodyClass, setShared } from "@/lib/store";

type Props = {
  open: boolean;
  /** Current product index. */
  i: number;
  /** Bumped on every fill so the entrance animations restart (the original re-filled the DOM). */
  nonce: number;
  onClose: () => void;
  onGo: (i: number) => void;
  onQuote: () => void;
  onBrand: (k: number) => void;
};

export function ProductDrawer({ open, i, nonce, onClose, onGo, onQuote, onBrand }: Props) {
  const locale = useLocale();
  const L = T[locale];
  const dr = useRef<HTMLElement>(null);
  const bk = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);

  /* show / hide with the slide transition */
  useIsoLayoutEffect(() => {
    const d = dr.current!, b = bk.current!;
    openRef.current = open;
    setShared({ drOpen: open });
    if (open) {
      d.hidden = false;
      b.hidden = false;
      bodyClass("locked", true);
      const raf = requestAnimationFrame(() => {
        d.classList.add("on");
        b.classList.add("on");
      });
      const t = setTimeout(() => document.getElementById("drClose")?.focus(), 60);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(t);
      };
    }
    if (d.hidden) return;
    d.classList.remove("on");
    b.classList.remove("on");
    bodyClass("locked", false);
    const t = setTimeout(() => {
      if (!openRef.current) {
        d.hidden = true;
        b.hidden = true;
      }
    }, prefersReduced() ? 0 : 600);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => () => setShared({ drOpen: false }), []);

  /* every fill scrolls the panel back to the top */
  useIsoLayoutEffect(() => {
    if (nonce && scroller.current) scroller.current.scrollTop = 0;
  }, [nonce]);

  /* Escape + focus trap */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const f = [...dr.current!.querySelectorAll<HTMLElement>("a[href],button")].filter((x) => x.getClientRects().length);
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const p = PRODUCTS[i], d = p[locale];
  const n = PRODUCTS.length;

  return (
    <>
      <div className="dr-back" id="drBack" hidden ref={bk} onClick={onClose}></div>
      <aside className="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="drTitle" hidden ref={dr}>
        <div className="dr-top">
          <span className="dr-idx" id="drIdx">{`${pad2(i + 1)} / ${pad2(n)}`}</span>
          <div className="dr-nav">
            <button className="dr-btn" type="button" id="drPrev" aria-label={L.prev_cat} onClick={() => onGo((i - 1 + n) % n)}><IcPrev w="1.5" /></button>
            <button className="dr-btn" type="button" id="drNext" aria-label={L.next_cat} onClick={() => onGo((i + 1) % n)}><IcNext w="1.5" /></button>
            <button className="dr-btn dr-x" type="button" id="drClose" aria-label={L.close} onClick={onClose}><span className="x" aria-hidden="true"></span></button>
          </div>
        </div>
        <div className="dr-scroll" ref={scroller}>
          <div className="dr-mat" id="drMat">
            <Media key={`${i}-${nonce}`} k={p.mat} seed={700 + i * 9} sizes="(min-width: 560px) 560px, 100vw" />
          </div>
          <div className="dr-body" id="drBody" key={nonce}>
            <h3 id="drTitle">{d.t}</h3>
            <p className="dr-desc" id="drDesc">{d.s}</p>
            <h4>{L.px_feat}</h4>
            <ul className="dr-feat" id="drFeat">{PFEAT[locale][i].map((f) => <li key={f}>{f}</li>)}</ul>
            <h4>{L.px_ideal}</h4>
            <ul className="tags dr-tags" id="drUses">{d.u.map((u) => <li key={u}>{u}</li>)}</ul>
            <h4>{L.from}</h4>
            <ul className="dr-brands" id="drBrands">
              {p.bi.map((k) => (
                <li key={k}>
                  <button type="button" data-b={k} aria-label={BRANDS[k].n} onClick={() => onBrand(k)}>
                    {LOGOS[BRANDS[k].n] ? <Logo name={BRANDS[k].n} /> : BRANDS[k].n}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="dr-act">
          <button className="btn solid-dark" type="button" id="drQuote" onClick={onQuote}>{L.px_quote}</button>
          <a className="btn dr-wa" id="drWa" href={waLink(`${L.px_wa_msg} ${d.t}`)} target="_blank" rel="noopener"><IcWa full={false} /><span>WhatsApp</span></a>
        </div>
      </aside>
    </>
  );
}
