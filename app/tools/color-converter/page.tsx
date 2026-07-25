import type { Metadata } from "next";
import { Palette } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { ColorConverterTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "HEX & RGB Color Converter", description: "Pick a color and convert HEX values to RGB.",
    alternates: { canonical: "/tools/color-converter" }
};

export default function Page() {
  return <ToolLayout title="HEX & RGB Color Converter" description="Pick a color and convert HEX values to RGB." icon={Palette} maxWidth="6xl"><ColorConverterTool /></ToolLayout>;
}
