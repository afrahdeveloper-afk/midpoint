import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductsSection } from "@/components/home/ProductsBento";
import { isLocale } from "@/data/i18n";
import { T } from "@/data/translations";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, clip, ldJson, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/products">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const L = T[locale];
  return pageMetadata({
    locale,
    path: "/products",
    title: `${L.nav_products} | ${locale === "ar" ? SITE.nameAr : SITE.name}`,
    description: clip(L.prod_p),
  });
}

export default async function ProductsRoute({ params }: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const L = T[locale];
  const crumbs = breadcrumbJsonLd([
    { name: L.nav_home, url: `/${locale}` },
    { name: L.nav_products, url: `/${locale}/products` },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(crumbs) }} />
      <main id="main" className="sec-page">
        <ProductsSection />
      </main>
    </>
  );
}
