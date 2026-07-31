import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PowerPointToPdfTool } from "@/components/tools/DocumentConverters";

export const metadata: Metadata = { title: "PowerPoint to PDF", description: "Convert PowerPoint presentations to PDF while preserving slide layouts.", alternates: { canonical: "/tools/powerpoint-to-pdf" } };
export default function Page() { return <ToolLayout title="PowerPoint to PDF" description="Convert PowerPoint presentations to PDF while preserving slide layouts."><PowerPointToPdfTool /></ToolLayout>; }
