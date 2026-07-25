import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfRotateTool } from "@/components/tools/StudentPdfImageTools";

export const metadata: Metadata = {
  title: "Rotate PDF", description: "Rotate every page in a PDF directly in your browser.",
    alternates: { canonical: "/tools/pdf-rotate" }
};
export default function Page() { return <ToolLayout title="Rotate PDF" description="Rotate every page in a PDF directly in your browser."><PdfRotateTool /></ToolLayout>; }
