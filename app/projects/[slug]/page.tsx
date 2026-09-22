import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, projectsBySlug } from "@/data/projects";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectMaterials } from "@/components/projects/project-materials";
import { RelatedProjects } from "@/components/projects/related-projects";
import { ContactCta } from "@/components/sections/contact-cta";
import { contactHref } from "@/lib/contact-link";
import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsBySlug.get(slug);
  if (!project) return {};

  return {
    title: project.title,
    description:
      project.description ??
      `${project.title} — ${project.category}${
        project.location ? ` in ${project.location}` : ""
      }.`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsBySlug.get(slug);
  if (!project) notFound();

  const hasInfo = Boolean(
    project.location || project.year || project.materials?.length,
  );

  return (
    <>
      <ProjectHero project={project} />

      {project.description && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="02">Introduction</SectionLabel>
          </RevealText>
          <RevealText delay={0.1} className="mt-6">
            <p className="max-w-3xl font-heading text-[clamp(1.5rem,2.2vw+1rem,2.75rem)] leading-[1.25] tracking-tight">
              {project.description}
            </p>
          </RevealText>
        </section>
      )}

      {hasInfo && (
        <section className="shell shell-y border-t border-brand-line">
          <RevealText>
            <SectionLabel index="03">Project Information</SectionLabel>
          </RevealText>
          <RevealText delay={0.1}>
            <dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="label-caps text-brand-muted">Category</dt>
                <dd className="mt-2 font-heading text-xl">
                  {project.category}
                </dd>
              </div>
              {project.location && (
                <div>
                  <dt className="label-caps text-brand-muted">Location</dt>
                  <dd className="mt-2 font-heading text-xl">
                    {project.location}
                  </dd>
                </div>
              )}
              {project.year && (
                <div>
                  <dt className="label-caps text-brand-muted">Year</dt>
                  <dd className="mt-2 font-heading text-xl">
                    {project.year}
                  </dd>
                </div>
              )}
              {project.materials && project.materials.length > 0 && (
                <div>
                  <dt className="label-caps text-brand-muted">Materials</dt>
                  <dd className="mt-2 flex flex-col gap-1">
                    {project.materials.map((material) => (
                      <span key={material} className="font-heading text-xl">
                        {material}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </RevealText>
        </section>
      )}

      {project.materials && project.materials.length > 0 && (
        <ProjectMaterials materials={project.materials} />
      )}

      {project.gallery && project.gallery.length > 0 && (
        <ProjectGallery images={project.gallery} title={project.title} />
      )}

      <RelatedProjects current={project} />

      <ContactCta
        subtext="Have a similar project in mind? Let's talk."
        ctaLabel="Discuss a Similar Project"
        href={contactHref(`a project similar to ${project.title}`)}
      />
    </>
  );
}
