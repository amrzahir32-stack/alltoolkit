import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfMetadataTool } from "@/components/tools/PdfAdvancedTools";

export const metadata: Metadata = { title: "Edit PDF Metadata", description: "Change a PDF title, author, subject and keywords privately.", alternates: { canonical: "/tools/pdf-metadata" } };
export default function Page() { return <ToolLayout title="Edit PDF Metadata" description="Change a PDF title, author, subject and keywords privately."><PdfMetadataTool /></ToolLayout>; }
