import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfLandscapePagesTool } from "@/components/tools/PdfMoreTools";

export const metadata: Metadata = { title: "Extract Landscape PDF Pages", description: "Create a PDF containing only landscape pages.", alternates: { canonical: "/tools/pdf-landscape-pages" } };
export default function Page() { return <ToolLayout title="Extract Landscape PDF Pages" description="Create a PDF containing only landscape pages."><PdfLandscapePagesTool /></ToolLayout>; }
