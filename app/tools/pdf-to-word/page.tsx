import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfToWordTool } from "@/components/tools/DocumentConverters";

export const metadata: Metadata = { title: "PDF to Word", description: "Extract PDF text into an editable Word-compatible document.", alternates: { canonical: "/tools/pdf-to-word" } };
export default function Page() { return <ToolLayout title="PDF to Word" description="Extract PDF text into an editable Word-compatible document."><PdfToWordTool /></ToolLayout>; }
