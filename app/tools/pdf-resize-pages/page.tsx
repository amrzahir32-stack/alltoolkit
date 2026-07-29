import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfResizePagesTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Resize PDF Pages", description: "Scale every PDF page up or down by percentage.", alternates: { canonical: "/tools/pdf-resize-pages" } };
export default function Page() { return <ToolLayout title="Resize PDF Pages" description="Scale every PDF page up or down by percentage."><PdfResizePagesTool /></ToolLayout>; }
