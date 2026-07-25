import type { Metadata } from "next";
import { AverageCalculator } from "@/components/tools/EverydayTools";

export const metadata: Metadata = {
  title: "Average Calculator",
  description: "Calculate mean, minimum and maximum for a set of numbers.",
  alternates: { canonical: "/tools/average-calculator" },
};

export default function Page(){return <AverageCalculator/>}
