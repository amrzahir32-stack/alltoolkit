import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfBookletTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "PDF Booklet Creator", description: "Reorder pages for double-sided booklet printing.", alternates: { canonical: "/tools/pdf-booklet" } };
export default function Page() { return <ToolLayout title="PDF Booklet Creator" description="Reorder pages for double-sided booklet printing."><PdfBookletTool /></ToolLayout>; }
