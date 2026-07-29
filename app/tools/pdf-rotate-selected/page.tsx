import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfRotateSelectedTool } from "@/components/tools/PdfMoreTools";

export const metadata: Metadata = { title: "Rotate Selected PDF Pages", description: "Rotate only the PDF pages you choose.", alternates: { canonical: "/tools/pdf-rotate-selected" } };
export default function Page() { return <ToolLayout title="Rotate Selected PDF Pages" description="Rotate only the PDF pages you choose."><PdfRotateSelectedTool /></ToolLayout>; }
