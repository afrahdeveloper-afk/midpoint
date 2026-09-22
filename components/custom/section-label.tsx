import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  children,
  className,
  light = false,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {index && (
        <span
          className={cn(
            "label-caps",
            light ? "text-white/70" : "text-brand-blue",
          )}
        >
          {index}
        </span>
      )}
      <span
        className={cn(
          "label-caps",
          light ? "text-white/70" : "text-brand-muted",
        )}
      >
        {children}
      </span>
    </div>
  );
}
