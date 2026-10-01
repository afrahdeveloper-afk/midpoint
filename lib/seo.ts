import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/data/i18n";
import { BRANDS } from "@/data/brands";
import { HOME_DESCRIPTION, HOME_TITLE, SITE, SITE_URL } from "@/data/site";

const OG_LOCALE: Record<Locale, string> = { ar: "ar_IQ", en: "en_US" };

/**
 * Metadata for a page that exists in both languages.
 * `path` is the locale-less path, e.g. "" (home) or "/brands/roca".
 */
export function pageMetadata({ locale, path, title, description }: { locale: Locale; path: string; title: string; description: string }): Metadata {
  const url = `/${locale}${path}`;
  const languages = Object.fromEntries(LOCALES.map((l) => [l, `/${l}${path}`])) as Record<Locale, string>;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: SITE.name,
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": `/ar${path}` },
    },
    openGraph: {
      type: "website",
      url,
      siteName: locale === "ar" ? SITE.nameAr : SITE.name,
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Midpoint — Inside The Heart" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.jpg"],
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const homeMetadata = (locale: Locale) =>
  pageMetadata({ locale, path: "", title: HOME_TITLE[locale], description: HOME_DESCRIPTION[locale] });

/** Trim to ~160 characters on a word boundary for meta descriptions. */
export function clip(s: string, max = 160) {
  s = s.replace(/\s*\n+\s*/g, " ");
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,،.;:]$/, "") + "…";
}

const ADDRESS: Record<Locale, { streetAddress: string; addressLocality: string; addressRegion: string }> = {
  en: { streetAddress: "Baghdad Tower, Godiya Plaza", addressLocality: "Al-Mansour", addressRegion: "Baghdad" },
  ar: { streetAddress: "برج بغداد، مجمع جوديا بلازا", addressLocality: "المنصور", addressRegion: "بغداد" },
};

/** Organization + LocalBusiness (the Baghdad showroom). */
export function organizationJsonLd(locale: Locale) {
  const sameAs = Object.values(SITE.social);
  const org = `${SITE_URL}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: SITE.name,
        alternateName: [SITE.nameAr, SITE.legalName],
        legalName: SITE.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        image: `${SITE_URL}/og.jpg`,
        email: SITE.email,
        telephone: `+${SITE.phone}`,
        foundingDate: SITE.foundingYear,
        sameAs,
        brand: BRANDS.map((b) => ({ "@type": "Brand", name: b.n, url: b.url })),
      },
      {
        "@type": ["LocalBusiness", "HomeGoodsStore"],
        "@id": `${SITE_URL}/#showroom`,
        name: locale === "ar" ? `${SITE.nameAr} — ${SITE.name}` : SITE.name,
        description: HOME_DESCRIPTION[locale],
        url: `${SITE_URL}/${locale}`,
        image: `${SITE_URL}/og.jpg`,
        logo: `${SITE_URL}/icon.png`,
        telephone: `+${SITE.phone}`,
        email: SITE.email,
        parentOrganization: { "@id": org },
        address: { "@type": "PostalAddress", ...ADDRESS[locale], addressCountry: SITE.address.country },
        hasMap: SITE.maps,
        areaServed: { "@type": "Country", name: "Iraq" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "09:00",
            closes: "20:00",
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${SITE.phone}`,
          contactType: "sales",
          availableLanguage: ["Arabic", "English"],
        },
        sameAs,
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.url}` })),
  };
}

/** Serialise JSON-LD safely inside <script> (escape "<"). */
export const ldJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
