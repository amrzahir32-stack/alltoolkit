import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfPortraitPagesTool } from "@/components/tools/PdfMoreTools";

export const metadata: Metadata = { title: "Extract Portrait PDF Pages", description: "Create a PDF containing only portrait pages.", alternates: { canonical: "/tools/pdf-portrait-pages" } };
export default function Page() { return <ToolLayout title="Extract Portrait PDF Pages" description="Create a PDF containing only portrait pages."><PdfPortraitPagesTool /></ToolLayout>; }
