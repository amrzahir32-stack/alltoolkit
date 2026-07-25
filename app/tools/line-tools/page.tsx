import type { Metadata } from "next";
import { ListFilter } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { LineTools } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Sort & Deduplicate Lines", description: "Sort, reverse and remove duplicate lines.",
    alternates: { canonical: "/tools/line-tools" }
};

export default function Page() {
  return <ToolLayout title="Sort & Deduplicate Lines" description="Sort, reverse and remove duplicate lines." icon={ListFilter} maxWidth="6xl"><LineTools /></ToolLayout>;
}
