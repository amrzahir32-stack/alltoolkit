import type { Metadata } from "next";
import { TextDiff } from "@/components/tools/EverydayTools";

export const metadata: Metadata = {
  title: "Text Difference Checker",
  description: "Compare two texts line by line and spot changes.",
  alternates: { canonical: "/tools/text-diff" },
};

export default function Page(){return <TextDiff/>}
