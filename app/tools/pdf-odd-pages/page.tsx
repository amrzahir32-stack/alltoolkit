import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfOddPagesTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Extract Odd PDF Pages", description: "Create a new PDF containing only odd-numbered pages.", alternates: { canonical: "/tools/pdf-odd-pages" } };
export default function Page() { return <ToolLayout title="Extract Odd PDF Pages" description="Create a new PDF containing only odd-numbered pages."><PdfOddPagesTool /></ToolLayout>; }
