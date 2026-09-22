import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brands, brandsBySlug } from "@/data/brands";
import { productCategories, products } from "@/data/products";
import { PageHero } from "@/components/custom/page-hero";
import { RevealImage } from "@/components/custom/reveal-image";
import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";
import { Arrow } from "@/components/custom/arrow";
import { ContactCta } from "@/components/sections/contact-cta";
import { contactHref } from "@/lib/contact-link";

type BrandPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = brandsBySlug.get(slug);
  if (!brand) return {};

  const description =
    brand.description ?? `${brand.name} — ${brand.category}, represented by Midpoint.`;

  return {
    title: brand.name,
    description,
    alternates: { canonical: `/brands/${brand.slug}` },
    openGraph: {
      title: brand.name,
      description,
      type: "website",
    },
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = brandsBySlug.get(slug);
  if (!brand) notFound();

  const relatedProduct = productCategories.find(
    (product) => product.name.toLowerCase() === brand.category.toLowerCase(),
  );

  const hasIntroInfo = Boolean(brand.description || brand.country);

  return (
    <>
      <PageHero
        eyebrow="Brands"
        title={brand.name}
        meta={
          <span className="label-caps text-brand-blue">{brand.category}</span>
        }
      />

      <section className="shell pb-20 md:pb-28">
        <RevealImage
          src={brand.image}
          alt={brand.name}
          label={`${brand.name} — brand image`}
          ratio="21/9"
          sizes="100vw"
        />
      </section>

      {hasIntroInfo && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="01">Introduction</SectionLabel>
          </RevealText>
          <div className="mt-8 grid gap-x-8 gap-y-10 lg:grid-cols-12">
            {brand.description && (
              <RevealText delay={0.1} className="lg:col-span-8">
                <p className="max-w-2xl font-heading text-[clamp(1.5rem,2.2vw+1rem,2.5rem)] leading-[1.3] tracking-tight">
                  {brand.description}
                </p>
              </RevealText>
            )}
            <RevealText delay={0.15} className="lg:col-span-4">
              <dl className="flex flex-col gap-6">
                <div>
                  <dt className="label-caps text-brand-muted">Category</dt>
                  <dd className="mt-2 font-heading text-xl">{brand.category}</dd>
                </div>
                {brand.country && (
                  <div>
                    <dt className="label-caps text-brand-muted">Country</dt>
                    <dd className="mt-2 font-heading text-xl">{brand.country}</dd>
                  </div>
                )}
              </dl>
            </RevealText>
          </div>
        </section>
      )}

      {brand.productCategories && brand.productCategories.length > 0 && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="02">Product Focus</SectionLabel>
          </RevealText>
          <RevealText delay={0.1} className="mt-8">
            <ul className="flex flex-wrap gap-x-10 gap-y-4">
              {brand.productCategories.map((item) => {
                const match = productCategories.find(
                  (category) => category.name.toLowerCase() === item.toLowerCase(),
                );
                return (
                  <li
                    key={item}
                    className="font-heading text-xl tracking-tight sm:text-2xl"
                  >
                    {match ? (
                      <Link
                        href={`/products/${match.slug}`}
                        data-cursor="View"
                        className="transition-colors hover:text-brand-blue"
                      >
                        {item}
                      </Link>
                    ) : (
                      item
                    )}
                  </li>
                );
              })}
            </ul>
          </RevealText>
        </section>
      )}

      {brand.applications && brand.applications.length > 0 && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="03">Applications</SectionLabel>
          </RevealText>
          <RevealText delay={0.1} className="mt-8">
            <ul className="flex flex-wrap gap-3">
              {brand.applications.map((item) => (
                <li
                  key={item}
                  className="label-caps border border-brand-line px-4 py-2 text-brand-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </RevealText>
        </section>
      )}

      {brand.collections && brand.collections.length > 0 && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="04">Collections</SectionLabel>
          </RevealText>
          <RevealText delay={0.1} className="mt-8">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
              {brand.collections.map((item) => {
                const match = products.find(
                  (product) =>
                    product.brand === brand.slug &&
                    product.name.toLowerCase() === item.toLowerCase(),
                );
                return (
                  <li
                    key={item}
                    className="border-t border-brand-line pt-4 font-heading text-lg tracking-tight"
                  >
                    {match ? (
                      <Link
                        href={`/products/${match.slug}`}
                        data-cursor="View"
                        className="transition-colors hover:text-brand-blue"
                      >
                        {item}
                      </Link>
                    ) : (
                      item
                    )}
                  </li>
                );
              })}
            </ul>
          </RevealText>
        </section>
      )}

      {brand.gallery && brand.gallery.length > 0 && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="05">Gallery</SectionLabel>
          </RevealText>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {brand.gallery.map((src, i) => (
              <RevealImage
                key={src}
                delay={(i % 2) * 0.1}
                src={src}
                alt={`${brand.name} — gallery image ${i + 1}`}
                label={`${brand.name} — gallery image ${i + 1}`}
                ratio="4/5"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </section>
      )}

      <section className="shell shell-y border-t border-brand-line">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={relatedProduct ? `/products/${relatedProduct.slug}` : "/products"}
            className="group inline-flex items-center gap-2 label-caps text-brand-blue"
          >
            Explore Products
            <Arrow />
          </Link>
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-2 label-caps text-brand-blue"
          >
            Contact Midpoint
            <Arrow />
          </Link>
        </div>
      </section>

      <ContactCta
        subtext={`Tell us how ${brand.name} fits your next project.`}
        ctaLabel="Discuss This Brand"
        href={contactHref(brand.name)}
      />
    </>
  );
}
