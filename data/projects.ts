// Ported verbatim from the latest midpoint.html (PROJECTS, PJ_TYPE, PJ_BI).

/** Project category (filter chips + card tag). */
export type ProjectType = "auto" | "res" | "com" | "ent";

export type Project = {
  /** Also the photo file prefix: /public/projects/<id>-<n>.webp */
  id: string;
  en: string;
  ar: string;
  /** Completion year (null when unknown). */
  y: number | null;
  /** Sanitaryware brands supplied (keys of PJ_BI). */
  san: ("roca" | "toto")[];
  /** Porcelain tiles supplied. */
  por: boolean;
  /** Elevators supplied. */
  elev?: boolean;
  /** [English, Arabic] location line. */
  place?: [string, string];
};

export const PROJECTS: Project[] = [
  { id: "bmw", en: "BMW", ar: "BMW", y: 2025, san: ["roca", "toto"], por: true },
  { id: "byd", en: "BYD", ar: "BYD", y: 2026, san: ["roca", "toto"], por: true },
  { id: "rolls-royce", en: "Rolls-Royce", ar: "رولز رويس", y: 2026, san: ["toto"], por: false },
  { id: "mazda", en: "Mazda", ar: "مازدا", y: 2026, san: ["toto"], por: true },
  { id: "iraq-cinema", en: "Iraq Cinema", ar: "سينما العراق", y: 2026, san: [], por: true },
  { id: "al-rehab", en: "Al Rehab", ar: "الرحاب", y: 2026, san: ["roca"], por: false },
  { id: "baghdad-mall-hotel", en: "Baghdad Mall Hotel", ar: "فندق بغداد مول", y: 2025, san: ["roca"], por: true },
  { id: "spinneys", en: "Spinneys", ar: "سبينيس", y: 2025, san: [], por: true },
  { id: "al-naseem", en: "Al Naseem", ar: "النسيم", y: 2025, san: ["roca"], por: false },
  { id: "sky-baghdad", en: "Sky Baghdad", ar: "سكاي بغداد", y: 2024, san: ["roca"], por: false },
  { id: "al-dalla", en: "Al Dalla", ar: "الدلة", y: 2024, san: ["toto"], por: false, elev: true },
  { id: "andalus-gardens", en: "Andalus Gardens", ar: "حدائق الأندلس", y: 2024, san: ["toto"], por: true },
  { id: "land-rover", en: "Land Rover", ar: "لاند روفر", y: null, san: [], por: false },
  { id: "villa-erbil", en: "Private villa, Erbil", ar: "فيلا خاصة في أربيل", y: null, san: ["toto"], por: true, place: ["Erbil", "أربيل"] },
];

/** Sanitaryware key → index in BRANDS. */
export const PJ_BI = { roca: 0, toto: 1 } as const;

export const PJ_TYPE: Record<string, ProjectType> = {
  bmw: "auto",
  byd: "auto",
  "rolls-royce": "auto",
  mazda: "auto",
  "land-rover": "auto",
  "villa-erbil": "res",
  "sky-baghdad": "res",
  "al-dalla": "res",
  "al-naseem": "res",
  "al-rehab": "res",
  "baghdad-mall-hotel": "com",
  spinneys: "com",
  "iraq-cinema": "ent",
  "andalus-gardens": "ent",
};

/** Number of photos per project (files <id>-1.webp … <id>-<n>.webp in /public/projects). */
const PJ_PHOTOS: Record<string, number> = { "villa-erbil": 15 };

/** Photo URLs for a project, in display order (replaces the original's embedded PJ_IMG). */
export const pjImages = (id: string) =>
  Array.from({ length: PJ_PHOTOS[id] ?? 1 }, (_, n) => `/projects/${id}-${n + 1}.webp`);

/** Filter chip keys: the four types, then the supply filters. */
export type ProjectFilter = "all" | ProjectType | "roca" | "toto" | "por";
export const pjMatch = (p: Project, f: ProjectFilter) =>
  f === "all" || PJ_TYPE[p.id] === f || (f === "por" && p.por) || p.san.includes(f as "roca" | "toto");
