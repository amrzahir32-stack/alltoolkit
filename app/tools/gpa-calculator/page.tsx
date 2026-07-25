import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { GpaCalculatorTool } from "@/components/tools/StudentPdfImageTools";

export const metadata: Metadata = {
  title: "GPA & Average Calculator", description: "Calculate a weighted average and approximate 4.0 GPA.",
    alternates: { canonical: "/tools/gpa-calculator" }
};
export default function Page() { return <ToolLayout title="GPA & Average Calculator" description="Calculate a weighted average and approximate 4.0 GPA."><GpaCalculatorTool /></ToolLayout>; }
