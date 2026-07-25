import type { Metadata } from "next";
import { Pilcrow } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { LoremIpsumTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator", description: "Generate placeholder paragraphs for layouts and mockups.",
    alternates: { canonical: "/tools/lorem-ipsum" }
};

export default function Page() {
  return <ToolLayout title="Lorem Ipsum Generator" description="Generate placeholder paragraphs for layouts and mockups." icon={Pilcrow} maxWidth="6xl"><LoremIpsumTool /></ToolLayout>;
}
