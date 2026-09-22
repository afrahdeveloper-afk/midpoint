import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import { RevealText } from "@/components/custom/reveal-text";
import { RevealImage } from "@/components/custom/reveal-image";
import { SectionLabel } from "@/components/custom/section-label";
import { Arrow } from "@/components/custom/arrow";

// Prefer explicitly-marked projects; fall back to array order while the
// featured flag is still unused. Capped at one featured + two secondary.
function getFeaturedProjects(list: Project[]) {
  const marked = list.filter((project) => project.featured);
  return (marked.length > 0 ? marked : list).slice(0, 3);
}

function ProjectCaption({
  number,
  title,
  category,
  location,
  delay,
}: {
  number: string;
  title: string;
  category: string;
  location?: string;
  delay: number;
}) {
  return (
    <RevealText delay={delay} className="mt-6 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="label-caps text-brand-blue">{number}</span>
          <h3 className="font-heading text-xl tracking-tight transition-colors group-hover:text-brand-blue sm:text-2xl">
            {title}
          </h3>
        </div>
        <Arrow className="mt-1 shrink-0 text-brand-blue" />
      </div>
      <p className="label-caps text-brand-muted">
        {category}
        {location ? ` — ${location}` : ""}
      </p>
    </RevealText>
  );
}

export function ProjectsShowcase() {
  const featured = getFeaturedProjects(projects);
  const hasFeatured = featured.length > 0;
  const [primaryProject, ...secondaryProjects] = featured;

  return (
    <section className="shell shell-y border-t border-brand-line">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <RevealText>
            <SectionLabel index="05">Projects</SectionLabel>
          </RevealText>
          <RevealText delay={0.1} className="mt-4">
            <h2 className="max-w-2xl font-heading text-[clamp(1.9rem,3vw+1rem,3.25rem)] leading-[1.05] tracking-tight">
              Selected Projects
            </h2>
          </RevealText>
        </div>
        <RevealText delay={0.15} className="max-w-sm">
          <p className="text-base leading-relaxed text-brand-muted">
            A selection of spaces shaped by architecture, material and
            attention to detail.
          </p>
        </RevealText>
      </div>

      {hasFeatured ? (
        <>
          <div className="mt-14 overflow-hidden">
            <Link
              href={`/projects/${primaryProject.slug}`}
              data-cursor="View"
              className="group block"
            >
              <RevealImage
                src={primaryProject.coverImage}
                alt={primaryProject.title}
                label={`${primaryProject.title} — featured project image`}
                ratio="16/9"
                sizes="100vw"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <ProjectCaption
                number="01"
                title={primaryProject.title}
                category={primaryProject.category}
                location={primaryProject.location}
                delay={0.1}
              />
            </Link>
          </div>

          {secondaryProjects.length > 0 && (
            <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10">
              {secondaryProjects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  data-cursor="View"
                  className="group block"
                >
                  <RevealImage
                    delay={index * 0.12}
                    src={project.coverImage}
                    alt={project.title}
                    label={`${project.title} — project image`}
                    ratio="4/5"
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <ProjectCaption
                    number={String(index + 2).padStart(2, "0")}
                    title={project.title}
                    category={project.category}
                    location={project.location}
                    delay={0.1 + index * 0.12}
                  />
                </Link>
              ))}
            </div>
          )}

          <RevealText delay={0.2} className="mt-16 flex justify-end">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 label-caps text-brand-blue"
            >
              <span className="relative pb-1">
                View All Projects
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand-blue transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </span>
              <Arrow />
            </Link>
          </RevealText>
        </>
      ) : (
        <RevealText delay={0.2} className="mt-12">
          <div className="flex flex-col items-start gap-6 border border-dashed border-brand-line px-8 py-16 sm:px-12">
            <span className="label-caps text-brand-muted">
              Portfolio In Development
            </span>
            <p className="max-w-md text-base leading-relaxed text-brand-muted">
              Our project portfolio is being prepared for publication. In the
              meantime, get in touch to discuss materials and solutions for
              your next project.
            </p>
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-2 label-caps text-brand-blue"
            >
              Contact Us
              <Arrow />
            </Link>
          </div>
        </RevealText>
      )}
    </section>
  );
}
