import type { Metadata } from "next";
import { Eraser } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { TextCleanerTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Text Cleaner", description: "Fix spacing, empty lines, duplicates and punctuation.",
    alternates: { canonical: "/tools/text-cleaner" }
};

export default function Page() {
  return <ToolLayout title="Text Cleaner" description="Fix spacing, empty lines, duplicates and punctuation." icon={Eraser} maxWidth="6xl"><TextCleanerTool /></ToolLayout>;
}
