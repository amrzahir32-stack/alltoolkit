import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { DateDifferenceTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Date Difference Calculator", description: "Measure the time between two calendar dates.",
    alternates: { canonical: "/tools/date-difference" }
};

export default function Page() {
  return <ToolLayout title="Date Difference Calculator" description="Measure the time between two calendar dates." icon={CalendarDays} maxWidth="6xl"><DateDifferenceTool /></ToolLayout>;
}
