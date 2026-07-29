import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfDuplicatePagesTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Duplicate PDF Pages", description: "Create extra copies of selected pages inside your PDF.", alternates: { canonical: "/tools/pdf-duplicate-pages" } };
export default function Page() { return <ToolLayout title="Duplicate PDF Pages" description="Create extra copies of selected pages inside your PDF."><PdfDuplicatePagesTool /></ToolLayout>; }
