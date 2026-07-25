import type { Metadata } from "next";
import { Cake } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { AgeCalculatorTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Age Calculator", description: "Calculate exact age in years, months, days and total days.",
    alternates: { canonical: "/tools/age-calculator" }
};

export default function Page() {
  return <ToolLayout title="Age Calculator" description="Calculate exact age in years, months, days and total days." icon={Cake} maxWidth="6xl"><AgeCalculatorTool /></ToolLayout>;
}
