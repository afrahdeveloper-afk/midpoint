import type { BrandDetail } from "@/data/brand-details";
import type { Locale } from "@/data/i18n";
import { IMGS, type MatKey } from "@/data/images";
import { PRODUCTS } from "@/data/products";

/** One brand image: `li` is the product line it illustrates (-1 = the brand's category). */
export type Slide = { key: MatKey; li: number };

const LOWRES: MatKey[] = []; // too small to show

/** A brand's gallery images: the hero image, each distinct line image (max 6), then any `extra` photos. */
export function brandSlides(d: BrandDetail): Slide[] {
  const slides = lineSlides(d);
  for (const [key, li] of d.extra ?? []) if (!slides.some((s) => s.key === key)) slides.push({ key, li }); // no duplicates
  return slides;
}

function lineSlides(d: BrandDetail): Slide[] {
  const hk = d.hero || d.mats[0];
  const keys: Slide[] = [{ key: hk, li: d.heroLi != null ? d.heroLi : d.mats.indexOf(hk) }];
  d.mats.forEach((m, i) => {
    if (LOWRES.includes(m) || (m === hk && (m in IMGS || i === keys[0].li))) return;
    if (m in IMGS && keys.some((s) => s.key === m)) return;
    keys.push({ key: m, li: i });
  });
  return keys.slice(0, 6);
}

/** Procedural-material seed of slide `i` of brand `k` (tiles and thumbnails, was BHT). */
export const slideSeed = (k: number, i: number) => 1000 + k * 17 + i * 29;

const lineOf = (d: BrandDetail, s: Slide) => (s.li >= 0 ? d.lines[s.li] : undefined);

/** Line title, or the category name (was bhLabel). */
export const slideLabel = (d: BrandDetail, s: Slide, l: Locale) => {
  const line = lineOf(d, s);
  return line ? (l === "ar" ? line[2] : line[0]) : PRODUCTS[d.cat][l].t;
};

/** Line description ("" for the category image). */
export const slideDesc = (d: BrandDetail, s: Slide, l: Locale) => {
  const line = lineOf(d, s);
  return line ? (l === "ar" ? line[3] : line[1]) : "";
};
