import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";
import { ServicesList } from "@/components/services/services-list";

export function ServicesShowcase() {
  return (
    <section className="shell-y border-t border-brand-line bg-brand-paper">
      <div className="shell">
        <RevealText>
          <SectionLabel index="06">Services</SectionLabel>
        </RevealText>
        <RevealText delay={0.1} className="mt-4">
          <h2 className="max-w-2xl font-heading text-[clamp(1.9rem,3vw+1rem,3.25rem)] leading-[1.05] tracking-tight">
            Our Services
          </h2>
        </RevealText>

        <div className="mt-12">
          <ServicesList />
        </div>
      </div>
    </section>
  );
}
