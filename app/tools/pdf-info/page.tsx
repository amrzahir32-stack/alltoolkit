import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfInfoTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "PDF Information Viewer", description: "Inspect PDF page count, dimensions and metadata.", alternates: { canonical: "/tools/pdf-info" } };
export default function Page() { return <ToolLayout title="PDF Information Viewer" description="Inspect PDF page count, dimensions and metadata."><PdfInfoTool /></ToolLayout>; }
