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

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-screen max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-[#A7744D]">Category</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-[#2D241C] sm:text-6xl">
          {category.title} tools
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#6B5B4D]">{category.description}</p>
      </div>
      <ToolGrid items={items} />
    </main>
  );
}
