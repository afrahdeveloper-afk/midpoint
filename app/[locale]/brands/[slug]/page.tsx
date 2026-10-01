import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandPage } from "@/components/brand/BrandPage";
import { BRANDS, brandIndex, SLUGS } from "@/data/brands";
import { BDATA } from "@/data/brand-details";
import { isLocale } from "@/data/i18n";
import { T } from "@/data/translations";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, clip, ldJson, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

/** 9 brands × 2 locales (the locale comes from the parent layout's params). */
export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/brands/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const k = brandIndex(slug);
  if (!isLocale(locale) || k < 0) return {};
  const b = BRANDS[k];
  return pageMetadata({
    locale,
    path: `/brands/${slug}`,
    title: `${b.n} | ${locale === "ar" ? SITE.nameAr : SITE.name}`,
    description: clip(BDATA[slug][locale]),
  });
}

export default async function BrandRoute({ params }: PageProps<"/[locale]/brands/[slug]">) {
  const { locale, slug } = await params;
  const k = brandIndex(slug);
  if (!isLocale(locale) || k < 0) notFound();
  const L = T[locale];
  const crumbs = breadcrumbJsonLd([
    { name: L.nav_home, url: `/${locale}` },
    { name: L.nav_brands, url: `/${locale}#brands` },
    { name: BRANDS[k].n, url: `/${locale}/brands/${slug}` },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(crumbs) }} />
      <BrandPage k={k} />
    </>
  );
}
