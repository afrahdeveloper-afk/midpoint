"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PROJECT_CATEGORIES, type Project } from "@/data/projects";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Arrow } from "@/components/custom/arrow";
import { FilterTabs } from "@/components/custom/filter-tabs";

const FILTERS = ["All", ...PROJECT_CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

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

      <div ref={listRef} className="mt-8 flex flex-col">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            data-cursor="View"
            className="group flex flex-col gap-4 border-b border-brand-line py-8 sm:py-10"
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
          </Link>
        ))}
      </div>
    </div>
  );
}
