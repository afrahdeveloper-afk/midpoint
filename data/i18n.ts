export const LOCALES = ["ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** Arabic is the default: "/" redirects to "/ar" (see proxy.ts). */
export const DEFAULT_LOCALE: Locale = "ar";

/** Cookie that remembers the visitor's last language choice (replaces localStorage "mp-lang"). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const isLocale = (v: string | undefined | null): v is Locale => v === "ar" || v === "en";

export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

export const otherLocale = (l: Locale): Locale => (l === "ar" ? "en" : "ar");
