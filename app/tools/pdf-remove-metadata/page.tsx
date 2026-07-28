import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfRemoveMetadataTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Remove PDF Metadata", description: "Clear title, author, subject and creator metadata.", alternates: { canonical: "/tools/pdf-remove-metadata" } };
export default function Page() { return <ToolLayout title="Remove PDF Metadata" description="Clear title, author, subject and creator metadata."><PdfRemoveMetadataTool /></ToolLayout>; }
