import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfRepeatDocumentTool } from "@/components/tools/PdfMoreTools";

export const metadata: Metadata = { title: "Repeat Entire PDF", description: "Repeat the complete PDF multiple times in one file.", alternates: { canonical: "/tools/pdf-repeat-document" } };
export default function Page() { return <ToolLayout title="Repeat Entire PDF" description="Repeat the complete PDF multiple times in one file."><PdfRepeatDocumentTool /></ToolLayout>; }
