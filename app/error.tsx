"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Arrow } from "@/components/custom/arrow";
import { SectionLabel } from "@/components/custom/section-label";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="shell flex min-h-[70vh] flex-col items-start justify-center gap-8 pt-32 pb-24 md:pt-40 md:pb-32">
      <SectionLabel>Error</SectionLabel>
      <h1 className="max-w-2xl font-heading text-[clamp(2.25rem,4vw+1rem,4.5rem)] leading-[1.02] tracking-tight">
        Something Went Wrong
      </h1>
      <p className="max-w-md text-base leading-relaxed text-brand-muted">
        An unexpected error occurred while loading this page. Please try
        again, or head back to the homepage.
      </p>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
        <button
          type="button"
          onClick={() => reset()}
          className="group inline-flex items-center gap-2 label-caps text-brand-blue"
        >
          Try Again
          <Arrow />
        </button>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 label-caps text-brand-blue"
        >
          Back To Homepage
          <Arrow />
        </Link>
      </div>
    </div>
  );
}
