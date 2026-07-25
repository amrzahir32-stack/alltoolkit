import type { Metadata } from "next";
import { StudyPlanner } from "@/components/tools/EverydayTools";

export const metadata: Metadata = {
  title: "Study Time Planner",
  description: "Split available study hours across your subjects.",
  alternates: { canonical: "/tools/study-planner" },
};

export default function Page(){return <StudyPlanner/>}
