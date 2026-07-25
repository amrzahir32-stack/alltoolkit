import type { MetadataRoute } from "next";
import { categories, tools } from "@/data/tools";
const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://alltoolkit.org").replace(/\/$/, "");
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/tools", "/about", "/contact", "/privacy", "/terms"].map(url => ({ url: `${base}${url}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: url === "" ? 1 : .7 }));
  return [...staticPages, ...tools.map(t=>({url:`${base}${t.href}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:.8})), ...categories.map(c=>({url:`${base}/categories/${c.slug}`,lastModified:new Date(),changeFrequency:"weekly" as const,priority:.7}))];
}
