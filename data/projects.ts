import { bySlug } from "@/lib/slug-lookup";

export type ProjectCategory = "Residential" | "Hospitality" | "Commercial";

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: ProjectCategory;
  location?: string;
  year?: string;
  coverImage: string;
  description?: string;
  materials?: string[];
  gallery?: string[];
  /** Marks a project for the homepage showcase. Falls back to array order when unset. */
  featured?: boolean;
};

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Residential",
  "Hospitality",
  "Commercial",
];

export const projects: Project[] = [
  {
    slug: "al-dallah-residences",
    number: "01",
    title: "Al Dallah Residences",
    category: "Residential",
    location: "Baghdad",
    year: "2024",
    coverImage: "/projects/al-dallah-residences.webp",
    featured: true,
  },
  {
    slug: "al-andolus-park",
    number: "02",
    title: "Al-Andolus Park",
    category: "Hospitality",
    location: "Baghdad",
    year: "2024",
    coverImage: "/projects/al-andolus-park.webp",
    featured: true,
  },
  {
    slug: "baghdad-mall-hotel",
    number: "03",
    title: "Baghdad Mall Hotel",
    category: "Commercial",
    location: "Baghdad",
    year: "2024",
    coverImage: "/projects/baghdad-mall-hotel.webp",
    featured: true,
  },
  {
    slug: "land-rover-company",
    number: "04",
    title: "Land Rover Company",
    category: "Commercial",
    location: "Baghdad",
    year: "2024",
    coverImage: "/projects/land-rover-company.webp",
  },
  {
    slug: "smart-bus-stop",
    number: "05",
    title: "Smart Bus Stop",
    category: "Commercial",
    location: "Baghdad",
    year: "2024",
    coverImage: "/projects/smart-bus-stop.webp",
  },
];

export const projectsBySlug = bySlug(projects);
