import type { Metadata } from "next";
import { products } from "@/data/products";
import { PageHero } from "@/components/custom/page-hero";
import { ProductsGrid } from "@/components/products/products-grid";

export const metadata: Metadata = {
  title: "Products",
  description:
    "A curated selection of architectural materials and solutions chosen for contemporary spaces, lasting performance and refined design.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Products"
        title="Our Products"
        intro="A curated selection of architectural materials and solutions chosen for contemporary spaces, lasting performance and refined design."
      />

      <div className="shell pb-24 md:pb-32">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
