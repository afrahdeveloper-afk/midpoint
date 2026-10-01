// Ported verbatim from the original midpoint.html.
import type { MatKey } from "./images";
import type { Locale } from "./i18n";

/** Filter category on the home page brand list. */
export type BrandCat = "surf" | "tile" | "bath" | "mosaic";

export type Brand = {
  /** URL segment: /[locale]/brands/[slug] */
  slug: string;
  /** Display name (also the key into LOGOS). */
  n: string;
  cat: BrandCat;
  /** Official website. */
  url: string;
  /** Swatch used in the brand showcase. */
  mat: MatKey;
  /** What we supply (tags). */
  tg: Record<Locale, string[]>;
} & Record<Locale, [country: string, speciality: string]>;

/** The nine partner brands, in display order. */
export const BRANDS: Brand[] = [
  {
    slug: "roca",
    n: "Roca",
    cat: "bath",
    url: "https://www.export.roca.com/",
    mat: "roca_inwall",
    en: ["Spain", "Sanitaryware, basins, taps and bathroom furniture"],
    ar: ["إسبانيا", "أدوات صحية، مغاسل، خلاطات وأثاث حمّامات"],
    tg: {
      en: ["Toilets", "Smart toilets", "Basins", "Faucets", "Furniture", "Showers and baths"],
      ar: ["مراحيض", "مراحيض ذكية", "مغاسل", "خلاطات", "أثاث", "شاورات وأحواض"],
    },
  },
  {
    slug: "toto",
    n: "TOTO",
    cat: "bath",
    url: "https://asia.toto.com/general/",
    mat: "toto_lav",
    en: ["Japan", "Smart toilets, WASHLET and sanitaryware"],
    ar: ["اليابان", "مراحيض ذكية، WASHLET وأدوات صحية"],
    tg: {
      en: ["WASHLET", "Smart toilets", "Toilets", "Bathtubs", "Lavatories", "Faucets", "Accessories"],
      ar: ["WASHLET", "مراحيض ذكية", "مراحيض", "أحواض", "مغاسل", "خلاطات", "إكسسوارات"],
    },
  },
  {
    slug: "laminam",
    n: "Laminam",
    cat: "surf",
    url: "https://www.laminam.com/en/",
    mat: "laminam_kitchen_gold_vein",
    en: ["Italy", "Large-format ceramic slabs"],
    ar: ["إيطاليا", "ألواح سيراميك بمقاسات كبيرة"],
    tg: {
      en: ["Wall cladding", "Flooring", "Kitchen worktops", "Furnishing", "Façades"],
      ar: ["تكسية الجدران", "الأرضيات", "أسطح المطابخ", "الأثاث", "الواجهات"],
    },
  },
  {
    slug: "infinity-surfaces",
    n: "Infinity Surfaces",
    cat: "surf",
    url: "https://www.infinitysurfaces.it/en/",
    mat: "inf_travertine_bath",
    en: ["Italy", "Large 160×320 cm porcelain slabs"],
    ar: ["إيطاليا", "ألواح بورسلين كبيرة 160×320 سم"],
    tg: {
      en: ["160×320 slabs", "Kitchen tops", "Vanities", "Floors and walls", "Façades"],
      ar: ["ألواح 160×320", "أسطح المطابخ", "أسطح المغاسل", "الأرضيات والجدران", "الواجهات"],
    },
  },
  {
    slug: "argenta",
    n: "Argenta Cerámica",
    cat: "tile",
    url: "https://www.argentaceramica.com/en/",
    mat: "arg_texture",
    en: ["Spain", "Porcelain and ceramic wall and floor tiles"],
    ar: ["إسبانيا", "بلاط بورسلين وسيراميك للجدران والأرضيات"],
    tg: { en: ["Stone", "Marble", "Wood", "Concrete", "Rustic", "Texture", "Façades"], ar: ["حجر", "رخام", "خشب", "إسمنت", "ريفي", "ملمس", "واجهات"] },
  },
  {
    slug: "benadresa",
    n: "Azulejos Benadresa",
    cat: "tile",
    url: "https://www.azulejosbenadresa.com/en/",
    mat: "ab_marble",
    en: ["Spain", "Ceramic wall and floor tiles"],
    ar: ["إسبانيا", "بلاط سيراميك للجدران والأرضيات"],
    tg: {
      en: ["Porcelain body", "White body", "XLAB", "Proline", "AB Essential", "Construcollections"],
      ar: ["بورسلان", "جسم أبيض", "XLAB", "Proline", "AB Essential", "Construcollections"],
    },
  },
  {
    slug: "alaplana",
    n: "Nueva Alaplana",
    cat: "tile",
    url: "https://nuevaalaplana.es/",
    mat: "ala_santa_monica",
    en: ["Spain", "Porcelain tiles in stone, wood and cement looks"],
    ar: ["إسبانيا", "بلاط بورسلين بمظهر الحجر والخشب والإسمنت"],
    tg: { en: ["Glazed porcelain", "Wall tiles", "Coloured body", "Large format"], ar: ["بورسلين مزجج", "بلاط جدران", "عجينة ملوّنة", "مقاسات كبيرة"] },
  },
  {
    slug: "mayolica",
    n: "Mayolica",
    cat: "tile",
    url: "https://www.mayolica.es/",
    mat: "may_rustic",
    en: ["Spain", "Small-format decorated wall and floor tiles"],
    ar: ["إسبانيا", "بلاط جدران وأرضيات صغير المقاس ومزخرف"],
    tg: { en: ["Small format tiles", "Subway", "Rustic", "Hydraulic"], ar: ["بلاط صغير المقاس", "سبواي", "ريفي", "هيدروليك"] },
  },
  {
    slug: "vidrepur",
    n: "Vidrepur",
    cat: "mosaic",
    url: "https://vidrepur.com/en/",
    mat: "vid_diamond",
    en: ["Spain", "Recycled glass mosaic"],
    ar: ["إسبانيا", "موزاييك من الزجاج المعاد تدويره"],
    tg: { en: ["Pool mosaic", "Decor", "Luminescent", "Recycled glass"], ar: ["موزاييك المسابح", "ديكور", "مضيء", "زجاج معاد تدويره"] },
  },
];

export const SLUGS = BRANDS.map((b) => b.slug);

export const brandIndex = (slug: string) => BRANDS.findIndex((b) => b.slug === slug);
