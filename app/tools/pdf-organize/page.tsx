import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfOrganizeTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Organize PDF Pages", description: "Reorder, reverse, repeat or select PDF pages in any sequence.", alternates: { canonical: "/tools/pdf-organize" } };
export default function Page() { return <ToolLayout title="Organize PDF Pages" description="Reorder, reverse, repeat or select PDF pages in any sequence."><PdfOrganizeTool /></ToolLayout>; }
