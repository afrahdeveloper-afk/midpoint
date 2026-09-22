import { cn } from "@/lib/utils";

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("size-4 shrink-0", className)}
    >
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="5"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={1.5} />
      <circle cx="16.85" cy="7.15" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("size-4 shrink-0", className)}
    >
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="5"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M13.4 9.6h1.35V7.5h-1.35c-1.32 0-2.4 1.08-2.4 2.4v1.1H9.5v2h1.5v4.9h2.1v-4.9h1.5l.25-2h-1.75v-1.1c0-.28.22-.4.3-.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
