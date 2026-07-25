import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { ImageResizeTool } from "@/components/tools/StudentPdfImageTools";

export const metadata: Metadata = {
  title: "Image Resizer", description: "Resize images to exact pixel dimensions.",
    alternates: { canonical: "/tools/image-resizer" }
};
export default function Page() { return <ToolLayout title="Image Resizer" description="Resize images to exact pixel dimensions."><ImageResizeTool /></ToolLayout>; }
