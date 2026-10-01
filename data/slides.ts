// Ported verbatim from the original midpoint.html.
import type { MatKey } from "./images";
import type { Locale } from "./i18n";

export interface SlideCopy {
  /** Title, one entry per animated line. */
  t: string[];
  /** Lead paragraph. */
  s: string;
  /** Label used on the progress bars and the "next" card. */
  bar: string;
  /** Short specs row. */
  sp: string[];
}

export type Slide = { mat: MatKey; brands: string } & Record<Locale, SlideCopy>;

/** Home hero slides. `brands` is a " · " separated list rendered as pills. */
export const SLIDES: Slide[] = [
  {
    mat: "inf_rosso",
    brands: "Laminam · Infinity Surfaces",
    en: {
      t: ["Surfaces", "in grand format"],
      s: "Porcelain slabs up to three metres long, for floors, walls, facades and kitchen tops.",
      bar: "Surfaces",
      sp: ["Formats up to 3 m", "Floors, walls and tops", "Made in Italy"],
    },
    ar: {
      t: ["أسطح", "بمقاسات كبرى"],
      s: "ألواح بورسلين بطول يصل إلى ثلاثة أمتار للأرضيات والجدران والواجهات وأسطح المطابخ.",
      bar: "الأسطح",
      sp: ["مقاسات حتى 3 أمتار", "أرضيات وجدران وأسطح", "صناعة إيطالية"],
    },
  },
  {
    mat: "inf_agate_bath",
    brands: "Roca · TOTO",
    en: {
      t: ["The bathroom,", "complete"],
      s: "Sanitaryware, smart toilets and fittings from Spain and Japan.",
      bar: "Bathroom",
      sp: ["Spain and Japan", "Smart toilets", "Complete bathrooms"],
    },
    ar: {
      t: ["الحمّام", "بكل تفاصيله"],
      s: "أدوات صحية ومراحيض ذكية وتجهيزات من إسبانيا واليابان.",
      bar: "الحمّامات",
      sp: ["إسبانيا واليابان", "مراحيض ذكية", "حمّامات متكاملة"],
    },
  },
  {
    mat: "vid_black_bath",
    brands: "Vidrepur",
    en: {
      t: ["Glass,", "piece by piece"],
      s: "Recycled glass mosaic for pools, spas and feature walls.",
      bar: "Glass mosaic",
      sp: ["Recycled glass", "Pools and spas", "Made in Spain"],
    },
    ar: {
      t: ["الزجاج", "قطعةً قطعة"],
      s: "موزاييك من الزجاج المعاد تدويره للمسابح والسبا والجدران المميزة.",
      bar: "الموزاييك",
      sp: ["زجاج معاد تدويره", "مسابح وسبا", "صناعة إسبانية"],
    },
  },
  {
    mat: "arg_ceramic_island",
    brands: "Argenta · Benadresa · Alaplana · Mayolica",
    en: {
      t: ["Spanish tile,", "every finish"],
      s: "Wall and floor tiles from Spain, from hand-glazed looks to stone and wood effects.",
      bar: "Ceramic tile",
      sp: ["Four Spanish makers", "Wall and floor", "Stone, wood and glaze looks"],
    },
    ar: {
      t: ["سيراميك إسباني", "بكل اللمسات"],
      s: "بلاط جدران وأرضيات من إسبانيا، من اللمسة المزججة يدوياً إلى تأثيرات الحجر والخشب.",
      bar: "السيراميك",
      sp: ["أربعة مصنّعين إسبان", "جدران وأرضيات", "مظهر الحجر والخشب والتزجيج"],
    },
  },
];
