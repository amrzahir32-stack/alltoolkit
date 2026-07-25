import { TextCursorInput } from "lucide-react";
import WordCounter from "@/components/tools/WordCounter";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata = {
  title: "Word Counter",
    description: "Count words, characters, sentences and reading time instantly.",
    alternates: { canonical: "/tools/word-counter" },
};

export default function Page() {
  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters and sentences while estimating reading time in real time."
      icon={TextCursorInput}
      maxWidth="6xl"
    >
      <WordCounter />
    </ToolLayout>
  );
}
