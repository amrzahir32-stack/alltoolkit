import type { Metadata } from "next";
import { CodeXml } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { HtmlEntitiesTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "HTML Entity Encoder", description: "Encode or decode HTML entities in your browser.",
    alternates: { canonical: "/tools/html-entities" }
};

export default function Page() {
  return <ToolLayout title="HTML Entity Encoder" description="Encode or decode HTML entities in your browser." icon={CodeXml} maxWidth="6xl"><HtmlEntitiesTool /></ToolLayout>;
}
