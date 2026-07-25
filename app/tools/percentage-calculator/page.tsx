import type { Metadata } from "next";
import { Percent } from "lucide-react";
import PercentageCalculator from "@/components/tools/PercentageCalculator";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata: Metadata = {
  title: "Percentage Calculator",
    description: "Calculate percentages instantly.",
    alternates: { canonical: "/tools/percentage-calculator" },
};

export default function Page() {
  return (
    <ToolLayout
      title="Percentage Calculator"
      description="Calculate percentages, increases, decreases and ratios instantly."
      icon={Percent}
      maxWidth="6xl"
    >
      <PercentageCalculator />
    </ToolLayout>
  );
}
