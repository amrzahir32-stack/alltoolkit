import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfSplitEveryNTool } from "@/components/tools/PdfMoreTools";

export const metadata: Metadata = { title: "Split PDF Every N Pages", description: "Split a PDF into equal page groups and download each part.", alternates: { canonical: "/tools/pdf-split-every-n" } };
export default function Page() { return <ToolLayout title="Split PDF Every N Pages" description="Split a PDF into equal page groups and download each part."><PdfSplitEveryNTool /></ToolLayout>; }
