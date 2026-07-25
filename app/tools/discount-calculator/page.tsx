import type { Metadata } from "next";
import { DiscountCalculator } from "@/components/tools/EverydayTools";

export const metadata: Metadata = {
  title: "Discount Calculator",
  description: "Calculate sale prices and savings instantly.",
  alternates: { canonical: "/tools/discount-calculator" },
};

export default function Page(){return <DiscountCalculator/>}
