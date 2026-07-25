import type { Metadata } from "next";
import { DeadlineCalculator } from "@/components/tools/EverydayTools";

export const metadata: Metadata = {
  title: "Deadline Countdown",
  description: "Count the days until an exam, assignment or event.",
  alternates: { canonical: "/tools/deadline-countdown" },
};

export default function Page(){return <DeadlineCalculator/>}
