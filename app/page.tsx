import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedTools from "@/components/home/FeaturedTools";
import Categories from "@/components/home/Categories";
import WhyAllToolkit from "@/components/home/WhyAllToolkit";
import PersonalTools from "@/components/home/PersonalTools";
import AdSlot from "@/components/ads/AdSlot";
import { tools } from "@/data/tools";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://alltoolkit.org").replace(/\/$/, "");

export const metadata: Metadata = {
  title: { absolute: "AllToolkit" },
  description:
    "Free online tools for PDF files, documents, images, text, calculations, studying and development. Fast, secure and easy to use.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AllToolkit",
    description:
      "Free online tools for PDF files, documents, images, text, calculations, studying and development.",
    url: "/",
  },
};

const featuredToolsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Featured AllToolkit utilities",
  itemListElement: tools
    .filter((tool) => tool.featured)
    .slice(0, 12)
    .map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      url: `${siteUrl}${tool.href}`,
    })),
};

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredToolsSchema) }} />
      <Hero />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_TOP_SLOT} format="horizontal" />
      </div>
      <PersonalTools />
      <FeaturedTools />
      <Categories />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_MIDDLE_SLOT} format="horizontal" />
      </div>
      <WhyAllToolkit />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_BOTTOM_SLOT} format="horizontal" />
      </div>
    </main>
  );
}
