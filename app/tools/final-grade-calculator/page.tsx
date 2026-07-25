import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { FinalGradeTool } from "@/components/tools/StudentPdfImageTools";

export const metadata: Metadata = {
  title: "Final Grade Calculator", description: "Find the score you need on your final exam.",
    alternates: { canonical: "/tools/final-grade-calculator" }
};
export default function Page() { return <ToolLayout title="Final Grade Calculator" description="Find the score you need on your final exam."><FinalGradeTool /></ToolLayout>; }
