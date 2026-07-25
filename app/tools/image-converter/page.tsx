import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { ImageConverterTool } from "@/components/tools/StudentPdfImageTools";

export const metadata: Metadata = {
  title: "Image Converter & Compressor", description: "Convert images to WebP, JPG or PNG and adjust quality.",
    alternates: { canonical: "/tools/image-converter" }
};
export default function Page() { return <ToolLayout title="Image Converter & Compressor" description="Convert images to WebP, JPG or PNG and adjust quality."><ImageConverterTool /></ToolLayout>; }
