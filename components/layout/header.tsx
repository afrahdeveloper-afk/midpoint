"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { NAV_ITEMS, SITE_NAME } from "@/lib/site-config";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const items = listRef.current?.querySelectorAll("[data-menu-item]");
    if (!items?.length) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.15,
      },
    );
  }, [open]);

  const inverted = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        inverted
          ? "border-b border-brand-line bg-brand-paper/95 backdrop-blur"
          : "bg-transparent",
      )}
    >
      {!inverted && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 via-black/15 to-transparent md:h-40"
        />
      )}
      <div className="shell relative z-10 flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          aria-label={SITE_NAME}
          className="relative block h-6 w-28 md:h-7 md:w-32"
        >
          <Image
            src="/brand/midpoint-logo-white.png"
            alt=""
            fill
            priority
            sizes="160px"
            className={cn(
              "object-contain object-left transition-opacity duration-500",
              inverted ? "opacity-0" : "opacity-100",
            )}
          />
          <Image
            src="/brand/midpoint-logo-ink.png"
            alt=""
            fill
            sizes="160px"
            className={cn(
              "object-contain object-left transition-opacity duration-500",
              inverted ? "opacity-100" : "opacity-0",
            )}
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "label-caps transition-colors hover:text-brand-blue",
                inverted ? "text-brand-ink" : "text-white/90",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className={cn(
                "flex h-11 w-11 items-center justify-center lg:hidden",
                inverted ? "text-brand-ink" : "text-white",
              )}
            >
              <Menu className="size-5" strokeWidth={1.5} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            // The shadcn default `data-[side=right]:w-3/4` rule outranks a
            // plain `w-full` override on specificity alone, so it needs the
            // important modifier to actually take over.
            className="w-full! max-w-none! border-none bg-brand-navy p-0"
          >
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <SheetDescription className="sr-only">
              Browse the site sections.
            </SheetDescription>

            <div className="shell flex h-full flex-col text-white">
              <div className="flex h-16 items-center justify-between md:h-20">
                <span className="label-caps text-white/60">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center"
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
              </div>

              <ul
                ref={listRef}
                className="flex flex-1 flex-col justify-center-safe gap-1 overflow-y-auto py-8"
              >
                {NAV_ITEMS.map((item) => (
                  <li key={item.href} data-menu-item>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-white/10 py-4 font-heading text-3xl transition-colors hover:text-brand-blue sm:text-4xl"
                    >
                      <span className="label-caps text-white/60 group-hover:text-brand-blue">
                        {item.number}
                      </span>
                      {item.label.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="label-caps pb-10 text-white/50">
                Baghdad / Iraq
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
