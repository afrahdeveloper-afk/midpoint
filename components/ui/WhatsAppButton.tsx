"use client";

import { WHATSAPP_URL } from "@/lib/site-config";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.51 3.62 1.4 5.12L2 22l5.13-1.48a9.83 9.83 0 0 0 4.91 1.32h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.06h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.05.88.88-2.97-.2-.31a8.14 8.14 0 0 1-1.27-4.42c0-4.51 3.67-8.18 8.19-8.18 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 0 1 2.4 5.79c0 4.52-3.68 8.19-8.19 8.19Zm4.49-6.13c-.25-.12-1.45-.71-1.67-.79-.22-.08-.39-.12-.55.13-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.24-.02-.38.11-.5.12-.12.28-.31.42-.47.14-.16.19-.27.28-.45.09-.18.05-.34-.02-.47-.07-.13-.63-1.52-.87-2.08-.19-.44-.39-.44-.55-.45h-.47c-.16 0-.42.06-.64.31-.22.24-.85.83-.85 2.02s.87 2.35 1 2.51c.12.16 1.7 2.6 4.12 3.54 2.42.94 2.42.63 2.86.59.44-.04 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.23-.17-.48-.28Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const reducedMotion = useReducedMotion();

  if (!WHATSAPP_URL) return null;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Midpoint on WhatsApp"
      className={cn(
        "group fixed z-50 flex items-center rounded-full border border-brand-blue/40 bg-brand-navy text-white shadow-lg",
        "bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5",
        "md:bottom-8 md:right-8",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-paper",
        !reducedMotion && "md:hover:scale-[1.04] transition-transform duration-300 ease-out",
      )}
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <WhatsAppIcon className="h-6 w-6" />
      </span>
      <span
        className={cn(
          "label-caps max-w-0 overflow-hidden whitespace-nowrap opacity-0",
          "md:group-hover:max-w-[10rem] md:group-hover:pr-5 md:group-hover:opacity-100",
          "md:group-focus-visible:max-w-[10rem] md:group-focus-visible:pr-5 md:group-focus-visible:opacity-100",
          !reducedMotion && "transition-[max-width,padding,opacity] duration-300 ease-out",
        )}
      >
        Chat on WhatsApp
      </span>
    </a>
  );
}
