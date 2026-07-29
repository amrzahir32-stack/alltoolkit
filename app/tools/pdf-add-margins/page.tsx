import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfAddMarginsTool } from "@/components/tools/PdfMoreTools";

export const metadata: Metadata = { title: "Add Margins to PDF", description: "Add clean white margins around every PDF page.", alternates: { canonical: "/tools/pdf-add-margins" } };
export default function Page() { return <ToolLayout title="Add Margins to PDF" description="Add clean white margins around every PDF page."><PdfAddMarginsTool /></ToolLayout>; }
