import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getAllProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
  ];

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${site.url}/produtos/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
