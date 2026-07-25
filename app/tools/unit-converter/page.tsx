import type { Metadata } from "next";
import { ArrowLeftRight } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { UnitConverterTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Unit Converter", description: "Convert length, weight and temperature units.",
    alternates: { canonical: "/tools/unit-converter" }
};

export default function Page() {
  return <ToolLayout title="Unit Converter" description="Convert length, weight and temperature units." icon={ArrowLeftRight} maxWidth="6xl"><UnitConverterTool /></ToolLayout>;
}
