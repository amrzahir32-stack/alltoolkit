import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfPageNumbersTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Add Page Numbers to PDF", description: "Add page numbers in your preferred position, starting from any number.", alternates: { canonical: "/tools/pdf-page-numbers" } };
export default function Page() { return <ToolLayout title="Add Page Numbers to PDF" description="Add page numbers in your preferred position, starting from any number."><PdfPageNumbersTool /></ToolLayout>; }
