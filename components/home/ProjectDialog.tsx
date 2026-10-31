"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Logo } from "@/components/media/Logo";
import { IcArrow, IcNext, IcPrev, IcWa } from "@/components/icons";
import { BrandLink } from "@/components/nav/Links";
import { BRANDS } from "@/data/brands";
import { LOGOS } from "@/data/logos";
import { PJ_BI, PJ_TYPE, PROJECTS, pjImages } from "@/data/projects";
import { T } from "@/data/translations";
import { waLink } from "@/data/site";
import { prefersReduced, useIsoLayoutEffect, useLocale } from "@/lib/hooks";
import { bodyClass } from "@/lib/store";

type Props = {
  open: boolean;
  /** Index into PROJECTS. */
  i: number;
  /** Bumped on every fill (resets the viewer and the scroll position). */
  nonce: number;
  /** The fill came from the previous/next project buttons: play the swap animation. */
  swap: boolean;
  onClose: () => void;
  onGo: (i: number) => void;
  onQuote: () => void;
};

/* scope icons (porcelain grid, basin, lift) */
const PJ_ICO = {
  por: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3.5" y="3.5" width="7.5" height="7.5" /><rect x="13" y="3.5" width="7.5" height="7.5" /><rect x="3.5" y="13" width="7.5" height="7.5" /><rect x="13" y="13" width="7.5" height="7.5" /></svg>,
  san: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 11h18a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8z" /><path d="M12 11V5a2 2 0 0 1 4 0" /></svg>,
  elev: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="4" y="3" width="16" height="18" /><path d="M12 3v18M7.5 9.5l1.5-2 1.5 2M13.5 14.5l1.5 2 1.5-2" /></svg>,
};

/** Project details (#pjDlg): photo viewer + details panel, in a native modal <dialog>. */
export function ProjectDialog({ open, i, nonce, swap, onClose, onGo, onQuote }: Props) {
  const locale = useLocale();
  const L = T[locale];
  const dlg = useRef<HTMLDialogElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);
  // viewer position; a new fill (nonce) starts again at the first photo
  const [view, setView] = useState({ k: 0, anim: false, nonce });
  const img = view.nonce === nonce ? view : { k: 0, anim: false };

  const p = PROJECTS[i];
  const nm = locale === "ar" ? p.ar : p.en;
  const imgs = pjImages(p.id);
  const show = (k: number) => setView({ k: (k + imgs.length) % imgs.length, anim: !prefersReduced(), nonce });
  // RTL: "forward" is towards the left
  const fwd = locale === "ar" ? -1 : 1;

  /* open / close the native dialog */
  useIsoLayoutEffect(() => {
    const d = dlg.current!;
    if (open && !d.open) {
      d.showModal();
      bodyClass("locked", true);
      const t = setTimeout(() => document.getElementById("pjClose")?.focus(), 40);
      return () => clearTimeout(t);
    }
    if (!open && d.open) d.close();
  }, [open]);

  /* every fill: panel back to the top, swap animation for previous/next project */
  useIsoLayoutEffect(() => {
    if (scroller.current) scroller.current.scrollTop = 0;
    if (swap && !prefersReduced() && grid.current) {
      const g = grid.current;
      g.classList.remove("swap");
      void g.offsetWidth;
      g.classList.add("swap");
    }
  }, [nonce]);

  /* keep the current thumbnail in view */
  useEffect(() => {
    thumbs.current?.querySelector(".on")?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [img.k, nonce]);

  /* swipe on the photo */
  const sx = useRef<number | null>(null);
  const onSwipeEnd = (x: number) => {
    if (sx.current === null) return;
    const dx = x - sx.current;
    sx.current = null;
    if (Math.abs(dx) > 40) show(img.k + ((locale === "ar" ? dx > 0 : dx < 0) ? 1 : -1));
  };

  const type = L[`pjt_${PJ_TYPE[p.id]}`];
  const brands = p.san.map((s) => BRANDS[PJ_BI[s]]);
  const facts: [string, string | number][] = [
    [L.pjf_year, p.y || "—"],
    [L.pjf_type, type],
    [L.pjf_brands, brands.length ? brands.map((b) => b.n).join(" + ") : "—"],
    [L.pjf_photos, imgs.length || "—"],
  ];
  const scope: [keyof typeof PJ_ICO, string, string][] = [];
  if (p.por) scope.push(["por", L.pj_s_por, L.pjd_por]);
  brands.forEach((b) => scope.push(["san", `${L.pj_s_san} ${b.n}`, L.pjd_san]));
  if (p.elev) scope.push(["elev", L.pj_s_elev, L.pjd_elev]);

  const n = PROJECTS.length;
  const pnCard = (k: number, lbl: string, cls: string) => {
    const q = PROJECTS[k];
    return (
      <button type="button" className={cls} data-k={k} onClick={() => onGo(k)}>
        <span className="pn-img"><Image src={pjImages(q.id)[0]} alt="" width={104} height={80} sizes="52px" /></span>
        <span className="pn-t"><small>{lbl}</small><b dir="auto">{locale === "ar" ? q.ar : q.en}</b></span>
      </button>
    );
  };

  return (
    <dialog
      className="pj-dlg pjx"
      id="pjDlg"
      aria-labelledby="pjDT"
      ref={dlg}
      onClose={() => {
        bodyClass("locked", false);
        onClose();
      }}
      onClick={(e) => e.target === dlg.current && dlg.current.close()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") show(img.k + fwd);
        if (e.key === "ArrowLeft") show(img.k - fwd);
      }}
    >
      <button className="dr-btn dr-x pj-x" type="button" id="pjClose" aria-label={L.close} onClick={() => dlg.current?.close()}><span className="x" aria-hidden="true"></span></button>
      <div className="pjx-grid" id="pjxGrid" ref={grid}>
        <div className="pjx-media">
          <div
            className="pj-d-media"
            id="pjDM"
            hidden={!imgs.length}
            onPointerDown={(e) => void (sx.current = e.clientX)}
            onPointerUp={(e) => onSwipeEnd(e.clientX)}
          >
            <div className="pj-d-main" id="pjDMain">
              <Image
                key={`${p.id}-${img.k}`}
                src={imgs[img.k]}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
                draggable={false}
                style={img.anim ? { animation: "lbImg .45s var(--ease-out)" } : undefined}
              />
            </div>
            <button className="pj-d-nav pj-d-prev" type="button" id="pjPrev" aria-label={L.prev} hidden={imgs.length < 2} onClick={() => show(img.k - fwd)}><IcPrev w="1.5" /></button>
            <button className="pj-d-nav pj-d-next" type="button" id="pjNext" aria-label={L.next} hidden={imgs.length < 2} onClick={() => show(img.k + fwd)}><IcNext w="1.5" /></button>
            <span className="pj-d-cnt" id="pjCnt" dir="ltr">{imgs.length > 1 ? `${img.k + 1} / ${imgs.length}` : ""}</span>
          </div>
          <div className="pj-d-thumbs" id="pjDTh" hidden={imgs.length < 2} ref={thumbs}>
            {imgs.length > 1 &&
              imgs.map((s, k) => (
                <button key={s} type="button" className={k === img.k ? "on" : undefined} aria-label={String(k + 1)} onClick={() => show(k)}>
                  <Image src={s} alt="" width={128} height={96} sizes="64px" />
                </button>
              ))}
          </div>
        </div>
        <div className="pjx-side">
          <div className="pjx-scroll" ref={scroller}>
            <div className="pjx-head"><span className="pjx-type" id="pjDType">{type}</span><span className="pjx-year" id="pjDY" dir="ltr" hidden={!p.y}>{p.y || ""}</span></div>
            <h3 id="pjDT" dir={/^[A-Za-z]/.test(nm) ? "ltr" : "auto"}>{nm}</h3>
            <p className="pj-d-place" id="pjDP" hidden={!p.place}>{p.place ? (locale === "ar" ? p.place[1] : p.place[0]) : ""}</p>
            <dl className="pjx-facts" id="pjDF">
              {facts.map((f) => (
                <div key={f[0]}><dt>{f[0]}</dt><dd dir="auto">{f[1]}</dd></div>
              ))}
            </dl>
            <h4 hidden={!scope.length}>{L.pj_scope}</h4>
            <ul className="pjx-scope" id="pjDS" hidden={!scope.length}>
              {scope.map((s) => (
                <li key={s[1]}><span className="ic" aria-hidden="true">{PJ_ICO[s[0]]}</span><span><b>{s[1]}</b><small>{s[2]}</small></span></li>
              ))}
            </ul>
            <h4 hidden={!brands.length}>{L.pj_brands}</h4>
            <ul className="pj-d-brands" id="pjDB" hidden={!brands.length}>
              {brands.map((b) => (
                <li key={b.slug}>
                  <BrandLink slug={b.slug} aria-label={b.n} onClick={() => dlg.current?.close()}>
                    {LOGOS[b.n] ? <Logo name={b.n} slug={b.slug} /> : b.n}
                    <IcArrow />
                  </BrandLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="pjx-act">
            <a className="btn solid-dark" id="pjWa" href={waLink(`${L.pj_wa_msg} ${nm}`)} target="_blank" rel="noopener"><IcWa full={false} />{L.pj_wa}</a>
            <button className="btn line" type="button" id="pjQuote" onClick={onQuote}>{L.px_quote}</button>
          </div>
          <nav className="pjx-pn" id="pjPN" aria-label={L.nav_projects}>
            {pnCard((i - 1 + n) % n, L.pjp_prev, "pn-prev")}
            {pnCard((i + 1) % n, L.pjp_next, "pn-next")}
          </nav>
        </div>
      </div>
    </dialog>
  );
}
