import type { Metadata } from "next";
import { Dices } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { RandomTokenTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Random Token Generator", description: "Generate secure hexadecimal tokens with browser cryptography.",
    alternates: { canonical: "/tools/random-token" }
};

export default function Page() {
  return <ToolLayout title="Random Token Generator" description="Generate secure hexadecimal tokens with browser cryptography." icon={Dices} maxWidth="6xl"><RandomTokenTool /></ToolLayout>;
}
