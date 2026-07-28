import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfSwapPagesTool } from "@/components/tools/PdfMoreTools";

export const metadata: Metadata = { title: "Swap PDF Pages", description: "Swap two page positions without changing the rest of the document.", alternates: { canonical: "/tools/pdf-swap-pages" } };
export default function Page() { return <ToolLayout title="Swap PDF Pages" description="Swap two page positions without changing the rest of the document."><PdfSwapPagesTool /></ToolLayout>; }
