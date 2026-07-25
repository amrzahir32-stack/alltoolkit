import type { Metadata } from "next";
import { ReadingTimeCalculator } from "@/components/tools/EverydayTools";

export const metadata: Metadata = {
  title: "Reading Time Calculator",
  description: "Estimate reading and speaking time from any text.",
  alternates: { canonical: "/tools/reading-time-calculator" },
};

export default function Page(){return <ReadingTimeCalculator/>}
