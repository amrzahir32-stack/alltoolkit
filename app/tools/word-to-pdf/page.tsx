import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { WordToPdfTool } from "@/components/tools/DocumentConverters";

export const metadata: Metadata = { title: "Word to PDF", description: "Convert Word documents to PDF while preserving their original formatting.", alternates: { canonical: "/tools/word-to-pdf" } };
export default function Page() { return <ToolLayout title="Word to PDF" description="Convert Word documents to PDF while preserving their original formatting."><WordToPdfTool /></ToolLayout>; }
