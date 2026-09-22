import type { Metadata } from "next";
import { PageHero } from "@/components/custom/page-hero";
import { ServicesList } from "@/components/services/services-list";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Porcelain & ceramic supply, glass mosaic supply, sanitary solutions, architects & designers support, and residential & commercial project material supply.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero index="06" eyebrow="Services" title="Our Services" />
      <div className="shell pb-24 md:pb-32">
        <ServicesList />
      </div>
    </>
  );
}
