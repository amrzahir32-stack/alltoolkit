import type { Metadata } from "next";
import { Table2 } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { CsvJsonTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "CSV ↔ JSON Converter", description: "Convert CSV files to JSON and JSON arrays back to CSV.",
    alternates: { canonical: "/tools/csv-json-converter" }
};

export default function Page() {
  return <ToolLayout title="CSV ↔ JSON Converter" description="Convert CSV files to JSON and JSON arrays back to CSV." icon={Table2} maxWidth="6xl"><CsvJsonTool /></ToolLayout>;
}
