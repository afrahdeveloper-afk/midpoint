import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about-section";
import { BrandsShowcase } from "@/components/sections/brands-showcase";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { CompanyStatement } from "@/components/sections/company-statement";
import { HomeContactCta } from "@/components/sections/home-contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <BrandsShowcase />
      <ProductsShowcase />
      <ProjectsShowcase />
      <ServicesShowcase />
      <CompanyStatement />
      <HomeContactCta />
    </>
  );
}
