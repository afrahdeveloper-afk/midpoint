import type { Metadata } from "next";
import { PageHero } from "@/components/custom/page-hero";
import { BrandsList } from "@/components/brands/brands-list";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Superior porcelain, ceramic, glass mosaic, sanitary, and vertical transportation brands imported by Midpoint for architects and designers.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Brands"
        title="Superior Brands For Architects And Designers"
      />
      <div className="shell pb-24 md:pb-32">
        <BrandsList />
      </div>
    </>
  );
}
