import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, servicesBySlug } from "@/data/services";
import { productCategoriesBySlug } from "@/data/products";
import { PageHero } from "@/components/custom/page-hero";
import { RevealImage } from "@/components/custom/reveal-image";
import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";
import { Arrow } from "@/components/custom/arrow";
import { ContactCta } from "@/components/sections/contact-cta";
import { contactHref } from "@/lib/contact-link";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

// Explicit, name-grounded correspondence rather than fuzzy matching —
// only services that genuinely reference a specific material get a link.
const SERVICE_PRODUCT_MAP: Record<string, string[]> = {
  "porcelain-ceramic": ["porcelain-tiles", "ceramic-tiles"],
  "glass-mosaic": ["glass-mosaic"],
  "sanitary-solutions": ["sanitary-ware"],
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesBySlug.get(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesBySlug.get(slug);
  if (!service) notFound();

  const relatedProducts = (SERVICE_PRODUCT_MAP[service.slug] ?? [])
    .map((productSlug) => productCategoriesBySlug.get(productSlug))
    .filter((product) => product !== undefined);

  return (
    <>
      <PageHero
        index="06"
        eyebrow="Services"
        title={service.title}
        meta={<span className="label-caps text-brand-blue">{service.number}</span>}
        intro={service.description}
      />

      <section className="shell pb-20 md:pb-28">
        <RevealImage
          src={service.image}
          alt={service.title}
          label={`${service.title} — service image`}
          ratio="21/9"
          sizes="100vw"
        />
      </section>

      {relatedProducts.length > 0 && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="04">Related Materials</SectionLabel>
          </RevealText>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
            {relatedProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                data-cursor="View"
                className="group flex flex-col gap-4"
              >
                <RevealImage
                  src={product.image}
                  alt={product.name}
                  label={`${product.name} — image`}
                  ratio="4/5"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="flex items-center justify-between font-heading text-lg tracking-tight transition-colors group-hover:text-brand-blue">
                  {product.name}
                  <Arrow className="text-brand-blue" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <ContactCta
        subtext={`Tell us about your project — we'll advise on ${service.title}.`}
        ctaLabel="Discuss Your Project"
        href={contactHref(service.title)}
      />
    </>
  );
}
