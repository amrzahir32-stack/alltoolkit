import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { ImagesToPdfTool } from "@/components/tools/StudentPdfImageTools";

export const metadata: Metadata = {
  title: "Images to PDF", description: "Turn JPG and PNG images into a single PDF.",
    alternates: { canonical: "/tools/images-to-pdf" }
};
export default function Page() { return <ToolLayout title="Images to PDF" description="Turn JPG and PNG images into a single PDF."><ImagesToPdfTool /></ToolLayout>; }
