import type { Metadata } from "next";
import { Fingerprint } from "lucide-react";
import UUIDGenerator from "@/components/tools/UUIDGenerator";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata: Metadata = {
  title: "UUID Generator",
    description: "Generate secure UUID v4 identifiers instantly.",
    alternates: { canonical: "/tools/uuid-generator" },
};

export default function Page() {
  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate secure UUID v4 identifiers directly in your browser."
      icon={Fingerprint}
    >
      <UUIDGenerator />
    </ToolLayout>
  );
}
