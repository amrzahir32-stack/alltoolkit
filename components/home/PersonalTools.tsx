"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3, Heart } from "lucide-react";
import { tools } from "@/data/tools";
import ToolGrid from "@/components/shared/ToolGrid";
import { FAVORITES_KEY, readStringArray, RECENTS_KEY } from "@/components/shared/toolStorage";

export default function PersonalTools() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      setFavorites(readStringArray(FAVORITES_KEY));
      setRecents(readStringArray(RECENTS_KEY));
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("alltoolkit-storage", sync as EventListener);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("alltoolkit-storage", sync as EventListener);
    };
  }, []);

  const favoriteTools = useMemo(() => favorites.map((id) => tools.find((tool) => tool.id === id)).filter(Boolean).slice(0, 3) as typeof tools, [favorites]);
  const recentTools = useMemo(() => recents.map((id) => tools.find((tool) => tool.id === id)).filter(Boolean).slice(0, 3) as typeof tools, [recents]);

  if (!favoriteTools.length && !recentTools.length) return null;

  return (
    <section className="mx-auto max-w-7xl space-y-16 px-6 py-8" aria-label="Your tools">
      {recentTools.length > 0 && (
        <div>
          <div className="mb-7 flex items-center gap-3"><Clock3 className="text-[#A7744D]"/><h2 className="text-3xl font-black text-[#2D241C]">Recently used</h2></div>
          <ToolGrid items={recentTools} />
        </div>
      )}
      {favoriteTools.length > 0 && (
        <div>
          <div className="mb-7 flex items-center gap-3"><Heart className="fill-[#A7744D] text-[#A7744D]"/><h2 className="text-3xl font-black text-[#2D241C]">Your favorites</h2></div>
          <ToolGrid items={favoriteTools} />
        </div>
      )}
    </section>
  );
}
