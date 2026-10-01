import "../globals.css";
import "../body-fonts.css";
import { Suspense } from "react";
import { preload } from "react-dom";
import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { BODY_FONT_PRELOAD, fontVars } from "../fonts";
import { Preloader } from "@/components/chrome/Preloader";
import { Header } from "@/components/chrome/Header";
import { OverlayMenu } from "@/components/chrome/OverlayMenu";
import { Footer } from "@/components/chrome/Footer";
import { WhatsAppConcierge } from "@/components/chrome/WhatsAppConcierge";
import { BrandWipe, SiteEffects } from "@/components/chrome/SiteEffects";
import { dirOf, isLocale, LOCALES } from "@/data/i18n";
import { ldJson, organizationJsonLd } from "@/lib/seo";
import { NO_PRELOADER_SCRIPT } from "@/lib/preloader-mode";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#445D81",
};

/* Without JavaScript: drop the preloader and show everything (the original required JS). */
const NOSCRIPT_CSS =
  "<style>.loader{display:none}body:not(.loaded) .hdr{transform:none;opacity:1}.rv{opacity:1;transform:none}.hero-copy .ln>span,.hero-copy .ln>ul{transform:none}</style>";

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Preload only this locale's body font (Arabic: IBM Plex Sans Arabic, English: Manrope).
  preload(BODY_FONT_PRELOAD[locale], { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return (
    // suppressHydrationWarning: the inline script below may add the "np" class before React hydrates
    <html lang={locale} dir={dirOf(locale)} className={fontVars} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_PRELOADER_SCRIPT }} />
      </head>
      <body className="loading">
        <noscript dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(organizationJsonLd(locale)) }} />
        <Preloader />
        <Header />
        {/* hydrated as separate units (selective hydration); nothing here suspends */}
        <Suspense><OverlayMenu /></Suspense>
        {children}
        <Suspense><Footer locale={locale} /></Suspense>
        <Suspense><WhatsAppConcierge /></Suspense>
        <BrandWipe />
        <SiteEffects />
      </body>
    </html>
  );
}
