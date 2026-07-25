import type { Metadata } from "next";
import { RandomPicker } from "@/components/tools/EverydayTools";

export const metadata: Metadata = {
  title: "Random Name Picker",
  description: "Pick a random name, option or topic from a list.",
  alternates: { canonical: "/tools/random-picker" },
};

export default function Page(){return <RandomPicker/>}
