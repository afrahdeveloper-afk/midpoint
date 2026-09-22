import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import { RevealImage } from "@/components/custom/reveal-image";
import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";
import { Arrow } from "@/components/custom/arrow";

export function RelatedProjects({ current }: { current: Project }) {
  const related = projects
    .filter(
      (project) =>
        project.category === current.category && project.slug !== current.slug,
    )
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="shell shell-y border-t border-brand-line">
      <RevealText>
        <SectionLabel index="06">Related Projects</SectionLabel>
      </RevealText>

      <div className="mt-10 flex flex-col">
        {related.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            data-cursor="View"
            className={
              "group flex flex-col gap-6 border-b border-brand-line py-10 sm:flex-row sm:items-center sm:gap-10" +
              (index === 0 ? " border-t" : "")
            }
          >
            <RevealImage
              src={project.coverImage}
              alt={project.title}
              label={`${project.title} — project image`}
              ratio="4/5"
              sizes="(min-width: 640px) 224px, 100vw"
              wrapperClassName="w-full shrink-0 sm:w-56"
            />
            <div className="flex flex-1 items-start justify-between gap-6">
              <div>
                <span className="label-caps text-brand-blue">
                  {project.number}
                </span>
                <h3 className="mt-2 font-heading text-2xl tracking-tight transition-colors group-hover:text-brand-blue">
                  {project.title}
                </h3>
                <p className="mt-1 label-caps text-brand-muted">
                  {project.category}
                  {project.location ? ` — ${project.location}` : ""}
                </p>
              </div>
              <Arrow className="mt-2 text-brand-blue" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
