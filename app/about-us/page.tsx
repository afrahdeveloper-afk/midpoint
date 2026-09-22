import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/custom/page-hero";
import { RevealText } from "@/components/custom/reveal-text";
import { RevealImage } from "@/components/custom/reveal-image";
import { SectionLabel } from "@/components/custom/section-label";
import { PhilosophyWords } from "@/components/custom/philosophy-words";
import { Arrow } from "@/components/custom/arrow";
import { ContactCta } from "@/components/sections/contact-cta";
import { brands } from "@/data/brands";
import { productCategories } from "@/data/products";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Midpoint is an architectural materials and solutions company established in 2019 and based in Baghdad, Iraq.",
  alternates: { canonical: "/about-us" },
};

const pad = (value: number) => String(value).padStart(2, "0");

const FACTS = [
  { label: "Established", value: "2019" },
  { label: "Brands Represented", value: pad(brands.length) },
  { label: "Material Categories", value: pad(productCategories.length) },
  { label: "Selected Projects", value: pad(projects.length) },
];

const DIFFERENTIATORS = [
  {
    title: "Curated International Brands",
    body: "A deliberately small group of manufacturers from Japan, Spain, and Italy, chosen for consistency of finish rather than the size of a catalogue.",
  },
  {
    title: "Architectural Material Expertise",
    body: "Guidance on format, finish, and application, so a surface specified on paper behaves the same way once it reaches the site.",
  },
  {
    title: "Attention To Detail",
    body: "Coherent specification across a whole scheme — from a single bathroom wall to a full building envelope.",
  },
  {
    title: "Working With Designers",
    body: "Support for architects and designers through specification, sampling, and supply, across residential and commercial scopes.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="About Us"
        title="Designing Beyond The Ordinary"
        intro="An architectural materials and solutions company based in Baghdad, importing superior brands for architects and designers."
      />

      <section className="shell pb-20 md:pb-28">
        <RevealText>
          <SectionLabel index="01">Our Story</SectionLabel>
        </RevealText>

        <div className="mt-8 grid gap-x-8 gap-y-12 md:mt-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RevealText delay={0.1}>
              <h2 className="max-w-md font-heading text-[clamp(1.9rem,3vw+1rem,3.25rem)] leading-[1.05] tracking-tight">
                Founded in Baghdad in 2019
              </h2>
            </RevealText>
            <RevealText delay={0.18} className="mt-8">
              <p className="max-w-md text-lg leading-relaxed text-brand-muted">
                Our company, established in 2019, is based in Baghdad, Iraq,
                with a passion for design excellence.
              </p>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-brand-muted">
                We specialize in importing superior brands to inspire
                designers and architects in crafting spaces that transcend
                the ordinary.
              </p>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-brand-muted">
                Our work sits between the people who design a space and the
                materials that define it — porcelain and ceramic surfaces,
                glass mosaic, sanitary ware, and architectural slabs.
              </p>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:col-span-7 lg:grid-cols-5 lg:gap-6">
            <RevealImage
              src="/about/about-primary.webp"
              alt="Minimalist bathroom interior with stone surfaces and a courtyard view"
              label="About — primary architectural image"
              ratio="4/5"
              sizes="(min-width: 1024px) 40vw, 100vw"
              wrapperClassName="lg:col-span-3"
            />
            <RevealImage
              delay={0.15}
              src="/about/about-secondary.jpg"
              alt="Living space interior with large-format stone-look wall tiles"
              label="About — secondary interior image"
              ratio="4/5"
              sizes="(min-width: 1024px) 28vw, 100vw"
              wrapperClassName="lg:col-span-2 lg:mt-12"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-brand-line bg-brand-navy text-white">
        <div className="shell shell-y">
          <RevealText>
            <SectionLabel index="02" light>
              Our Philosophy
            </SectionLabel>
          </RevealText>
          <RevealText delay={0.1} className="mt-4">
            <p className="max-w-lg text-base leading-relaxed text-white/60">
              The principles we hold every material to, before it reaches a
              project.
            </p>
          </RevealText>
          <PhilosophyWords light className="mt-10 md:mt-14" />
        </div>
      </section>

      <section className="shell shell-y border-t border-brand-line">
        <RevealText>
          <SectionLabel index="03">Midpoint In Numbers</SectionLabel>
        </RevealText>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-14 md:grid-cols-4">
          {FACTS.map((fact, index) => (
            <RevealText key={fact.label} delay={0.08 * index}>
              <div className="border-t border-brand-line pt-5">
                <dt className="label-caps text-brand-muted">{fact.label}</dt>
                <dd className="mt-3 font-heading text-[clamp(2.25rem,4vw+0.5rem,3.75rem)] leading-none tracking-tight">
                  {fact.value}
                </dd>
              </div>
            </RevealText>
          ))}
        </dl>
      </section>

      <section className="shell shell-y border-t border-brand-line">
        <RevealText>
          <SectionLabel index="04">What Sets Us Apart</SectionLabel>
        </RevealText>

        <ol className="mt-10 border-b border-brand-line md:mt-14">
          {DIFFERENTIATORS.map((item, index) => (
            <li key={item.title}>
              <RevealText delay={0.06 * index}>
                <div className="grid gap-3 border-t border-brand-line py-8 md:grid-cols-12 md:gap-8 md:py-10">
                  <span className="label-caps text-brand-muted md:col-span-1">
                    {pad(index + 1)}
                  </span>
                  <h3 className="font-heading text-xl tracking-tight md:col-span-4 md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="max-w-xl text-base leading-relaxed text-brand-muted md:col-span-7">
                    {item.body}
                  </p>
                </div>
              </RevealText>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell shell-y border-t border-brand-line">
        <RevealText>
          <SectionLabel index="05">Brands</SectionLabel>
        </RevealText>
        <RevealText delay={0.1} className="mt-4">
          <h2 className="max-w-2xl font-heading text-[clamp(1.9rem,3vw+1rem,3.25rem)] leading-[1.05] tracking-tight">
            Superior brands, imported for architects and designers
          </h2>
        </RevealText>
        <RevealText delay={0.18} className="mt-6">
          <p className="max-w-lg text-base leading-relaxed text-brand-muted">
            {brands.length} brands across sanitary ware, surfaces, and
            vertical transportation.
          </p>
        </RevealText>
        <RevealText delay={0.26} className="mt-8">
          <Link
            href="/brands"
            className="group relative inline-flex items-center gap-2 py-1 label-caps text-brand-blue transition-colors duration-300 hover:text-brand-navy"
          >
            Explore Our Brands
            <Arrow />
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-brand-blue transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
          </Link>
        </RevealText>
      </section>

      <ContactCta />
    </>
  );
}
