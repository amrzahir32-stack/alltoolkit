import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfInterleaveTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Interleave PDFs", description: "Alternate pages from two PDF files into one document.", alternates: { canonical: "/tools/pdf-interleave" } };
export default function Page() { return <ToolLayout title="Interleave PDFs" description="Alternate pages from two PDF files into one document."><PdfInterleaveTool /></ToolLayout>; }
