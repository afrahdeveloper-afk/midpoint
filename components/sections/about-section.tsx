import Link from "next/link";
import { RevealText } from "@/components/custom/reveal-text";
import { RevealImage } from "@/components/custom/reveal-image";
import { SectionLabel } from "@/components/custom/section-label";
import { Arrow } from "@/components/custom/arrow";

export function AboutSection() {
  return (
    <section className="shell shell-y border-t border-brand-line">
      <RevealText>
        <SectionLabel index="02">About Us</SectionLabel>
      </RevealText>

      <div className="mt-8 grid gap-x-8 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <RevealText delay={0.1}>
            <h2 className="font-heading text-[clamp(2rem,3vw+1rem,3.75rem)] leading-[1.02] tracking-tight">
              Designing beyond the ordinary
            </h2>
          </RevealText>

          <RevealText delay={0.2} className="mt-8 max-w-md">
            <p className="text-base leading-relaxed text-brand-muted">
              Our company, established in 2019, is based in Baghdad, Iraq,
              with a passion for design excellence.
            </p>
            <p className="mt-5 text-base leading-relaxed text-brand-muted">
              We specialize in importing superior brands to inspire
              designers and architects in crafting spaces that transcend the
              ordinary.
            </p>
          </RevealText>

          <RevealText delay={0.3} className="mt-8">
            <Link
              href="/about-us"
              className="group inline-flex items-center gap-2 label-caps text-brand-blue"
            >
              About Us
              <Arrow />
            </Link>
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
  );
}
