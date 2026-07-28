import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfWatermarkTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Watermark PDF", description: "Add a custom text watermark to every page of your PDF.", alternates: { canonical: "/tools/pdf-watermark" } };
export default function Page() { return <ToolLayout title="Watermark PDF" description="Add a custom text watermark to every page of your PDF."><PdfWatermarkTool /></ToolLayout>; }
