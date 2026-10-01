import type { Locale } from "./i18n";

/**
 * Business details used across the site, the JSON-LD and the metadata.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.midpointco.com).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.midpointco.com").replace(/\/$/, "");

export const SITE = {
  name: "Midpoint",
  nameAr: "ميدبوينت",
  legalName: "Midpoint General Trading Co.",
  email: "info@midpointco.com",
  /** E.164 without "+" — used for tel: and wa.me links. */
  phone: "9647870888021",
  phoneDisplay: "+964 787 088 8021",
  whatsapp: "https://wa.me/9647870888021",
  maps: "https://www.google.com/maps/search/?api=1&query=Baghdad+Tower+Al+Mansour+Baghdad",
  /** Opening hours, Baghdad time (UTC+3), every day. */
  opens: 9,
  closes: 20,
  utcOffset: 3,
  foundingYear: "2019",
  address: {
    street: "Baghdad Tower, Godiya Plaza",
    locality: "Al-Mansour",
    city: "Baghdad",
    country: "IQ",
  },
  social: {
    facebook: "https://www.facebook.com/midpointiq/about/",
    instagram: "https://www.instagram.com/midpoint_iraq/",
    tiktok: "https://www.tiktok.com/@midpoint_iraq",
  },
} as const;

/** wa.me link with a pre-filled message. */
export const waLink = (text?: string) => (text ? `${SITE.whatsapp}?text=${encodeURIComponent(text)}` : SITE.whatsapp);

/** Is the showroom open right now (Baghdad time)? */
export const isOpenNow = (d = new Date()) => {
  const h = (d.getUTCHours() + SITE.utcOffset) % 24;
  return h >= SITE.opens && h < SITE.closes;
};

export const HOME_TITLE: Record<Locale, string> = {
  ar: "ميدبوينت — وكيل العلامات الفاخرة للأسطح والحمّامات",
  en: "Midpoint — Agent for luxury surfaces and bathrooms",
};

export const HOME_DESCRIPTION: Record<Locale, string> = {
  ar: "ميدبوينت، الوكيل الرسمي في العراق لتسع علامات أوروبية ويابانية: Roca وTOTO وLaminam وInfinity Surfaces وArgenta وBenadresa وAlaplana وMayolica وVidrepur. زوروا معرضنا في المنصور، بغداد.",
  en: "Midpoint is the official agent in Iraq for nine European and Japanese brands: Roca, TOTO, Laminam, Infinity Surfaces, Argenta, Benadresa, Alaplana, Mayolica and Vidrepur. Visit our showroom in Al-Mansour, Baghdad.",
};
