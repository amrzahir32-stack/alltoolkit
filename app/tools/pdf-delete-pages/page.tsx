import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfDeletePagesTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Delete PDF Pages", description: "Remove unwanted pages from a PDF without uploading it.", alternates: { canonical: "/tools/pdf-delete-pages" } };
export default function Page() { return <ToolLayout title="Delete PDF Pages" description="Remove unwanted pages from a PDF without uploading it."><PdfDeletePagesTool /></ToolLayout>; }
