import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfAddBlankPagesTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Add Blank Pages to PDF", description: "Insert one or more blank pages at the beginning or end of a PDF.", alternates: { canonical: "/tools/pdf-add-blank-pages" } };
export default function Page() { return <ToolLayout title="Add Blank Pages to PDF" description="Insert one or more blank pages at the beginning or end of a PDF."><PdfAddBlankPagesTool /></ToolLayout>; }
