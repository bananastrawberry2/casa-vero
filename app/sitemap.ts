import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://enchanting-stardust-bb9965.netlify.app";
  const locales = ["el", "en"];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = ["", "/products", "/blog", "/about", "/contact", "/cart"];
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  // Dynamic products from Sanity
  if (client) {
    try {
      const products = await client.fetch<{ slug: { current: string }; _updatedAt: string }[]>(
        `*[_type == "product" && defined(slug.current)]{ slug, _updatedAt }`
      );
      for (const locale of locales) {
        for (const p of products) {
          entries.push({
            url: `${baseUrl}/${locale}/products/${p.slug.current}`,
            lastModified: new Date(p._updatedAt),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      }

      // Blog posts
      const posts = await client.fetch<{ slug: { current: string }; _updatedAt: string }[]>(
        `*[_type == "blog" && defined(slug.current)]{ slug, _updatedAt }`
      );
      for (const locale of locales) {
        for (const p of posts) {
          entries.push({
            url: `${baseUrl}/${locale}/blog/${p.slug.current}`,
            lastModified: new Date(p._updatedAt),
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      }
    } catch { /* Sanity not configured yet */ }
  }

  return entries;
}
