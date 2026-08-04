import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Code2,
  FileStack,
  FileText,
  GraduationCap,
  Image,
  Shield,
  Timer,
} from "lucide-react";
import { categories, tools } from "@/data/tools";

const icons = {
  security: Shield,
  text: FileText,
  developer: Code2,
  calculators: Calculator,
  images: Image,
  pdf: FileStack,
  student: GraduationCap,
  productivity: Timer,
};

export default function Categories() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="mx-auto max-w-7xl scroll-mt-28 px-5 py-16 sm:scroll-mt-32 sm:px-6 sm:py-20"
    >
      <div className="mb-10 text-center sm:mb-12">
        <span className="rounded-full border border-[#E5D7C8] bg-white/70 px-4 py-2 text-sm font-semibold text-[#9C6F4A] shadow-sm">
          Explore
        </span>
        <h2 id="categories-heading" className="mt-6 text-4xl font-black tracking-tight text-[#2D241C] sm:text-5xl">
          Browse Categories
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6B5B4D] sm:text-lg">
          Everything is grouped so you can reach the right tool in seconds.
        </p>
      </div>

      <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => {
          const Icon = icons[category.slug];
          const count = tools.filter((tool) => tool.category === category.title).length;

          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              aria-label={`Browse ${count} ${category.title.toLowerCase()} tools`}
              className="group flex min-h-[250px] flex-col rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-6 shadow-[0_16px_45px_rgba(91,62,38,.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#C9A684] hover:shadow-[0_24px_60px_rgba(167,116,77,.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A7744D]/25 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E6D8] text-[#A7744D]">
                  <Icon size={27} aria-hidden="true" />
                </div>
                <span className="rounded-full bg-[#F7F0E9] px-3 py-1 text-xs font-black text-[#8B6547]">
                  {count} tools
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-black text-[#2D241C]">{category.title}</h3>
              <p className="mt-3 flex-1 leading-7 text-[#6B5B4D]">{category.description}</p>
              <span className="mt-6 flex items-center gap-2 font-bold text-[#A7744D]">
                Explore
                <ArrowRight size={18} className="transition group-hover:translate-x-1.5" aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
