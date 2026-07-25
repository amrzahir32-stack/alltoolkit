import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { GradeCalculatorTool } from "@/components/tools/StudentPdfImageTools";

export const metadata: Metadata = {
  title: "Grade Calculator", description: "Convert earned points into percentages and a 20-point grade.",
    alternates: { canonical: "/tools/grade-calculator" }
};
export default function Page() { return <ToolLayout title="Grade Calculator" description="Convert earned points into percentages and a 20-point grade."><GradeCalculatorTool /></ToolLayout>; }
