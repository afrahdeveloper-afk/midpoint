"use client";
import { Media } from "@/components/media/Media";
import { IcZoom } from "@/components/icons";
import { BRANDS } from "@/data/brands";
import { BDATA } from "@/data/brand-details";
import { photoSize } from "@/data/images";
import { pad2, useLocale } from "@/lib/hooks";
import { slideLabel, slideSeed, type Slide } from "./slides";

const MAX_TILES = 4;

/** Share of the gallery width each tile spans, by tile count (the .bh-gal grid columns). */
const COLS: Record<number, number[]> = {
  1: [1],
  2: [1.3 / 2.3, 1 / 2.3],
  3: [1.35 / 3.35, 2 / 3.35, 2 / 3.35],
  4: [1.35 / 3.35, 2 / 3.35, 1 / 3.35, 1 / 3.35],
};

/**
 * next/image `sizes` for a tile. Photos are cover-fitted, so in a tall tile the drawn width is
 * the tile height × the photo's aspect ratio rather than the tile width. The gallery fills the
 * screen edge to edge under the bars: ≈ 100vw × 86vh on wide screens, 100vw × 84vh on phones.
 */
function tileSizes(n: number, i: number, aspect: number) {
  const w = COLS[n][i], h = n < 3 || i === 0 ? 1 : 0.5;
  // one length per breakpoint: whichever term is larger at a typical screen shape (vh in vw units)
  const size = (gw: number, gh: number, vhInVw: number) =>
    h * gh * aspect * vhInVw > w * gw ? `${Math.ceil(h * gh * aspect)}vh` : `${Math.ceil(w * gw)}vw`;
  return `(max-width: 760px) ${size(100, 84, 2.16)}, ${size(100, 86, 0.5625)}`;
}

type Props = {
  k: number;
  slides: Slide[];
  /** Open the lightbox at image `i`. */
  onOpen: (i: number) => void;
};

/** Brand hero mosaic (was renderGal): up to 4 tiles, "+N" on the last one when there are more images. */
export function BrandGallery({ k, slides, onOpen }: Props) {
  const locale = useLocale();
  const d = BDATA[BRANDS[k].slug];
  const show = Math.min(MAX_TILES, slides.length), extra = slides.length - show;

  return (
    <>
      <div className="bh-gal" id="bhGal" data-n={show}>
        {slides.slice(0, show).map((s, i) => {
          const label = slideLabel(d, s, locale);
          const px = photoSize(s.key);
          return (
            <button
              key={s.key + i}
              className={`gt gt${i + 1}`}
              type="button"
              style={{ ["--d" as string]: `${0.25 + i * 0.12}s` }}
              aria-label={label}
              aria-haspopup="dialog"
              onClick={(e) => {
                e.currentTarget.focus(); // Safari doesn't focus clicked buttons; the lightbox returns focus here
                onOpen(i);
              }}
            >
              <span className="gt-img">
                <Media
                  k={s.key}
                  seed={slideSeed(k, i)}
                  sizes={tileSizes(show, i, px ? px.w / px.h : 1.5)}
                  preload={i === 0}
                  fetchPriority={i === 0 ? "high" : undefined}
                />
              </span>
              <span className="gt-lbl"><small>{pad2(i + 1)}</small>{label}</span>
              <span className="gt-zoom" aria-hidden="true"><IcZoom w="1.5" /></span>
              {i === show - 1 && extra > 0 && <span className="gt-more" dir="ltr">{`+${extra}`}</span>}
            </button>
          );
        })}
      </div>
    </>
  );
}
