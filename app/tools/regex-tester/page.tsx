import type { Metadata } from "next";
import { Regex } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { RegexTesterTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Regex Tester", description: "Test regular expressions and inspect every match instantly.",
    alternates: { canonical: "/tools/regex-tester" }
};

export default function Page() {
  return <ToolLayout title="Regex Tester" description="Test regular expressions and inspect every match instantly." icon={Regex} maxWidth="6xl"><RegexTesterTool /></ToolLayout>;
}
