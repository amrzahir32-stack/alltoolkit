import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfInsertTool } from "@/components/tools/PdfMoreTools";

export const metadata: Metadata = { title: "Insert PDF into PDF", description: "Insert every page from one PDF into another at a selected position.", alternates: { canonical: "/tools/pdf-insert" } };
export default function Page() { return <ToolLayout title="Insert PDF into PDF" description="Insert every page from one PDF into another at a selected position."><PdfInsertTool /></ToolLayout>; }
