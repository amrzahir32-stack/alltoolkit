import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfMergeTool } from "@/components/tools/StudentPdfImageTools";

export const metadata: Metadata = {
  title: "PDF Merge", description: "Combine multiple PDF files in the order you choose.",
    alternates: { canonical: "/tools/pdf-merge" }
};
export default function Page() { return <ToolLayout title="PDF Merge" description="Combine multiple PDF files in the order you choose."><PdfMergeTool /></ToolLayout>; }
