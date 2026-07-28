import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfExtractRangeTool } from "@/components/tools/PdfMoreTools";

export const metadata: Metadata = { title: "Extract PDF Page Range", description: "Extract one continuous page range into a new PDF.", alternates: { canonical: "/tools/pdf-extract-range" } };
export default function Page() { return <ToolLayout title="Extract PDF Page Range" description="Extract one continuous page range into a new PDF."><PdfExtractRangeTool /></ToolLayout>; }
