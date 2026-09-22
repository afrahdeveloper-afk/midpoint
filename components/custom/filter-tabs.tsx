"use client";

import { cn } from "@/lib/utils";

export function FilterTabs<T extends string>({
  label,
  filters,
  active,
  onChange,
  className,
}: {
  label: string;
  filters: readonly T[];
  active: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <nav
      aria-label={label}
      className={cn(
        "flex items-center gap-6 border-y border-brand-line py-4",
        className,
      )}
    >
      {filters.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          aria-pressed={active === item}
          className={cn(
            "label-caps relative shrink-0 pb-2 transition-colors",
            active === item
              ? "text-brand-blue"
              : "text-brand-muted hover:text-brand-ink",
          )}
        >
          {item}
          <span
            aria-hidden
            className={cn(
              "absolute inset-x-0 -bottom-px h-px bg-brand-blue transition-opacity duration-300",
              active === item ? "opacity-100" : "opacity-0",
            )}
          />
        </button>
      ))}
    </nav>
  );
}
