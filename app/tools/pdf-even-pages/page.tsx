import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfEvenPagesTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Extract Even PDF Pages", description: "Create a new PDF containing only even-numbered pages.", alternates: { canonical: "/tools/pdf-even-pages" } };
export default function Page() { return <ToolLayout title="Extract Even PDF Pages" description="Create a new PDF containing only even-numbered pages."><PdfEvenPagesTool /></ToolLayout>; }
