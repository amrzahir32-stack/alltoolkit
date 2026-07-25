import type { Metadata } from "next";
import { AttendanceCalculator } from "@/components/tools/EverydayTools";

export const metadata: Metadata = {
  title: "Attendance Calculator",
  description: "Track attendance and calculate classes needed for a target attendance rate.",
  alternates: { canonical: "/tools/attendance-calculator" },
};

export default function Page(){return <AttendanceCalculator/>}
