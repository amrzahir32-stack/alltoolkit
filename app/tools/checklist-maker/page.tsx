import type { Metadata } from "next";
import { ChecklistMaker } from "@/components/tools/EverydayTools";

export const metadata: Metadata = {
  title: "Checklist Maker",
  description: "Create a clean printable checklist from any list.",
  alternates: { canonical: "/tools/checklist-maker" },
};

export default function Page(){return <ChecklistMaker/>}
