import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfNormalizeSizesTool } from "@/components/tools/PdfMoreTools";

export const metadata: Metadata = { title: "Normalize PDF Page Sizes", description: "Scale mixed PDF pages to one consistent page size.", alternates: { canonical: "/tools/pdf-normalize-sizes" } };
export default function Page() { return <ToolLayout title="Normalize PDF Page Sizes" description="Scale mixed PDF pages to one consistent page size."><PdfNormalizeSizesTool /></ToolLayout>; }
