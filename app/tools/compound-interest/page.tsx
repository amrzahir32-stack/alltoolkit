import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { CompoundInterestTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Compound Interest Calculator", description: "Estimate long-term growth with recurring contributions.",
    alternates: { canonical: "/tools/compound-interest" }
};

export default function Page() {
  return <ToolLayout title="Compound Interest Calculator" description="Estimate long-term growth with recurring contributions." icon={TrendingUp} maxWidth="6xl"><CompoundInterestTool /></ToolLayout>;
}
