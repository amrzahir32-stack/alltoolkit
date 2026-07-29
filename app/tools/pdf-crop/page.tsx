import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfCropTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Crop PDF", description: "Trim margins from every page of a PDF directly in your browser.", alternates: { canonical: "/tools/pdf-crop" } };
export default function Page() { return <ToolLayout title="Crop PDF" description="Trim margins from every page of a PDF directly in your browser."><PdfCropTool /></ToolLayout>; }
