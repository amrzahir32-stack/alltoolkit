import type { MetadataRoute } from "next";
import { categories, tools } from "@/data/tools";

const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://alltoolkit.org").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tools`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${base}${tool.href}`,
    changeFrequency: "monthly",
    priority: tool.featured ? 0.9 : 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${base}/categories/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const unique = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [...staticPages, ...toolPages, ...categoryPages]) unique.set(entry.url, entry);
  return [...unique.values()];
}
