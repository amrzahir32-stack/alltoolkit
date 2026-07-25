import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfSplitTool } from "@/components/tools/StudentPdfImageTools";

export const metadata: Metadata = {
  title: "PDF Page Extractor", description: "Extract selected pages or ranges into a new PDF.",
    alternates: { canonical: "/tools/pdf-split" }
};
export default function Page() { return <ToolLayout title="PDF Page Extractor" description="Extract selected pages or ranges into a new PDF."><PdfSplitTool /></ToolLayout>; }
