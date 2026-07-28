import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfRemoveEndsTool } from "@/components/tools/PdfMoreTools";

export const metadata: Metadata = { title: "Remove First or Last PDF Page", description: "Remove the first page, last page, or both.", alternates: { canonical: "/tools/pdf-remove-ends" } };
export default function Page() { return <ToolLayout title="Remove First or Last PDF Page" description="Remove the first page, last page, or both."><PdfRemoveEndsTool /></ToolLayout>; }
