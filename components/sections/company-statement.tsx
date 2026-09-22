import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";
import { PhilosophyWords } from "@/components/custom/philosophy-words";

export function CompanyStatement() {
  return (
    <section className="border-t border-brand-line bg-brand-navy text-white">
      <div className="shell shell-y">
        <RevealText>
          <SectionLabel index="07" light>
            Our Philosophy
          </SectionLabel>
        </RevealText>

        <PhilosophyWords light className="mt-10 md:mt-14" />
      </div>
    </section>
  );
}
