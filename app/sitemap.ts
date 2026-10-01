import type { MetadataRoute } from "next";
import { LOCALES } from "@/data/i18n";
import { SLUGS } from "@/data/brands";
import { SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...SLUGS.map((s) => `/brands/${s}`)];
  const lastModified = new Date();
  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    })),
  );
}
