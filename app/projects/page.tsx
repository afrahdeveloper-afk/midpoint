import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectsArchive } from "@/components/projects/projects-archive";
import { RevealText } from "@/components/custom/reveal-text";
import { SectionLabel } from "@/components/custom/section-label";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected residential, hospitality, and commercial projects supplied by Midpoint.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="shell pt-32 pb-24 md:pt-40 md:pb-32">
      <RevealText>
        <SectionLabel>Projects</SectionLabel>
      </RevealText>
      <RevealText delay={0.1} className="mt-4">
        <h1 className="max-w-3xl font-heading text-[clamp(2.25rem,4vw+1rem,4.5rem)] leading-[1.02] tracking-tight">
          Selected Projects
        </h1>
      </RevealText>

      <div className="mt-14">
        <ProjectsArchive projects={projects} />
      </div>
    </div>
  );
}
