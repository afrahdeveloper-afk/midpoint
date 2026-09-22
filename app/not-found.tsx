import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/custom/page-hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { Arrow } from "@/components/custom/arrow";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or may have moved.",
};

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="Error 404"
        title="Page Not Found"
        intro="The page you're looking for doesn't exist or may have moved."
      />
      <section className="shell pb-24 md:pb-32">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 label-caps text-brand-blue"
        >
          Back To Homepage
          <Arrow />
        </Link>
      </section>
      <ContactCta />
    </>
  );
}
