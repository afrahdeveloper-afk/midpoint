"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Material, Media } from "@/components/media/Media";
import { IcNext, IcPrev } from "@/components/icons";
import { BRANDS } from "@/data/brands";
import { BDATA } from "@/data/brand-details";
import { IMGS, isPhoto, photoSize } from "@/data/images";

import { T } from "@/data/translations";
import { pad2, prefersReduced, useLocale } from "@/lib/hooks";
import { bodyClass } from "@/lib/store";
import { slideDesc, slideLabel, slideSeed, type Slide } from "./slides";

type Props = {
  k: number;
  /** Every brand image (not only the 4 hero tiles). */
  slides: Slide[];
  /** Image shown, or null when closed. */
  index: number | null;
  /** Show another image, or close with null. */
  onChange: (i: number | null) => void;
};

/** Full-screen brand gallery (<dialog>), opened from the hero mosaic. */
export function GalleryLightbox({ k, slides, index, onChange }: Props) {
  const locale = useLocale();
  const L = T[locale];
  const ar = locale === "ar";
  const b = BRANDS[k], d = BDATA[b.slug];
  const lb = useRef<HTMLDialogElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);
  const sx = useRef<number | null>(null);
  const open = index !== null;
  const n = slides.length;

  /* open as a modal, lock the page, focus the close button; on close unlock and restore focus */
  useEffect(() => {
    if (!open) return;
    const dlg = lb.current!, opener = document.activeElement as HTMLElement | null;
    if (dlg.showModal) dlg.showModal();
    else dlg.setAttribute("open", "");
    bodyClass("locked", true);
    closeBtn.current?.focus();
    return () => {
      if (dlg.open) dlg.close(); // unmounted while open (e.g. browser back)
      bodyClass("locked", false);
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  /* keep the active thumbnail in view (after the modal has opened, so it has a layout) */
  useEffect(() => {
    if (index === null) return;
    thumbs.current?.querySelector(".on")?.scrollIntoView({ inline: "center", block: "nearest", behavior: prefersReduced() ? "auto" : "smooth" });
  }, [index]);

  const close = () => {
    const dlg = lb.current!;
    if (dlg.close) dlg.close(); // fires "close" → onChange(null)
    else {
      dlg.removeAttribute("open");
      onChange(null);
    }
  };
  const go = (i: number) => onChange((i + n) % n);
  /** +1 = forward in reading order; in Arabic forward is leftward. */
  const step = (dir: 1 | -1) => index !== null && go(index + dir);

  const s = index !== null ? slides[index] : null;
  const px = s && photoSize(s.key);

  return (
    <dialog
      className="lb"
      id="bpLb"
      aria-labelledby="lbCap"
      ref={lb}
      onClose={() => onChange(null)}
      onClick={(e) => e.target === lb.current && close()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(ar ? -1 : 1);
        if (e.key === "ArrowLeft") step(ar ? 1 : -1);
      }}
      onPointerDown={(e) => {
        sx.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (sx.current === null) return;
        const dx = e.clientX - sx.current;
        sx.current = null;
        if (Math.abs(dx) > 50) step((ar ? dx > 0 : dx < 0) ? 1 : -1);
      }}
    >
      {s && index !== null && (
        <>
          <div className="lb-stage">
            <div className="lb-media in" id="lbMedia">
              {isPhoto(s.key) ? (
                <Image
                  key={index}
                  src={IMGS[s.key]}
                  alt={slideLabel(d, s, locale)}
                  width={px?.w ?? 1920}
                  height={px?.h ?? 1080}
                  sizes="(max-width: 760px) 100vw, 84vw"
                  loading="eager"
                  draggable={false}
                />
              ) : (
                <div key={index} className="lb-svg"><Material k={s.key} seed={2000 + index * 13} /></div>
              )}
            </div>
          </div>
          <div className="lb-info" aria-live="polite">
            <span className="lb-count" id="lbCount">{`${pad2(index + 1)} / ${pad2(n)}`}</span>
            <p className="lb-cap" id="lbCap">{`${b.n}: ${slideLabel(d, s, locale)}`}</p>
            <p className="lb-desc" id="lbDesc">{slideDesc(d, s, locale)}</p>
          </div>
          {/* the left button steps forward in Arabic, so its label follows what it does */}
          <button className="lb-nav lb-prev" type="button" id="lbPrev" aria-label={ar ? L.next : L.prev} onClick={() => step(ar ? 1 : -1)}><IcPrev /></button>
          <button className="lb-nav lb-next" type="button" id="lbNext" aria-label={ar ? L.prev : L.next} onClick={() => step(ar ? -1 : 1)}><IcNext /></button>
          <div className="lb-thumbs" id="lbThumbs" ref={thumbs}>
            {slides.map((t, j) => (
              <button
                key={t.key + j}
                type="button"
                className={j === index ? "on" : undefined}
                aria-label={slideLabel(d, t, locale)}
                aria-current={j === index}
                onClick={() => go(j)}
              >
                <span><Media k={t.key} seed={slideSeed(k, j)} sizes="104px" /></span>
              </button>
            ))}
          </div>
        </>
      )}
      <button className="lb-x" type="button" id="lbClose" aria-label={L.close} onClick={close} ref={closeBtn}>
        <span className="x" aria-hidden="true"></span>
      </button>
    </dialog>
  );
}
