import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { CitationGeneratorTool } from "@/components/tools/StudentPdfImageTools";

export const metadata: Metadata = {
  title: "Citation Generator", description: "Build quick APA, MLA and Chicago website citations.",
    alternates: { canonical: "/tools/citation-generator" }
};
export default function Page() { return <ToolLayout title="Citation Generator" description="Build quick APA, MLA and Chicago website citations."><CitationGeneratorTool /></ToolLayout>; }
