import type { Metadata } from "next";
import { Landmark } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { LoanCalculatorTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Loan Calculator", description: "Estimate monthly payments, total cost and total interest.",
    alternates: { canonical: "/tools/loan-calculator" }
};

export default function Page() {
  return <ToolLayout title="Loan Calculator" description="Estimate monthly payments, total cost and total interest." icon={Landmark} maxWidth="6xl"><LoanCalculatorTool /></ToolLayout>;
}
