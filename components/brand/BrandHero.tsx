"use client";
import { BrandGallery } from "./BrandGallery";
import { BRANDS } from "@/data/brands";
import type { Slide } from "./slides";

type Props = {
  k: number;
  slides: Slide[];
  /** Open the gallery lightbox at image `i`. */
  onOpenGallery: (i: number) => void;
};

/** Brand hero: a full-width mosaic gallery; the H1 stays for SEO and screen readers, visually hidden. */
export function BrandHero({ k, slides, onOpenGallery }: Props) {
  const b = BRANDS[k];
  return (
    <div className="bh" id="bpTop">
      <BrandGallery k={k} slides={slides} onOpen={onOpenGallery} />
      <div className="bh-copy" id="bhCopy">
        <h1 id="bpName" tabIndex={-1} dir="ltr">{b.n}</h1>
      </div>
    </div>
  );
}
