import { tools } from "@/data/tools";
import ToolGrid from "@/components/shared/ToolGrid";

export default function FeaturedTools() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20" id="popular-tools">
      <div className="mb-12 text-center">
        <span className="rounded-full border border-[#E5D7C8] bg-white/70 px-4 py-2 text-sm font-semibold text-[#9C6F4A] shadow-sm">Most Used</span>
        <h2 className="mt-6 text-4xl font-black tracking-tight text-[#2D241C] sm:text-5xl">Popular Tools</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B5B4D]">Quick utilities for everyday work, all available without an account.</p>
      </div>
      <ToolGrid items={tools.filter((tool) => tool.featured)} />
    </section>
  );
}
