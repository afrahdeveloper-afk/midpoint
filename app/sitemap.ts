import type { MetadataRoute } from "next";
import { brands } from "@/data/brands";
import { productCategories, products } from "@/data/products";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { SITE_URL } from "@/lib/site-config";

const BASE_URL = SITE_URL;

/**
 * `lastModified` is intentionally omitted: no per-route modification dates
 * are tracked anywhere in the content data, so a timestamp here would only
 * ever be the current build time restated for every URL, not a real
 * indication of when a page's content changed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about-us",
    "/brands",
    "/products",
    "/projects",
    "/services",
    "/contact-us",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  const brandRoutes = brands.map((brand) => ({
    url: `${BASE_URL}/brands/${brand.slug}`,
  }));

  const productRoutes = productCategories.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
  }));

  const productItemRoutes = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
  }));

  return [
    ...staticRoutes,
    ...brandRoutes,
    ...productRoutes,
    ...productItemRoutes,
    ...serviceRoutes,
    ...projectRoutes,
  ];
}
