import type { Metadata } from "next";
import { Replace } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { FindReplaceTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Find & Replace", description: "Replace words or phrases with a live preview.",
    alternates: { canonical: "/tools/find-replace" }
};

export default function Page() {
  return <ToolLayout title="Find & Replace" description="Replace words or phrases with a live preview." icon={Replace} maxWidth="6xl"><FindReplaceTool /></ToolLayout>;
}
