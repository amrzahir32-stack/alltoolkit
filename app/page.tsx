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
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6" aria-labelledby="discover-heading">
        <div className="rounded-[2rem] border border-[#E7D8C7] bg-[#FFFCF8] p-7 shadow-[0_20px_60px_rgba(91,62,38,.08)] sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#A7744D]">One toolkit, many tasks</p>
          <h2 id="discover-heading" className="mt-3 text-3xl font-black tracking-tight text-[#2D241C] sm:text-4xl">Find the right online tool faster</h2>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#6B5B4D]">AllToolkit brings document converters, text utilities, developer helpers, calculators, image tools and study tools into one organized library. Search by task, browse a category, or open a related tool to continue your workflow.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {[['Private by design','Many tools run directly in your browser.'],['No account required','Open a tool and start working immediately.'],['Built for every screen','Responsive controls work on mobile and desktop.']].map(([title,text])=><div key={title} className="rounded-2xl border border-[#E7D8C7] bg-white p-5"><h3 className="font-black text-[#2D241C]">{title}</h3><p className="mt-2 leading-7 text-[#6B5B4D]">{text}</p></div>)}
          </div>
        </div>
      </section>
      <WhyAllToolkit />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_BOTTOM_SLOT} format="horizontal" />
      </div>
    </main>
  );
}
