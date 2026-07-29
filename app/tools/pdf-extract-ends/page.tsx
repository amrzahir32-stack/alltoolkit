import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfExtractEndsTool } from "@/components/tools/PdfMoreTools";

export const metadata: Metadata = { title: "Extract First and Last PDF Pages", description: "Extract the first page, last page, or both.", alternates: { canonical: "/tools/pdf-extract-ends" } };
export default function Page() { return <ToolLayout title="Extract First and Last PDF Pages" description="Extract the first page, last page, or both."><PdfExtractEndsTool /></ToolLayout>; }
