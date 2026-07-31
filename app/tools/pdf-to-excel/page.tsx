import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfToExcelTool } from "@/components/tools/DocumentConverters";

export const metadata: Metadata = { title: "PDF to Excel", description: "Extract PDF text and simple table content into an Excel workbook.", alternates: { canonical: "/tools/pdf-to-excel" } };
export default function Page() { return <ToolLayout title="PDF to Excel" description="Extract PDF text and simple table content into an Excel workbook."><PdfToExcelTool /></ToolLayout>; }
