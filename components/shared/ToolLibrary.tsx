"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import ToolGrid from "./ToolGrid";
import { categories, tools } from "@/data/tools";

export default function ToolLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const normalizedQuery = query.trim().toLowerCase();

  const categoryCounts = useMemo(
    () => new Map(categories.map((item) => [item.title, tools.filter((tool) => tool.category === item.title).length])),
    [],
  );

  const filtered = useMemo(
    () =>
      tools.filter((tool) => {
        const matchesCategory = category === "All" || tool.category === category;
        const searchable = `${tool.title} ${tool.description} ${tool.category}`.toLowerCase();
        return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
      }),
    [category, normalizedQuery],
  );

  return (
    <>
      <section aria-label="Filter tools" className="mb-10 rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-4 shadow-[0_16px_45px_rgba(91,62,38,.08)] sm:p-6">
        <label htmlFor="tool-search" className="sr-only">Search tools</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A7744D]" size={20} aria-hidden="true" />
          <input
            id="tool-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${tools.length} tools…`}
            autoComplete="off"
            className="w-full rounded-2xl border border-[#E7D8C7] bg-white py-4 pl-12 pr-12 text-[#2D241C] outline-none transition placeholder:text-[#9A897A] focus:border-[#A7744D] focus:ring-4 focus:ring-[#A7744D]/10"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear tool search"
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-[#7B6858] transition hover:bg-[#F3E6D8] hover:text-[#8D5E3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D]"
            >
              <X size={18} aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0" aria-label="Tool categories">
          <button
            type="button"
            onClick={() => setCategory("All")}
            aria-pressed={category === "All"}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] focus-visible:ring-offset-2 ${
              category === "All" ? "bg-[#A7744D] text-white" : "bg-[#F3E6D8] text-[#8B6547] hover:bg-[#EAD8C5]"
            }`}
          >
            All ({tools.length})
          </button>
          {categories.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setCategory(item.title)}
              aria-pressed={category === item.title}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] focus-visible:ring-offset-2 ${
                category === item.title ? "bg-[#A7744D] text-white" : "bg-[#F3E6D8] text-[#8B6547] hover:bg-[#EAD8C5]"
              }`}
            >
              {item.title} ({categoryCounts.get(item.title) ?? 0})
            </button>
          ))}
        </div>
      </section>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-black text-[#2D241C]">{category} tools</h2>
        <span className="text-sm font-bold text-[#6B5B4D]" role="status" aria-live="polite">
          {filtered.length} result{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {filtered.length ? (
        <ToolGrid items={filtered} />
      ) : (
        <div className="rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-10 text-center sm:p-12">
          <p className="font-bold text-[#3D3026]">No tools match your search.</p>
          <p className="mt-2 text-[#6B5B4D]">Try another keyword or choose a different category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 rounded-xl bg-[#A7744D] px-5 py-2.5 font-bold text-white transition hover:bg-[#8F603E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] focus-visible:ring-offset-2"
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
