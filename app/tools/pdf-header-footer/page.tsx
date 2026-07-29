import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfHeaderFooterTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Add Header & Footer", description: "Add custom header and footer text to PDF pages.", alternates: { canonical: "/tools/pdf-header-footer" } };
export default function Page() { return <ToolLayout title="Add Header & Footer" description="Add custom header and footer text to PDF pages."><PdfHeaderFooterTool /></ToolLayout>; }
