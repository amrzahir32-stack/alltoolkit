import type { Metadata } from "next";
import { Activity } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { BmiCalculatorTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "BMI Calculator", description: "Calculate body mass index from height and weight.",
    alternates: { canonical: "/tools/bmi-calculator" }
};

export default function Page() {
  return <ToolLayout title="BMI Calculator" description="Calculate body mass index from height and weight." icon={Activity} maxWidth="6xl"><BmiCalculatorTool /></ToolLayout>;
}
