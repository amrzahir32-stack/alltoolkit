import type { Metadata } from "next";
import { VatCalculator } from "@/components/tools/EverydayTools";

export const metadata: Metadata = {
  title: "VAT Calculator",
  description: "Add or remove VAT from any amount.",
  alternates: { canonical: "/tools/vat-calculator" },
};

export default function Page(){return <VatCalculator/>}
