import { bySlug } from "@/lib/slug-lookup";

export type ProductImage = {
  src: string;
  /** Falls back to the product/category name when omitted. */
  alt?: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
  image?: string;
  description?: string;
  /** Real photography from verified supplying brands (see CATEGORY_BRANDS) —
   * never a generic/unrelated image added just to fill the section. */
  gallery?: ProductImage[];
};

export const productCategories: ProductCategory[] = [
  {
    slug: "porcelain-tiles",
    name: "Porcelain Tiles",
    image: "/products/porcelain-tiles-lounge.webp",
    gallery: [
      {
        src: "/brands/alaplana-lapado-structech.jpg",
        alt: "Alaplana porcelain stoneware, lapado (polished) finish detail",
      },
    ],
  },
  {
    slug: "ceramic-tiles",
    name: "Ceramic Tiles",
    image: "/brands/alaplana-fluted-tile-bathroom.jpg",
    gallery: [
      {
        src: "/brands/alaplana-fluted-tile-bathroom.jpg",
        alt: "Alaplana fluted ceramic wall tile in a bathroom application",
      },
      {
        src: "/brands/alaplana-patchwork-tile-bathroom.jpg",
        alt: "Alaplana patchwork-pattern ceramic wall tile in a bathroom application",
      },
    ],
  },
  {
    slug: "glass-mosaic",
    name: "Glass Mosaic",
    image: "/products/glass-mosaic-poolside.webp",
    gallery: [
      {
        src: "/brands/vidrepur-glitter-mosaic-bathroom.webp",
        alt: "Vidrepur Glitter glass mosaic in a bathroom application",
      },
    ],
  },
  {
    slug: "sanitary-ware",
    name: "Sanitary Ware",
    image: "/products/sanitary-ware-vanity.jpg",
    gallery: [
      { src: "/brands/toto-smart-toilet.jpg", alt: "TOTO smart toilet, sanitary ware photography" },
      { src: "/brands/roca-bathroom-suite.jpg", alt: "Roca bathroom suite, sanitary ware photography" },
    ],
  },
  {
    slug: "architectural-surfaces",
    name: "Architectural Surfaces",
    // Illustrative real photography supplied for the Infinity brand page —
    // reused here since it depicts an actual large-format slab application,
    // and no dedicated category photograph has been supplied yet.
    image: "/brands/infinity-marble-kitchen-bar.webp",
    gallery: [
      { src: "/brands/ab-marble-slab-lounge.jpg", alt: "AB large-format marble slab in a lounge application" },
      { src: "/brands/laminam-terrazzo-kitchen.jpg", alt: "Laminam large-format slab in a kitchen application" },
      { src: "/brands/laminam-rooftop-pool-cladding.jpg", alt: "Laminam slab cladding on a rooftop pool deck" },
      { src: "/brands/laminam-lounge-wall-cladding.jpg", alt: "Laminam slab wall cladding in a lounge setting" },
    ],
  },
  {
    slug: "elevators-escalators",
    name: "Elevators & Escalators",
    image: "/products/elevators-escalators-cabin.jpg",
  },
];

export const productCategoriesBySlug = bySlug(productCategories);

/**
 * Which verified brands (data/brands.ts) supply each category, derived
 * directly from each brand's own `category`/`productCategories` fields.
 * Used only to surface honest "available through" cross-links — never to
 * imply a category has named products when it doesn't.
 */
export const CATEGORY_BRANDS: Record<string, string[]> = {
  "Porcelain Tiles": ["ab", "alaplana"],
  "Ceramic Tiles": ["alaplana"],
  "Glass Mosaic": ["vidrepur"],
  "Sanitary Ware": ["toto", "roca"],
  "Architectural Surfaces": ["infinity", "ab", "laminam"],
  "Elevators & Escalators": ["fuji", "veion"],
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  /** Brand slug (data/brands.ts). */
  brand: string;
  description?: string;
  heroImage?: ProductImage;
  gallery?: ProductImage[];
  /** Controlled vocabulary — see the Brand type. Only ever set when the
   * source data supports that specific product, never inherited wholesale
   * from the brand's own applications list. */
  applications?: string[];
  /** e.g. Material, Finish, Dimensions, Thickness, Surface, Format,
   * Installation. Only populated from verified spec sheets. */
  specifications?: Record<string, string>;
  featured?: boolean;
};

/**
 * Individual products, generated only from named collections already
 * verified on each brand's page (data/brands.ts `collections`). Photography,
 * descriptions, applications, and specifications are populated only where
 * directly verified against the brand's own official site; otherwise the
 * field is left unset and the UI renders an honest placeholder in its place.
 */
export const products: Product[] = [
  {
    slug: "toto-washlet",
    name: "Washlet",
    category: "Sanitary Ware",
    brand: "toto",
    heroImage: { src: "/images/products/toto/washlet/hero.jpg", alt: "TOTO Washlet" },
  },
  {
    slug: "toto-washlet-plus",
    name: "Washlet+",
    category: "Sanitary Ware",
    brand: "toto",
    heroImage: { src: "/images/products/toto/washlet-plus/hero.jpg", alt: "TOTO Washlet+" },
  },
  {
    slug: "toto-neorest",
    name: "Neorest",
    category: "Sanitary Ware",
    brand: "toto",
    description: "Neorest is TOTO's flagship line, combining the Washlet's integrated bidet function with TOTO's Tornado Flush technology.",
    heroImage: { src: "/images/products/toto/neorest/hero.jpg", alt: "TOTO Neorest" },
    specifications: { Technology: "Tornado Flush" },
  },

  {
    slug: "roca-meridian",
    name: "Meridian",
    category: "Sanitary Ware",
    brand: "roca",
    description:
      "Simplicity, neutral tones and a refined finish define the Meridian collection, balancing functionality and elegance.",
    heroImage: { src: "/images/products/roca/meridian/hero.jpg", alt: "Roca Meridian bathroom collection" },
    gallery: [{ src: "/images/products/roca/meridian/gallery-1.jpg", alt: "Roca Meridian bathroom collection, detail view" }],
  },
  {
    slug: "roca-kay",
    name: "Kay",
    category: "Sanitary Ware",
    brand: "roca",
    description:
      "Kay is a bold reinterpretation of the square-shaped faucet, inspired by clean architectural lines. Designed by Stefan Diez, in cast brass with a Cold Start water-saving feature.",
    heroImage: { src: "/images/products/roca/kay/hero.jpg", alt: "Roca Kay faucet, chrome finish" },
    gallery: [{ src: "/images/products/roca/kay/gallery-1.jpg", alt: "Roca Kay faucet, family of finishes" }],
    specifications: { Material: "Cast brass", Finish: "Chrome, Matte Black, Matte White, Brushed Brass, Brushed Graphite, Stainless Steel", Designer: "Stefan Diez" },
  },
  {
    slug: "roca-ohtake",
    name: "Ohtake",
    category: "Sanitary Ware",
    brand: "roca",
    description:
      "Ohtake favors organic lines and a timeless design, with washbasins inspired by natural forms such as waves and the horizon. Designed by Ruy Ohtake and Rodrigo Ohtake.",
    heroImage: { src: "/images/products/roca/ohtake/hero.jpg", alt: "Roca Ohtake washbasin collection" },
    gallery: [{ src: "/images/products/roca/ohtake/gallery-1.jpg", alt: "Roca Ohtake washbasin collection, detail view" }],
    specifications: { Designer: "Ruy Ohtake, Rodrigo Ohtake" },
  },
  {
    slug: "roca-targa",
    name: "Targa",
    category: "Sanitary Ware",
    brand: "roca",
    description: "Targa is a minimalist faucet collection with strong lines, designed by Ramon Benedito, with a Cold Start default position.",
    heroImage: { src: "/images/products/roca/targa/hero.jpg", alt: "Roca Targa faucet collection" },
    gallery: [{ src: "/images/products/roca/targa/gallery-1.jpg", alt: "Roca Targa faucet collection, detail view" }],
    specifications: { Finish: "Everlux PVD (brushed brass, stainless steel), Evershine chrome, matt black, matt white", Designer: "Ramon Benedito" },
  },
  {
    slug: "roca-avant",
    name: "Avant",
    category: "Sanitary Ware",
    brand: "roca",
    description:
      "Avant is a modern toilet with an integrated cistern hidden inside the bowl, using Roca's Rimless Vortex bowl and Supraglaze coating.",
    heroImage: { src: "/images/products/roca/avant/hero.jpg", alt: "Roca Avant wall-hung toilet, furniture floorstanding configuration" },
    gallery: [{ src: "/images/products/roca/avant/gallery-1.jpg", alt: "Roca Avant toilet, wall-hung minimal configuration" }],
    specifications: { Flush: "Dual flush, 4.5L / 3L", Dimensions: "385 × 565 × 475 mm" },
    applications: ["Bathrooms"],
  },
  {
    slug: "roca-the-gap",
    name: "The Gap",
    category: "Sanitary Ware",
    brand: "roca",
    description:
      "The Gap is Roca's range of bathroom furniture, designed by Antonio Bullo to be compact and functional, with an extensive range of vanity units designed to suit any bathroom environment.",
    heroImage: { src: "/images/products/roca/the-gap/hero.jpg", alt: "Roca The Gap bathroom furniture" },
    gallery: [{ src: "/images/products/roca/the-gap/gallery-1.jpg", alt: "Roca The Gap bathroom furniture, detail view" }],
    specifications: { Designer: "Antonio Bullo" },
    applications: ["Bathrooms"],
  },

  {
    slug: "infinity-ginza",
    name: "Ginza",
    category: "Architectural Surfaces",
    brand: "infinity",
    description:
      "Ginza expresses the geometric rhythm of contemporary design — straight lines, bevelled edges and sharp volumes inspired by oriental architecture.",
    heroImage: {
      src: "/images/products/infinity/ginza/hero.webp",
      alt: "Infinity Ginza large-format porcelain slab, Doro finish",
    },
    gallery: [
      { src: "/images/products/infinity/ginza/gallery-1.webp", alt: "Infinity Ginza, Midori finish" },
      { src: "/images/products/infinity/ginza/gallery-2.webp", alt: "Infinity Ginza, Sorairo finish" },
    ],
    applications: ["Walls", "Bathrooms", "Kitchens", "Furniture"],
    specifications: { Format: "160 × 320 cm", Thickness: "6 mm, 12 mm, 20 mm" },
  },
  {
    slug: "infinity-holos",
    name: "Holos",
    category: "Architectural Surfaces",
    brand: "infinity",
    description:
      "Holos reinterprets mosaic artistry through digital print technology, composing hundreds of pieces into a single large-format surface.",
    heroImage: {
      src: "/images/products/infinity/holos/hero.webp",
      alt: "Infinity Holos, Hyams White finish",
    },
    gallery: [
      { src: "/images/products/infinity/holos/gallery-1.webp", alt: "Infinity Holos, Andaman Emerald finish" },
      { src: "/images/products/infinity/holos/gallery-2.webp", alt: "Infinity Holos, Aegean Blue finish" },
    ],
    applications: ["Walls", "Floors", "Kitchens", "Furniture"],
    specifications: { Format: "160 × 320 cm", Thickness: "6 mm, 12 mm, 20 mm", Finish: "Mosaic effect" },
  },
  {
    slug: "infinity-arkeon",
    name: "Arkèon",
    category: "Architectural Surfaces",
    brand: "infinity",
    description:
      "Arkèon is Infinity's open system of large-format porcelain surfaces for architecture and contract projects, spanning marble, stone, metal and concrete effects.",
    heroImage: {
      src: "/images/products/infinity/arkeon/hero.webp",
      alt: "Infinity Arkèon, Nacra Titanium finish",
    },
    gallery: [
      { src: "/images/products/infinity/arkeon/gallery-1.webp", alt: "Infinity Arkèon, Nacra Bronze finish" },
      { src: "/images/products/infinity/arkeon/gallery-2.webp", alt: "Infinity Arkèon, Fossil finish" },
    ],
    applications: ["Kitchens", "Bathrooms", "Furniture", "Floors", "Walls", "Commercial"],
    specifications: { Format: "160 × 320 cm", Thickness: "6 mm, 12 mm, 20 mm", Finish: "Shantung" },
  },

  {
    slug: "ab-tessino",
    name: "Tessino",
    category: "Porcelain Tiles",
    brand: "ab",
    heroImage: { src: "/images/products/ab/tessino/hero.jpg", alt: "AB Tessino porcelain tile, Ivory polished finish, 260 × 120 cm" },
    gallery: [
      { src: "/images/products/ab/tessino/gallery-1.jpg", alt: "AB Tessino porcelain tile, Black natural finish, 260 × 120 cm" },
    ],
    specifications: {
      Material: "Porcelain",
      Format: "260 × 120, 120 × 120, 80 × 160, 80 × 80, 60 × 120, 60 × 60 cm",
      Finish: "Polished or Natural — Ivory, Smoke, Grey, Bronze, Black",
    },
  },
  {
    slug: "ab-ravena",
    name: "Ravena",
    category: "Porcelain Tiles",
    brand: "ab",
    heroImage: { src: "/images/products/ab/ravena/hero.jpg", alt: "AB Ravena porcelain tile, polished finish, 260 × 120 cm" },
    gallery: [
      { src: "/images/products/ab/ravena/gallery-1.jpg", alt: "AB Ravena porcelain tile, natural finish, 260 × 120 cm" },
      { src: "/images/products/ab/ravena/gallery-2.jpg", alt: "AB Ravena porcelain tile, polished finish, 80 × 80 cm" },
    ],
    specifications: {
      Material: "Porcelain",
      Format: "260 × 120, 120 × 120, 80 × 160, 80 × 80, 60 × 120, 60 × 60, 30 × 90 cm",
      Finish: "Polished or Natural",
    },
  },
  {
    slug: "ab-icaro",
    name: "Icaro",
    category: "Porcelain Tiles",
    brand: "ab",
    heroImage: { src: "/images/products/ab/icaro/hero.jpg", alt: "AB Icaro porcelain tile, polished gloss finish, 260 × 120 cm" },
    gallery: [
      { src: "/images/products/ab/icaro/gallery-1.jpg", alt: "AB Icaro porcelain tile, polished gloss finish, 120 × 120 cm" },
    ],
    specifications: {
      Material: "Porcelain",
      Format: "260 × 120, 120 × 120, 60 × 120 cm",
      Finish: "Polished gloss — Dark, Musk",
    },
  },
  {
    slug: "ab-toga",
    name: "Toga",
    category: "Porcelain Tiles",
    brand: "ab",
    heroImage: { src: "/images/products/ab/toga/hero.jpg", alt: "AB Toga porcelain tile, 120 × 240 cm" },
    gallery: [
      { src: "/images/products/ab/toga/gallery-1.jpg", alt: "AB Toga porcelain tile, Black finish" },
    ],
    specifications: {
      Material: "Porcelain",
      Format: "280 × 120, 240 × 120, 120 × 120, 80 × 80, 60 × 120 cm",
      Finish: "Matte — Black, Taupe, Grey",
    },
  },
  {
    slug: "ab-aura",
    name: "Aura",
    category: "Porcelain Tiles",
    brand: "ab",
    description:
      "Aura is a porcelain tile collection from AB (Azulejos Benadresa), shown here in an Ivory natural finish at 80 × 160 cm.",
    heroImage: {
      src: "/images/products/ab/aura/hero.jpg",
      alt: "AB Aura porcelain tile, Ivory natural finish, 80 × 160 cm",
    },
    specifications: { Format: "80 × 160 cm", Finish: "Natural", Color: "Ivory" },
  },

  {
    slug: "laminam-i-naturali",
    name: "I Naturali",
    category: "Architectural Surfaces",
    brand: "laminam",
    description:
      "I Naturali draws on the aesthetic qualities of Italian natural stone, for wall cladding, flooring, façades and decorative surfaces.",
    heroImage: {
      src: "/images/products/laminam/i-naturali/hero.jpg",
      alt: "Laminam I Naturali, Calacatta Michelangelo finish",
    },
    gallery: [
      { src: "/images/products/laminam/i-naturali/gallery-1.jpg", alt: "Laminam I Naturali, Bianco Statuario Venato finish" },
    ],
    applications: ["Walls", "Floors", "Outdoor", "Kitchens", "Bathrooms", "Furniture"],
  },
  {
    slug: "laminam-blend",
    name: "Blend",
    category: "Architectural Surfaces",
    brand: "laminam",
    heroImage: { src: "/images/products/laminam/blend/hero.jpg", alt: "Laminam Blend, Avorio finish" },
    gallery: [
      { src: "/images/products/laminam/blend/gallery-1.jpg", alt: "Laminam Blend, Grigio finish" },
      { src: "/images/products/laminam/blend/gallery-2.jpg", alt: "Laminam Blend, Nero finish" },
    ],
  },
  {
    slug: "laminam-oxide",
    name: "Oxide",
    category: "Architectural Surfaces",
    brand: "laminam",
    heroImage: { src: "/images/products/laminam/oxide/hero.jpg", alt: "Laminam Oxide, Avorio finish" },
    gallery: [
      { src: "/images/products/laminam/oxide/gallery-1.jpg", alt: "Laminam Oxide, Bianco finish" },
      { src: "/images/products/laminam/oxide/gallery-2.jpg", alt: "Laminam Oxide, Nero finish" },
    ],
    applications: ["Outdoor", "Furniture", "Kitchens", "Walls"],
  },
  {
    slug: "laminam-calce",
    name: "Calce",
    category: "Architectural Surfaces",
    brand: "laminam",
    heroImage: { src: "/images/products/laminam/calce/hero.jpg", alt: "Laminam Calce, Bianco finish" },
    gallery: [
      { src: "/images/products/laminam/calce/gallery-1.jpg", alt: "Laminam Calce, Terracotta finish" },
      { src: "/images/products/laminam/calce/gallery-2.jpg", alt: "Laminam Calce, Antracite finish" },
    ],
  },
  {
    slug: "laminam-filo",
    name: "Filo",
    category: "Architectural Surfaces",
    brand: "laminam",
    description: "Filo is an iridescent surface with a gleaming metallic look, for interior walls and exterior applications.",
    heroImage: { src: "/images/products/laminam/filo/hero.jpg", alt: "Laminam Filo, Oro finish" },
    gallery: [
      { src: "/images/products/laminam/filo/gallery-1.jpg", alt: "Laminam Filo, Argento finish" },
      { src: "/images/products/laminam/filo/gallery-2.jpg", alt: "Laminam Filo, Ghisa finish" },
    ],
    applications: ["Walls", "Outdoor"],
  },
  {
    slug: "laminam-slate",
    name: "Slate",
    category: "Architectural Surfaces",
    brand: "laminam",
    heroImage: { src: "/images/products/laminam/slate/hero.jpg", alt: "Laminam Slate, Alaska finish" },
    gallery: [
      { src: "/images/products/laminam/slate/gallery-1.jpg", alt: "Laminam Slate, Vulcano finish" },
    ],
  },

  {
    slug: "vidrepur-oasis",
    name: "Oasis",
    category: "Glass Mosaic",
    brand: "vidrepur",
    heroImage: { src: "/images/products/vidrepur/oasis/hero.jpg", alt: "Vidrepur Oasis glass mosaic, Marfil (Ivory) colorway, 25 × 25 mm" },
    gallery: [
      { src: "/images/products/vidrepur/oasis/gallery-1.jpg", alt: "Vidrepur Oasis glass mosaic, Blue colorway, 25 × 25 mm" },
    ],
    specifications: { Finish: "Ivory", Format: "25 × 25, 38 × 38, 25 × 50 mm" },
  },
  {
    slug: "vidrepur-estelar",
    name: "Estelar",
    category: "Glass Mosaic",
    brand: "vidrepur",
    heroImage: { src: "/images/products/vidrepur/estelar/hero.jpg", alt: "Vidrepur Estelar glass mosaic, Orion colorway, 25 × 25 mm" },
    gallery: [
      { src: "/images/products/vidrepur/estelar/gallery-1.jpg", alt: "Vidrepur Estelar glass mosaic, Luna colorway, 25 × 25 mm" },
      { src: "/images/products/vidrepur/estelar/gallery-2.jpg", alt: "Vidrepur Estelar glass mosaic, Blue colorway, 25 × 25 mm" },
    ],
    specifications: { Colorway: "Orion", Format: "25 × 25, 38 × 38, 25 × 50 mm" },
  },
  {
    slug: "vidrepur-glitter",
    name: "Glitter",
    category: "Glass Mosaic",
    brand: "vidrepur",
    description:
      "Glitter is part of Vidrepur's glass mosaic range, manufactured in Castellón, Spain.",
    heroImage: {
      src: "/brands/vidrepur-glitter-mosaic-bathroom.webp",
      alt: "Vidrepur Glitter glass mosaic in a bathroom application",
    },
    applications: ["Bathrooms"],
  },
  {
    slug: "vidrepur-level",
    name: "Level",
    category: "Glass Mosaic",
    brand: "vidrepur",
    heroImage: { src: "/images/products/vidrepur/level/hero.jpg", alt: "Vidrepur Level glass mosaic, Blue colorway, 25 × 25 mm" },
    gallery: [
      { src: "/images/products/vidrepur/level/gallery-1.jpg", alt: "Vidrepur Level glass mosaic, Royal colorway, 25 × 25 mm" },
    ],
    specifications: { Format: "25 × 25 mm, 25 × 50 mm brick", Colorway: "Blue" },
  },
  {
    slug: "vidrepur-breeze",
    name: "Breeze",
    category: "Glass Mosaic",
    brand: "vidrepur",
    heroImage: { src: "/images/products/vidrepur/breeze/hero.jpg", alt: "Vidrepur Breeze glass mosaic, Emerald colorway, 25 × 25 mm" },
    gallery: [
      { src: "/images/products/vidrepur/breeze/gallery-1.jpg", alt: "Vidrepur Breeze glass mosaic, Lake colorway, 25 × 25 mm" },
    ],
    specifications: { Format: "25 × 25 mm, 38 × 38 mm" },
  },
  {
    slug: "vidrepur-eden",
    name: "Eden",
    category: "Glass Mosaic",
    brand: "vidrepur",
    heroImage: { src: "/images/products/vidrepur/eden/hero.jpg", alt: "Vidrepur Eden glass mosaic, Royal Hex colorway, 35 × 35 mm" },
    gallery: [
      { src: "/images/products/vidrepur/eden/gallery-1.jpg", alt: "Vidrepur Eden glass mosaic, Noir Hex colorway, 35 × 35 mm" },
    ],
    specifications: { Format: "Hex, 35 × 35 mm", Colorway: "Royal" },
  },
  {
    slug: "vidrepur-tender",
    name: "Tender",
    category: "Glass Mosaic",
    brand: "vidrepur",
    heroImage: { src: "/images/products/vidrepur/tender/hero.jpg", alt: "Vidrepur Tender glass mosaic, Oil Green colorway, 25 × 25 mm" },
    gallery: [
      { src: "/images/products/vidrepur/tender/gallery-1.jpg", alt: "Vidrepur Tender glass mosaic, Coral colorway, 25 × 25 mm" },
    ],
    specifications: { Colorway: "Olive Green", Format: "25 × 25 mm" },
    applications: ["Outdoor"],
  },
  {
    slug: "vidrepur-soul",
    name: "Soul",
    category: "Glass Mosaic",
    brand: "vidrepur",
    heroImage: { src: "/images/products/vidrepur/soul/hero.jpg", alt: "Vidrepur Soul glass mosaic, matt blue finish, 36 × 29 mm" },
    gallery: [
      { src: "/images/products/vidrepur/soul/gallery-1.jpg", alt: "Vidrepur Soul glass mosaic, matt white finish, 36 × 29 mm" },
    ],
    specifications: { Format: "36 × 29 mm" },
  },
];

export const productsBySlug = bySlug(products);
