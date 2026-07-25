import type { Metadata } from "next";
import { Clock3 } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { TimestampTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter", description: "Convert Unix timestamps to readable dates and back.",
    alternates: { canonical: "/tools/timestamp-converter" }
};

export default function Page() {
  return <ToolLayout title="Unix Timestamp Converter" description="Convert Unix timestamps to readable dates and back." icon={Clock3} maxWidth="6xl"><TimestampTool /></ToolLayout>;
}
