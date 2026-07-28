import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfOptimizeTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Optimize PDF", description: "Rewrite PDF structure with compressed object streams to reduce overhead.", alternates: { canonical: "/tools/pdf-optimize" } };
export default function Page() { return <ToolLayout title="Optimize PDF" description="Rewrite PDF structure with compressed object streams to reduce overhead."><PdfOptimizeTool /></ToolLayout>; }
