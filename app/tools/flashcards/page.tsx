import type { Metadata } from "next";
import ToolLayout from "@/components/tools/ToolLayout";
import { FlashcardTool } from "@/components/tools/StudentPdfImageTools";

export const metadata: Metadata = {
  title: "Flashcard Maker", description: "Create and study flashcards saved on your device.",
    alternates: { canonical: "/tools/flashcards" }
};
export default function Page() { return <ToolLayout title="Flashcard Maker" description="Create and study flashcards saved on your device."><FlashcardTool /></ToolLayout>; }
