import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfTwoUpTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Two Pages per Sheet", description: "Place two PDF pages side by side on each sheet.", alternates: { canonical: "/tools/pdf-two-up" } };
export default function Page() { return <ToolLayout title="Two Pages per Sheet" description="Place two PDF pages side by side on each sheet."><PdfTwoUpTool /></ToolLayout>; }
