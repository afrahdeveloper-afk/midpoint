import { bySlug } from "@/lib/slug-lookup";

export type Service = {
  slug: string;
  number: string;
  title: string;
  description: string;
  image?: string;
};

export const services: Service[] = [
  {
    slug: "porcelain-ceramic",
    number: "01",
    title: "Porcelain & Ceramic Supply",
    description:
      "Sourcing and supplying porcelain and ceramic surfaces for architectural and interior applications.",
    image: "/services/porcelain-ceramic-lounge.webp",
  },
  {
    slug: "glass-mosaic",
    number: "02",
    title: "Glass Mosaic Supply",
    description:
      "Glass mosaic materials for feature surfaces, wet areas, and detailed architectural finishes.",
    image: "/services/glass-mosaic-spa.webp",
  },
  {
    slug: "sanitary-solutions",
    number: "03",
    title: "Sanitary Solutions",
    description:
      "Sanitary ware and bathroom solutions from established international brands.",
    image: "/services/sanitary-solutions-tub-marble.webp",
  },
  {
    slug: "architects-designers",
    number: "04",
    title: "Architects & Designers Support",
    description:
      "Material guidance and brand access for architects and designers specifying premium surfaces.",
    image: "/services/architects-designers-lounge.jpg",
  },
  {
    slug: "residential-commercial",
    number: "05",
    title: "Residential & Commercial Projects",
    description:
      "Material supply across residential and commercial project scopes.",
    image: "/services/residential-commercial-terrazzo.webp",
  },
];

export const servicesBySlug = bySlug(services);
