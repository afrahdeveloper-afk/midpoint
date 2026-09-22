import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  productCategories,
  productCategoriesBySlug,
  products,
  productsBySlug,
  CATEGORY_BRANDS,
} from "@/data/products";
import { brandsBySlug } from "@/data/brands";
import { PageHero } from "@/components/custom/page-hero";
import { RevealImage } from "@/components/custom/reveal-image";
import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";
import { Arrow } from "@/components/custom/arrow";
import { ContactCta } from "@/components/sections/contact-cta";
import { contactHref } from "@/lib/contact-link";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...productCategories.map((category) => ({ slug: category.slug })),
    ...products.map((product) => ({ slug: product.slug })),
  ];
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = productsBySlug.get(slug);
  if (product) {
    const brand = brandsBySlug.get(product.brand);
    const description =
      product.description ??
      `${product.name}${brand ? ` by ${brand.name}` : ""} — ${product.category} supplied by Midpoint.`;
    return {
      title: product.name,
      description,
      alternates: { canonical: `/products/${product.slug}` },
      openGraph: {
        title: product.name,
        description,
        type: "website",
      },
    };
  }

  const category = productCategoriesBySlug.get(slug);
  if (category) {
    const description =
      category.description ??
      `${category.name} supplied by Midpoint for architectural and interior applications.`;
    return {
      title: category.name,
      description,
      alternates: { canonical: `/products/${category.slug}` },
      openGraph: {
        title: category.name,
        description,
        type: "website",
      },
    };
  }

  return {};
}

function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-2">
          {index > 0 && <span className="label-caps text-brand-muted/50">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="label-caps text-brand-muted transition-colors hover:text-brand-blue"
            >
              {item.label}
            </Link>
          ) : (
            <span className="label-caps text-brand-blue">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  if (productsBySlug.has(slug)) return <ProductDetail slug={slug} />;
  if (productCategoriesBySlug.has(slug)) return <CategoryDetail slug={slug} />;

  notFound();
}

function ProductDetail({ slug }: { slug: string }) {
  const product = productsBySlug.get(slug);
  if (!product) notFound();

  const brand = brandsBySlug.get(product.brand);
  const category = productCategories.find(
    (item) => item.name === product.category,
  );

  const related = products
    .filter(
      (item) =>
        item.slug !== product.slug &&
        (item.brand === product.brand || item.category === product.category),
    )
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={product.name}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Products", href: "/products" },
              category
                ? { label: category.name, href: `/products/${category.slug}` }
                : { label: product.category },
              { label: product.name },
            ]}
          />
        }
        meta={
          <span className="flex flex-wrap items-center gap-3">
            <span className="label-caps text-brand-blue">
              {product.category}
            </span>
            {brand && (
              <>
                <span className="label-caps text-brand-muted/50">—</span>
                <Link
                  href={`/brands/${brand.slug}`}
                  data-cursor="View"
                  className="label-caps text-brand-muted transition-colors hover:text-brand-blue"
                >
                  {brand.name}
                </Link>
              </>
            )}
          </span>
        }
        intro={product.description}
      />

      <section className="shell pb-20 md:pb-28">
        <RevealImage
          src={product.heroImage?.src}
          alt={product.heroImage?.alt ?? product.name}
          label={`${product.name} — image`}
          ratio="21/9"
          sizes="100vw"
          priority
        />
      </section>

      <section className="shell shell-y border-t border-brand-line">
        <RevealText>
          <SectionLabel index="01">Product Information</SectionLabel>
        </RevealText>
        <RevealText delay={0.1} className="mt-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3">
            {brand && (
              <div>
                <dt className="label-caps text-brand-muted">Brand</dt>
                <dd className="mt-2">
                  <Link
                    href={`/brands/${brand.slug}`}
                    data-cursor="View"
                    className="font-heading text-xl tracking-tight transition-colors hover:text-brand-blue"
                  >
                    {brand.name}
                  </Link>
                </dd>
              </div>
            )}
            <div>
              <dt className="label-caps text-brand-muted">Category</dt>
              <dd className="mt-2">
                {category ? (
                  <Link
                    href={`/products/${category.slug}`}
                    data-cursor="View"
                    className="font-heading text-xl tracking-tight transition-colors hover:text-brand-blue"
                  >
                    {product.category}
                  </Link>
                ) : (
                  <span className="font-heading text-xl tracking-tight">
                    {product.category}
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </RevealText>
      </section>

      {product.applications && product.applications.length > 0 && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="02">Applications</SectionLabel>
          </RevealText>
          <RevealText delay={0.1} className="mt-8">
            <ul className="flex flex-wrap gap-3">
              {product.applications.map((item) => (
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

      {product.specifications &&
        Object.keys(product.specifications).length > 0 && (
          <section className="shell shell-y border-t border-brand-line">
            <RevealText>
              <SectionLabel index="03">Specifications</SectionLabel>
            </RevealText>
            <RevealText delay={0.1} className="mt-8">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <dt className="label-caps text-brand-muted">{key}</dt>
                    <dd className="mt-2 font-heading text-xl tracking-tight">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </RevealText>
          </section>
        )}

      {product.gallery && product.gallery.length > 0 && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="04">Gallery</SectionLabel>
          </RevealText>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {product.gallery.map((image, i) => (
              <RevealImage
                key={image.src}
                delay={(i % 2) * 0.1}
                src={image.src}
                alt={image.alt ?? `${product.name} — gallery image ${i + 1}`}
                label={`${product.name} — gallery image ${i + 1}`}
                ratio="4/5"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="05">Related Products</SectionLabel>
          </RevealText>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                data-cursor="View"
                className="group flex flex-col gap-4"
              >
                <RevealImage
                  src={item.heroImage?.src}
                  alt={item.heroImage?.alt ?? item.name}
                  label={`${item.name} — image`}
                  ratio="4/5"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="font-heading text-lg tracking-tight transition-colors group-hover:text-brand-blue">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="shell shell-y border-t border-brand-line">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6 sm:justify-between">
          <Link
            href={category ? `/products/${category.slug}` : "/products"}
            className="group inline-flex items-center gap-2 label-caps text-brand-blue"
          >
            {category ? `Back to ${category.name}` : "Explore Products"}
            <Arrow />
          </Link>
          {brand && (
            <Link
              href={`/brands/${brand.slug}`}
              data-cursor="View"
              className="group inline-flex items-center gap-2 label-caps text-brand-blue"
            >
              View {brand.name}
              <Arrow />
            </Link>
          )}
          <Link
            href={contactHref(
              brand ? `${product.name} by ${brand.name}` : product.name,
            )}
            className="group inline-flex items-center gap-2 label-caps text-brand-blue"
          >
            Enquire About This Product
            <Arrow />
          </Link>
        </div>
      </section>

      <ContactCta
        subtext={`Interested in ${product.name}? Tell us about your project.`}
        ctaLabel="Enquire About This Product"
        href={contactHref(
          brand ? `${product.name} by ${brand.name}` : product.name,
        )}
      />
    </>
  );
}

function CategoryDetail({ slug }: { slug: string }) {
  const category = productCategoriesBySlug.get(slug);
  if (!category) notFound();
  const number = String(productCategories.indexOf(category) + 1).padStart(2, "0");

  const categoryProducts = products.filter(
    (item) => item.category === category.name,
  );

  const supplyingBrands = (CATEGORY_BRANDS[category.name] ?? [])
    .map((brandSlug) => brandsBySlug.get(brandSlug))
    .filter((item) => item !== undefined);

  const relatedCategories = productCategories
    .filter((item) => item.slug !== category.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={category.name}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Products", href: "/products" },
              { label: category.name },
            ]}
          />
        }
        meta={<span className="label-caps text-brand-blue">{number}</span>}
        intro={category.description}
      />

      <section className="shell pb-20 md:pb-28">
        <RevealImage
          src={category.image}
          alt={category.name}
          label={`${category.name} — image`}
          ratio="21/9"
          sizes="100vw"
          priority
        />
      </section>

      {supplyingBrands.length > 0 && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="01">Available Through</SectionLabel>
          </RevealText>
          <RevealText delay={0.1} className="mt-8">
            <ul className="flex flex-wrap gap-x-10 gap-y-4">
              {supplyingBrands.map((brand) => (
                <li key={brand!.slug}>
                  <Link
                    href={`/brands/${brand!.slug}`}
                    data-cursor="View"
                    className="font-heading text-xl tracking-tight transition-colors hover:text-brand-blue sm:text-2xl"
                  >
                    {brand!.name}
                  </Link>
                </li>
              ))}
            </ul>
          </RevealText>
        </section>
      )}

      {category.gallery && category.gallery.length > 0 && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="02">Gallery</SectionLabel>
          </RevealText>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {category.gallery.map((image, i) => (
              <RevealImage
                key={image.src}
                delay={(i % 2) * 0.1}
                src={image.src}
                alt={image.alt ?? `${category.name} — gallery image ${i + 1}`}
                label={`${category.name} — gallery image ${i + 1}`}
                ratio="4/5"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </section>
      )}

      <section className="shell shell-y border-t border-brand-line">
        <RevealText>
          <SectionLabel index="03">Products in {category.name}</SectionLabel>
        </RevealText>
        {categoryProducts.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((item, i) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                data-cursor="View"
                className="group flex flex-col gap-4"
              >
                <RevealImage
                  delay={(i % 3) * 0.08}
                  src={item.heroImage?.src}
                  alt={item.heroImage?.alt ?? item.name}
                  label={`${item.name} — image`}
                  ratio="4/5"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="font-heading text-lg tracking-tight transition-colors group-hover:text-brand-blue">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <RevealText delay={0.1} className="mt-8">
            <p className="max-w-md text-base leading-relaxed text-brand-muted">
              Named products for {category.name} are in preparation.
              {supplyingBrands.length > 0
                ? " In the meantime, explore the brands above or "
                : " In the meantime, "}
              <Link
                href="/contact-us"
                className="text-brand-blue underline-offset-4 hover:underline"
              >
                contact us
              </Link>{" "}
              for current availability.
            </p>
          </RevealText>
        )}
      </section>

      {relatedCategories.length > 0 && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="04">Explore More Materials</SectionLabel>
          </RevealText>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {relatedCategories.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                data-cursor="View"
                className="group flex flex-col gap-4"
              >
                <RevealImage
                  src={item.image}
                  alt={item.name}
                  label={`${item.name} — image`}
                  ratio="4/5"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="font-heading text-lg tracking-tight transition-colors group-hover:text-brand-blue">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <ContactCta
        subtext={`Tell us how ${category.name} fits your next project.`}
        ctaLabel={`Enquire About ${category.name}`}
        href={contactHref(category.name)}
      />
    </>
  );
}
