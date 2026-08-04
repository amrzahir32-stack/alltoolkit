import type { MetadataRoute } from "next";

const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://alltoolkit.org").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-SearchBot", "PerplexityBot"], allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
