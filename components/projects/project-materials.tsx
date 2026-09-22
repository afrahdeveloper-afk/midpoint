import { productCategories } from "@/data/products";
import { MediaFrame } from "@/components/custom/media-frame";
import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";

export function ProjectMaterials({ materials }: { materials: string[] }) {
  return (
    <section className="shell shell-y border-t border-brand-line">
      <RevealText>
        <SectionLabel index="04">Materials &amp; Products</SectionLabel>
      </RevealText>

      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {materials.map((name) => {
          const match = productCategories.find(
            (product) => product.name.toLowerCase() === name.toLowerCase(),
          );
          return (
            <div key={name} className="flex flex-col gap-3">
              <MediaFrame
                src={match?.image}
                alt={name}
                label={name}
                ratio="4/5"
              />
              <span className="label-caps text-brand-ink">{name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
