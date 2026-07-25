import type { Metadata } from "next";
import { TipCalculator } from "@/components/tools/EverydayTools";

export const metadata: Metadata = {
  title: "Tip Calculator",
  description: "Calculate tips and split bills between people.",
  alternates: { canonical: "/tools/tip-calculator" },
};

export default function Page(){return <TipCalculator/>}
