import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { ExcelToPdfTool } from "@/components/tools/DocumentConverters";

export const metadata: Metadata = { title: "Excel to PDF", description: "Convert Excel spreadsheets to PDF with server-powered document rendering.", alternates: { canonical: "/tools/excel-to-pdf" } };
export default function Page() { return <ToolLayout title="Excel to PDF" description="Convert Excel spreadsheets to PDF with server-powered document rendering."><ExcelToPdfTool /></ToolLayout>; }
