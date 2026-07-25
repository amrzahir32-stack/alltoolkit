import type { Metadata } from "next";
import { Link2 } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { SlugGeneratorTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Slug Generator", description: "Turn titles into clean, URL-friendly slugs.",
    alternates: { canonical: "/tools/slug-generator" }
};

export default function Page() {
  return <ToolLayout title="Slug Generator" description="Turn titles into clean, URL-friendly slugs." icon={Link2} maxWidth="6xl"><SlugGeneratorTool /></ToolLayout>;
}
