"use client";
import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useIsHome, useLocale } from "@/lib/hooks";
import { useGoBrand } from "@/lib/nav";
import type { SectionKey } from "@/lib/store";

type AnchorProps = Omit<ComponentProps<"a">, "href">;

/**
 * Link to a home-page section. On the home page it is a plain `#section` anchor
 * (native smooth scroll, like the original); elsewhere it routes to `/[locale]#section`.
 */
export function SecLink({ sec, ...rest }: AnchorProps & { sec: SectionKey }) {
  const home = useIsHome();
  const locale = useLocale();
  if (home) return <a href={`#${sec}`} {...rest} />;
  return <Link href={`/${locale}#${sec}`} {...rest} />;
}

/**
 * Link to /[locale]/brands/[slug]; plays the slab wipe when coming from another brand page.
 * `prefetch={false}` for links that sit in hidden UI (the menu), so they don't all prefetch on load.
 */
export function BrandLink({ slug, onClick, prefetch, ...rest }: AnchorProps & { slug: string; prefetch?: boolean }) {
  const locale = useLocale();
  const goBrand = useGoBrand();
  return (
    <Link
      href={`/${locale}/brands/${slug}`}
      prefetch={prefetch}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) goBrand(slug, e);
      }}
      {...rest}
    />
  );
}
