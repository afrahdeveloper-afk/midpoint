import { Suspense } from "react";
import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";
import { About } from "@/components/home/About";
import { BrandsSection } from "@/components/home/BrandsSection";
import { ProductsSection } from "@/components/home/ProductsBento";
import { Contact } from "@/components/home/Contact";
import { HomeEffects } from "@/components/home/HomeEffects";
import { isLocale } from "@/data/i18n";
import { homeMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? homeMetadata(locale) : {};
}

/**
 * Each below-the-fold section sits in its own <Suspense> boundary: nothing suspends, but it
 * lets React hydrate the sections as separate, interruptible units (selective hydration)
 * instead of one long main-thread task.
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  return (
    <>
      <main id="main" aria-busy="true">
        <HeroSlider />
        <Suspense><About /></Suspense>
        <Suspense><BrandsSection /></Suspense>
        <Suspense><ProductsSection /></Suspense>
        <Suspense><Contact /></Suspense>
      </main>
      <HomeEffects />
    </>
  );
}
