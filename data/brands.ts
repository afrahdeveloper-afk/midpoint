import { bySlug } from "@/lib/slug-lookup";

export type Brand = {
  slug: string;
  name: string;
  category: string;
  /** Hero / editorial photography, supplied by Midpoint. Left unset when no
   * licensed imagery is available — never populated with scraped photos. */
  image?: string;
  /** Brand logo mark. Not yet available for any brand. */
  logo?: string;
  /** Verified only via the brand's official site/documentation. */
  country?: string;
  description?: string;
  /** Controlled vocabulary: Residential, Hospitality, Commercial, Bathrooms,
   * Kitchens, Walls, Floors, Outdoor, Furniture — only where verified. */
  applications?: string[];
  productCategories?: string[];
  collections?: string[];
  gallery?: string[];
};

export const brands: Brand[] = [
  {
    slug: "fuji",
    name: "Fuji Elevators & Escalators",
    category: "Elevators & Escalators",
    // Identity unconfirmed: several unrelated companies (Japan's Fujitec and
    // multiple Chinese manufacturers) operate under the "Fuji" elevator
    // name. Which one Midpoint represents has not been verified, so no
    // country/history/collections are included — see project notes.
  },
  {
    slug: "veion",
    name: "VEION Elevators",
    category: "Elevators & Escalators",
    // The only distinct "VEION" match found (Riyadh, Saudi Arabia) describes
    // itself as an elevator operation/maintenance service, not a product
    // manufacturer — a mismatch with how this brand is used here, so it has
    // not been treated as confirmed.
  },
  {
    slug: "toto",
    name: "TOTO",
    category: "Sanitary Ware",
    image: "/brands/toto-smart-toilet.jpg",
    country: "Japan",
    description:
      "TOTO is a Japanese manufacturer of sanitary ware and bathroom technology, founded in 1917 and headquartered in Kitakyushu, Japan.",
    applications: ["Bathrooms", "Residential", "Commercial"],
    productCategories: ["Washlet Toilets", "Faucets", "Showers", "Lavatories"],
    collections: ["Washlet", "Washlet+", "Neorest"],
  },
  {
    slug: "roca",
    name: "Roca",
    category: "Sanitary Ware",
    image: "/brands/roca-bathroom-suite.jpg",
    country: "Spain",
    description:
      "Roca is a Spanish manufacturer of bathroom spaces, founded in 1917 in Gavà, Barcelona.",
    applications: ["Bathrooms", "Residential", "Hospitality", "Furniture"],
    productCategories: [
      "Sanitary Ware",
      "Faucets",
      "Bathroom Furniture",
      "Smart Toilets",
    ],
    collections: ["Meridian", "Kay", "Ohtake", "Targa", "Avant"],
  },
  {
    slug: "infinity",
    name: "Infinity",
    category: "Architectural Surfaces",
    image: "/brands/infinity-marble-kitchen-bar.webp",
    country: "Italy",
    description:
      "Infinity is a large-format porcelain slab brand from Gruppo Concorde, based in Pavullo, in the province of Modena, Italy.",
    applications: [
      "Walls",
      "Floors",
      "Kitchens",
      "Bathrooms",
      "Furniture",
      "Commercial",
      "Outdoor",
    ],
    productCategories: ["Large-Format Porcelain Slabs"],
    collections: ["Ginza", "Holos", "Arkèon"],
  },
  {
    slug: "ab",
    name: "AB",
    category: "Porcelain Tiles",
    image: "/brands/ab-marble-slab-lounge.jpg",
    country: "Spain",
    description:
      "AB (Azulejos Benadresa, S.L.) is a Spanish manufacturer of porcelain and ceramic tiles, with products present in more than a hundred countries.",
    applications: ["Bathrooms", "Kitchens", "Commercial", "Hospitality", "Outdoor"],
    productCategories: ["Porcelain Tiles", "Large-Format Slabs"],
    collections: ["Tessino", "Ravena", "Icaro", "Toga", "Aura"],
  },
  {
    slug: "laminam",
    name: "Laminam",
    category: "Architectural Surfaces",
    image: "/brands/laminam-terrazzo-kitchen.jpg",
    gallery: [
      "/brands/laminam-rooftop-pool-cladding.jpg",
      "/brands/laminam-lounge-wall-cladding.jpg",
    ],
    country: "Italy",
    description:
      "Laminam is an Italian manufacturer of large-format, ultra-thin ceramic surfaces, headquartered in Fiorano Modenese, Italy.",
    applications: ["Kitchens", "Walls", "Floors", "Outdoor", "Furniture", "Commercial"],
    productCategories: ["Large-Format Ceramic Slabs"],
    collections: [
      "I Naturali",
      "Blend",
      "Oxide",
      "Calce",
      "Filo",
      "Slate",
    ],
  },
  {
    slug: "alaplana",
    name: "Alaplana",
    category: "Ceramic & Porcelain",
    image: "/brands/alaplana-lapado-structech.jpg",
    country: "Spain",
    description:
      "Alaplana is a Spanish manufacturer of porcelain stoneware flooring and ceramic wall tiles, based in the Castellón region.",
    applications: ["Walls", "Floors"],
    productCategories: ["Porcelain Stoneware Flooring", "Ceramic Wall Tiles"],
  },
  {
    slug: "vidrepur",
    name: "Vidrepur",
    category: "Glass Mosaic",
    image: "/brands/vidrepur-glitter-mosaic-bathroom.webp",
    country: "Spain",
    description:
      "Vidrepur is a Spanish manufacturer of glass mosaic, based in Castellón.",
    applications: [
      "Bathrooms",
      "Walls",
      "Floors",
      "Outdoor",
      "Hospitality",
      "Commercial",
    ],
    productCategories: ["Glass Mosaic"],
    collections: [
      "Oasis",
      "Estelar",
      "Glitter",
      "Level",
      "Breeze",
      "Eden",
      "Tender",
      "Soul",
    ],
  },
];

export const brandsBySlug = bySlug(brands);
