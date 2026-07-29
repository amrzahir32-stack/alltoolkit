import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfReverseTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Reverse PDF Pages", description: "Reverse the complete page order of a PDF.", alternates: { canonical: "/tools/pdf-reverse" } };
export default function Page() { return <ToolLayout title="Reverse PDF Pages" description="Reverse the complete page order of a PDF."><PdfReverseTool /></ToolLayout>; }
