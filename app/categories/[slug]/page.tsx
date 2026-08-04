import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolGrid from "@/components/shared/ToolGrid";
import { categories, tools } from "@/data/tools";

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};

  const title = `${category.title} Tools`;
  const url = `/categories/${category.slug}`;

  return {
    title,
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | AllToolkit`,
      description: category.description,
      url,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const items = tools.filter((tool) => tool.category === category.title);
  const listSchema = {"@context":"https://schema.org","@type":"ItemList",name:`${category.title} tools`,itemListElement:items.map((tool,index)=>({"@type":"ListItem",position:index+1,name:tool.title,url:`https://alltoolkit.org${tool.href}`}))};

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-screen max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(listSchema)}} />
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-[#A7744D]">Category</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-[#2D241C] sm:text-6xl">
          {category.title} tools
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#6B5B4D]">{category.description}</p>
      </div>
      <ToolGrid items={items} />
      <section className="mt-16 rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-6 sm:p-8"><h2 className="text-2xl font-black text-[#2D241C]">About our {category.title.toLowerCase()} tools</h2><p className="mt-4 max-w-4xl leading-8 text-[#6B5B4D]">{category.description} All tools are organized for quick access, work across modern devices, and are linked to related utilities so you can complete a full task without searching across several websites.</p></section>
    </main>
  );
}
