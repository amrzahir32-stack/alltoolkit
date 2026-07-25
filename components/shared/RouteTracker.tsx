"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { tools } from "@/data/tools";
import { readStringArray, RECENTS_KEY, writeStringArray } from "./toolStorage";

export default function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const tool = tools.find((item) => item.href === pathname);
    if (!tool) return;
    const next = [tool.id, ...readStringArray(RECENTS_KEY).filter((id) => id !== tool.id)].slice(0, 8);
    writeStringArray(RECENTS_KEY, next);
  }, [pathname]);

  return null;
}
