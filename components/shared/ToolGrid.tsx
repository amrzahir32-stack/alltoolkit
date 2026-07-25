"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { Tool } from "@/data/tools";
import ToolIcon from "./ToolIcon";
import { FAVORITES_KEY, readStringArray, writeStringArray } from "./toolStorage";

export default function ToolGrid({ items }: { items: Tool[] }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setFavorites(readStringArray(FAVORITES_KEY));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("alltoolkit-storage", sync as EventListener);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("alltoolkit-storage", sync as EventListener);
    };
  }, []);

  function toggleFavorite(event: React.MouseEvent, id: string) {
    event.preventDefault();
    event.stopPropagation();
    const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [id, ...favorites];
    setFavorites(next);
    writeStringArray(FAVORITES_KEY, next);
  }

  return (
    <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((tool) => {
        const favorite = favorites.includes(tool.id);
        return (
          <Link key={tool.id} href={tool.href} className="group relative flex min-h-[300px] flex-col rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-7 shadow-[0_16px_45px_rgba(91,62,38,.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#C9A684] hover:shadow-[0_24px_60px_rgba(167,116,77,.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A7744D]/25">
            <button type="button" onClick={(event) => toggleFavorite(event, tool.id)} aria-label={favorite ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`} aria-pressed={favorite} className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#E7D8C7] bg-white/90 text-[#A7744D] shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A7744D]/20">
              <Heart size={19} className={favorite ? "fill-current" : ""} />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6B48B] to-[#A7744D] text-white shadow-lg transition group-hover:scale-105 group-hover:rotate-2"><ToolIcon name={tool.icon} /></div>
            <span className="mt-6 w-fit rounded-full bg-[#F3E6D8] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#8B6547]">{tool.category}</span>
            <h2 className="mt-4 pr-6 text-2xl font-black tracking-tight text-[#2D241C]">{tool.title}</h2>
            <p className="mt-3 flex-1 leading-7 text-[#6B5B4D]">{tool.description}</p>
            <div className="mt-7 flex items-center gap-2 font-bold text-[#A7744D]">Open tool <ArrowRight size={18} className="transition group-hover:translate-x-1.5" /></div>
          </Link>
        );
      })}
    </div>
  );
}
