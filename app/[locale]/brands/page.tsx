import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandsSection } from "@/components/home/BrandsSection";
import { isLocale } from "@/data/i18n";
import { T } from "@/data/translations";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, clip, ldJson, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/brands">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const L = T[locale];
  return pageMetadata({
    locale,
    path: "/brands",
    title: `${L.nav_brands} | ${locale === "ar" ? SITE.nameAr : SITE.name}`,
    description: clip(L.brands_p),
  });
}

export default async function BrandsRoute({ params }: PageProps<"/[locale]/brands">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const L = T[locale];
  const crumbs = breadcrumbJsonLd([
    { name: L.nav_home, url: `/${locale}` },
    { name: L.nav_brands, url: `/${locale}/brands` },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(crumbs) }} />
      <main id="main" className="sec-page">
        <BrandsSection />
      </main>
    </>
  );
}
