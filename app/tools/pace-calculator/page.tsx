import type { Metadata } from "next";
import { PaceCalculator } from "@/components/tools/EverydayTools";

export const metadata: Metadata = {
  title: "Running Pace Calculator",
  description: "Calculate pace and speed from distance and time.",
  alternates: { canonical: "/tools/pace-calculator" },
};

export default function Page(){return <PaceCalculator/>}
