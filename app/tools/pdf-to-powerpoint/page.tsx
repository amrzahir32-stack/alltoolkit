import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PdfToPowerPointTool } from "@/components/tools/DocumentConverters";

export const metadata: Metadata = { title: "PDF to PowerPoint", description: "Turn PDF pages into an editable PowerPoint presentation.", alternates: { canonical: "/tools/pdf-to-powerpoint" } };
export default function Page() { return <ToolLayout title="PDF to PowerPoint" description="Turn PDF pages into an editable PowerPoint presentation."><PdfToPowerPointTool /></ToolLayout>; }
