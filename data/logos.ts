import { BRAND_MARKS, LOGO_FILES } from "./assets.generated";

/**
 * Partner brand logos, keyed by brand name (BRANDS[i].n).
 * The extracted logos come from data/assets.generated.ts (written by scripts/extract-assets.ts).
 * To add or replace a logo, put the file in /public/logos and add an entry below —
 * `w`/`h` are the file's intrinsic size (the stylesheet controls the rendered size).
 */
export const LOGOS: Record<string, { src: string; w: number; h: number }> = {
  ...LOGO_FILES,
  // "New Brand": { src: "/logos/new-brand.svg", w: 240, h: 60 },
  Laminam: { src: "/logos/laminam-new.png", w: 1280, h: 185 }, // new logo with "Superior Natural Surfaces"
};

/** Midpoint's own marks (the wordmark and the "Inside The Heart" logo). */
export const MARKS = BRAND_MARKS;
