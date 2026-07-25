import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { PomodoroTool } from "@/components/tools/StudentPdfImageTools";

export const metadata: Metadata = {
  title: "Pomodoro Timer", description: "Run a focused study timer without distractions.",
    alternates: { canonical: "/tools/pomodoro-timer" }
};
export default function Page() { return <ToolLayout title="Pomodoro Timer" description="Run a focused study timer without distractions."><PomodoroTool /></ToolLayout>; }
