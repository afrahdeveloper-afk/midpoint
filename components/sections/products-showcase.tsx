import Link from "next/link";
import { productCategories } from "@/data/products";
import { RevealText } from "@/components/custom/reveal-text";
import { RevealImage } from "@/components/custom/reveal-image";
import { SectionLabel } from "@/components/custom/section-label";
import { Arrow } from "@/components/custom/arrow";

export function ProductsShowcase() {
  return (
    <section className="shell shell-y border-t border-brand-line">
      <RevealText>
        <SectionLabel index="04">Our Products</SectionLabel>
      </RevealText>
      <RevealText delay={0.1} className="mt-4">
        <h2 className="max-w-2xl font-heading text-[clamp(1.9rem,3vw+1rem,3.25rem)] leading-[1.05] tracking-tight">
          Materials organized by discipline
        </h2>
      </RevealText>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productCategories.map((category, index) => (
          <Link
            key={category.slug}
            href={`/products/${category.slug}`}
            className="group relative flex flex-col border border-brand-line bg-brand-paper"
          >
            <RevealImage
              delay={(index % 3) * 0.08}
              src={category.image}
              alt={category.name}
              label={`${category.name} — image`}
              ratio="4/5"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="flex items-center justify-between p-6">
              <span className="font-heading text-lg tracking-tight sm:text-xl">
                {category.name}
              </span>
              <Arrow className="text-brand-blue" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
