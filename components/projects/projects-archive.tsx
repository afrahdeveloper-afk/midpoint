"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PROJECT_CATEGORIES, type Project } from "@/data/projects";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { RevealImage } from "@/components/custom/reveal-image";
import { Arrow } from "@/components/custom/arrow";
import { FilterTabs } from "@/components/custom/filter-tabs";
import { cn } from "@/lib/utils";

const FILTERS = ["All", ...PROJECT_CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

// Cycled per row for an asymmetric, non-grid rhythm rather than uniform cards.
const RATIOS = ["16/10", "4/5", "3/2"];

export function ProjectsArchive({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const listRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [projects, filter],
  );

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const animation = gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
    );

    return () => {
      animation.kill();
    };
  }, [filter, reducedMotion]);

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-start gap-6 border border-dashed border-brand-line px-8 py-20 sm:px-12">
        <span className="label-caps text-brand-muted">
          Portfolio In Development
        </span>
        <p className="max-w-md text-base leading-relaxed text-brand-muted">
          Our project portfolio is being prepared for publication. In the
          meantime, get in touch to discuss materials and solutions for your
          next project.
        </p>
        <Link
          href="/contact-us"
          className="group inline-flex items-center gap-2 label-caps text-brand-blue"
        >
          Contact Us
          <Arrow />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <FilterTabs
        label="Filter projects by category"
        filters={FILTERS}
        active={filter}
        onChange={setFilter}
        className="flex-wrap"
      />

      <div ref={listRef} className="flex flex-col">
        {filtered.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            data-cursor="View"
            className={cn(
              "group flex flex-col gap-6 border-b border-brand-line py-14 sm:py-16",
              index === 0 && "pt-14",
            )}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-4">
                <span className="label-caps text-brand-blue">
                  {project.number}
                </span>
                <h2 className="font-heading text-2xl tracking-tight transition-colors group-hover:text-brand-blue sm:text-3xl md:text-4xl">
                  {project.title}
                </h2>
              </div>
              <Arrow className="mt-1 text-brand-blue" />
            </div>

            <p className="label-caps text-brand-muted">
              {project.category}
              {project.location ? ` — ${project.location}` : ""}
            </p>

            <RevealImage
              src={project.coverImage}
              alt={project.title}
              label={`${project.title} — project image`}
              ratio={RATIOS[index % RATIOS.length]}
              sizes="(min-width: 1024px) 84vw, 100vw"
              wrapperClassName={cn(index % 2 === 1 && "lg:ml-[8%] lg:w-[92%]")}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
