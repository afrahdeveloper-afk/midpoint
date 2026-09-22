"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { productCategories, CATEGORY_BRANDS, type Product } from "@/data/products";
import { brandsBySlug } from "@/data/brands";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { RevealImage } from "@/components/custom/reveal-image";
import { Arrow } from "@/components/custom/arrow";
import { FilterTabs } from "@/components/custom/filter-tabs";

const FILTERS = ["All", ...productCategories.map((category) => category.name)] as const;
type Filter = (typeof FILTERS)[number];

export function ProductsGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const featured = useMemo(() => products.filter((product) => product.featured), [products]);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? products
        : products.filter((product) => product.category === filter),
    [products, filter],
  );

  const availableBrands = (CATEGORY_BRANDS[filter] ?? [])
    .map((slug) => brandsBySlug.get(slug))
    .filter((brand) => brand !== undefined);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const animation = gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
    );

    return () => {
      animation.kill();
    };
  }, [filter, reducedMotion]);

  return (
    <div>
      {featured.length === 0 ? (
        <div className="mb-14 flex flex-col items-start gap-3 border border-dashed border-brand-line px-6 py-8 sm:px-8">
          <span className="label-caps text-brand-muted">
            Featured Selection — In Curation
          </span>
          <p className="max-w-md text-sm leading-relaxed text-brand-muted">
            We&apos;re preparing a curated featured selection. Browse the full
            catalogue below in the meantime.
          </p>
        </div>
      ) : (
        <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} ratio="4/5" />
          ))}
        </div>
      )}

      <FilterTabs
        label="Filter products by category"
        filters={FILTERS}
        active={filter}
        onChange={setFilter}
        className="-mx-5 overflow-x-auto px-5 whitespace-nowrap sm:mx-0 sm:flex-wrap sm:px-0"
      />

      <div ref={gridRef}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-start gap-4 py-16">
            <span className="label-caps text-brand-muted">
              Named products for {filter} are in preparation
            </span>
            {availableBrands.length > 0 && (
              <p className="max-w-md text-base leading-relaxed text-brand-muted">
                Available through{" "}
                {availableBrands.map((brand, i) => (
                  <span key={brand!.slug}>
                    {i > 0 && ", "}
                    <Link
                      href={`/brands/${brand!.slug}`}
                      className="text-brand-blue underline-offset-4 hover:underline"
                    >
                      {brand!.name}
                    </Link>
                  </span>
                ))}
                .
              </p>
            )}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                ratio="4/5"
                delay={(index % 3) * 0.08}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  ratio,
  delay,
}: {
  product: Product;
  ratio: string;
  delay?: number;
}) {
  const brand = brandsBySlug.get(product.brand);

  return (
    <Link
      href={`/products/${product.slug}`}
      data-cursor="View"
      className="group flex flex-col gap-4"
    >
      <RevealImage
        delay={delay}
        src={product.heroImage?.src}
        alt={product.heroImage?.alt ?? product.name}
        label={`${product.name} — image`}
        ratio={ratio}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="block font-heading text-lg tracking-tight transition-colors group-hover:text-brand-blue sm:text-xl">
            {product.name}
          </span>
          <span className="mt-1 block label-caps text-brand-muted">
            {product.category}
            {brand ? ` — ${brand.name}` : ""}
          </span>
        </div>
        <Arrow className="mt-1 text-brand-blue" />
      </div>
    </Link>
  );
}
