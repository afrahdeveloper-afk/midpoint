import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { isLocale } from "@/data/i18n";
import { T } from "@/data/translations";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, ldJson, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const L = T[locale];
  return pageMetadata({
    locale,
    path: "/projects",
    title: `${L.nav_projects} | ${locale === "ar" ? SITE.nameAr : SITE.name}`,
    description: L.pj_pv,
  });
}

export default async function ProjectsRoute({ params }: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const L = T[locale];
  const crumbs = breadcrumbJsonLd([
    { name: L.nav_home, url: `/${locale}` },
    { name: L.nav_projects, url: `/${locale}/projects` },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(crumbs) }} />
      <main id="main" className="pj-page">
        <ProjectsSection />
      </main>
    </>
  );
}
