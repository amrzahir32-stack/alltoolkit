import type { Metadata } from "next";
import { KeyRound } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { JwtDecoderTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "JWT Decoder", description: "Inspect JWT headers and payloads without verifying or uploading them.",
    alternates: { canonical: "/tools/jwt-decoder" }
};

export default function Page() {
  return <ToolLayout title="JWT Decoder" description="Inspect JWT headers and payloads without verifying or uploading them." icon={KeyRound} maxWidth="6xl"><JwtDecoderTool /></ToolLayout>;
}
