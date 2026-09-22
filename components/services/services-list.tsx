"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { MediaFrame } from "@/components/custom/media-frame";
import { Arrow } from "@/components/custom/arrow";
import { cn } from "@/lib/utils";

export function ServicesList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const active = services[activeIndex];

  useEffect(() => {
    const el = imageWrapRef.current;
    if (!el) return;
    if (reducedMotion) {
      gsap.set(el, { opacity: 1 });
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" },
    );
  }, [activeIndex, reducedMotion]);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="hidden lg:block">
        <div ref={imageWrapRef} className="sticky top-28">
          <MediaFrame
            src={active.image}
            alt={active.title}
            label={`${active.title} — service image`}
            ratio="4/5"
          />
        </div>
      </div>

      <ul className="divide-y divide-brand-line">
        {services.map((service, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                data-cursor="View"
                className="group flex w-full items-start gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    "label-caps pt-1 transition-colors",
                    isActive ? "text-brand-blue" : "text-brand-muted",
                  )}
                >
                  {service.number}
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "block font-heading text-xl transition-colors sm:text-2xl",
                      isActive ? "text-brand-blue" : "text-brand-ink",
                    )}
                  >
                    {service.title}
                  </span>
                  {isActive && (
                    <span className="mt-2 hidden max-w-md text-sm leading-relaxed text-brand-muted lg:block">
                      {service.description}
                    </span>
                  )}
                </span>
                <Arrow
                  className={cn(
                    "mt-2 transition-colors",
                    isActive
                      ? "translate-x-1 text-brand-blue"
                      : "text-brand-muted",
                  )}
                />
              </Link>

              <div className="pb-6 lg:hidden">
                <MediaFrame
                  src={service.image}
                  alt={service.title}
                  label={`${service.title} — service image`}
                  ratio="16/10"
                />
                <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-muted">
                  {service.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
