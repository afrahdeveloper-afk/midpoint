// Ported verbatim from the original midpoint.html.
import type { MatKey } from "./images";
import type { Locale } from "./i18n";

export type Space = "kitchen" | "bath" | "living" | "outdoor" | "pool";

export interface ProductCopy {
  /** Title. */
  t: string;
  /** Brand count label. */
  n: string;
  /** Description. */
  s: string;
  /** Uses. */
  u: string[];
}

export type Product = {
  mat: MatKey;
  /** Indexes into BRANDS that supply this category. */
  bi: number[];
  /** Spaces for the "filter by space" chips. */
  sp: Space[];
  brands: string;
} & Record<Locale, ProductCopy>;

export const SPACES = ["all", "kitchen", "bath", "living", "outdoor", "pool"] as const;

/** Product categories shown in the bento grid and the drawer. */
export const PRODUCTS: Product[] = [
  {
    mat: "inf_island",
    bi: [2, 3],
    sp: ["kitchen", "living", "outdoor", "bath"],
    brands: "Laminam · Infinity Surfaces",
    en: {
      t: "Large-format slabs",
      n: "2 brands",
      s: "Thin, light porcelain slabs that cover a wall or a kitchen island in a single piece, with fewer joints and a finish that resists heat, stains and scratches.",
      u: ["Kitchen tops", "Feature walls", "Facades", "Furniture"],
    },
    ar: {
      t: "ألواح بمقاسات كبيرة",
      n: "علامتان",
      s: "ألواح بورسلين رقيقة وخفيفة تكسو جداراً أو جزيرة مطبخ بقطعة واحدة، بفواصل أقل وسطح يقاوم الحرارة والبقع والخدوش.",
      u: ["أسطح المطابخ", "الجدران المميزة", "الواجهات", "الأثاث"],
    },
  },
  {
    mat: "ab_wood",
    bi: [4, 6, 5],
    sp: ["living", "outdoor", "bath", "kitchen"],
    brands: "Argenta · Nueva Alaplana · Benadresa",
    en: {
      t: "Porcelain & ceramic tiles",
      n: "3 brands",
      s: "Wall and floor tiles in stone, marble, wood and cement effects, in sizes from small formats to large rectified pieces.",
      u: ["Floors", "Walls", "Outdoor", "Commercial"],
    },
    ar: {
      t: "بلاط بورسلين وسيراميك",
      n: "3 علامات",
      s: "بلاط جدران وأرضيات بتأثيرات الحجر والرخام والخشب والإسمنت، بمقاسات تبدأ من الصغيرة وتصل إلى القطع الكبيرة المشذّبة.",
      u: ["الأرضيات", "الجدران", "المساحات الخارجية", "المشاريع التجارية"],
    },
  },
  {
    mat: "may_hydraulic",
    bi: [7],
    sp: ["kitchen", "bath"],
    brands: "Mayolica",
    en: {
      t: "Decorative tiles",
      n: "1 brand",
      s: "Glazed tiles with the irregular edges and colour depth of handmade ceramic, for kitchens, bathrooms and splashbacks.",
      u: ["Splashbacks", "Bathrooms", "Accent walls"],
    },
    ar: {
      t: "بلاط زخرفي",
      n: "علامة واحدة",
      s: "بلاط مزجج بحواف غير منتظمة وعمق لوني يشبه السيراميك المصنوع يدوياً، للمطابخ والحمّامات وخلفيات المغاسل.",
      u: ["خلفيات المطبخ", "الحمّامات", "الجدران المميزة"],
    },
  },
  {
    mat: "vid_pool",
    bi: [8],
    sp: ["pool", "bath"],
    brands: "Vidrepur",
    en: {
      t: "Glass mosaic",
      n: "1 brand",
      s: "Mosaic made from recycled glass, in solid colours and blends, suited to wet areas and continuous water contact.",
      u: ["Pools", "Spas", "Showers", "Feature walls"],
    },
    ar: {
      t: "موزاييك زجاجي",
      n: "علامة واحدة",
      s: "موزاييك مصنوع من الزجاج المعاد تدويره بألوان سادة ومدمجة، مناسب للأماكن الرطبة والتلامس المستمر مع الماء.",
      u: ["المسابح", "السبا", "الشاورات", "الجدران المميزة"],
    },
  },
  {
    mat: "roca_avant",
    bi: [0, 1],
    sp: ["bath"],
    brands: "Roca · TOTO",
    en: {
      t: "Sanitaryware & basins",
      n: "2 brands",
      s: "Toilets, washbasins, bathtubs and shower trays, with matching taps and furniture to finish the room.",
      u: ["Toilets", "Basins", "Bathtubs", "Taps"],
    },
    ar: {
      t: "أدوات صحية ومغاسل",
      n: "علامتان",
      s: "مراحيض ومغاسل وأحواض استحمام وقواعد شاور، مع خلاطات وأثاث متناسق لإكمال الحمّام.",
      u: ["المراحيض", "المغاسل", "أحواض الاستحمام", "الخلاطات"],
    },
  },
  {
    mat: "toto_garden",
    bi: [1, 0],
    sp: ["bath"],
    brands: "TOTO · Roca",
    en: {
      t: "Smart toilets",
      n: "2 brands",
      s: "Shower toilets with warm-water cleansing, heated seats and self-cleaning glazes that keep the bowl hygienic with less effort.",
      u: ["Homes", "Hotels", "Offices"],
    },
    ar: {
      t: "مراحيض ذكية",
      n: "علامتان",
      s: "مراحيض بشطاف بماء دافئ ومقاعد مدفّأة وطلاء ذاتي التنظيف يحافظ على نظافة الحوض بجهد أقل.",
      u: ["المنازل", "الفنادق", "المكاتب"],
    },
  },
];

/** Key features per product (same order as PRODUCTS), shown in the drawer. */
export const PFEAT: Record<Locale, string[][]> = {
  en: [
    ["Resistant to heat, scratches and stains", "Few joints across large areas", "Thin and light for walls and furniture"],
    ["Stone, marble, wood and cement effects", "Formats from small to large", "Ranges for indoor and outdoor use"],
    ["Glaze depth and irregular edges", "Many colours in each series", "For kitchen and bathroom walls"],
    ["Made from recycled glass", "Suited to constant water contact", "Solid colours and blends"],
    ["Wall-hung and floor-standing options", "Coordinated basins, taps and furniture", "Bathtubs and shower trays"],
    ["Warm-water cleansing", "Heated seats", "Easy-clean glazed surfaces"],
  ],
  ar: [
    ["مقاومة للحرارة والخدوش والبقع", "فواصل قليلة على المساحات الكبيرة", "رقيقة وخفيفة للجدران والأثاث"],
    ["تأثيرات الحجر والرخام والخشب والإسمنت", "مقاسات من الصغيرة إلى الكبيرة", "مجموعات للاستخدام الداخلي والخارجي"],
    ["عمق في التزجيج وحواف غير منتظمة", "ألوان متعددة في كل مجموعة", "لجدران المطابخ والحمّامات"],
    ["مصنوع من زجاج معاد تدويره", "مناسب للتلامس المستمر مع الماء", "ألوان سادة ومدمجة"],
    ["خيارات معلّقة وأرضية", "مغاسل وخلاطات وأثاث متناسق", "أحواض استحمام وقواعد شاور"],
    ["شطاف بماء دافئ", "مقاعد مدفّأة", "أسطح مزججة سهلة التنظيف"],
  ],
};
