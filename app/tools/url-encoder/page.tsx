import type { Metadata } from "next";
import { Link } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { UrlEncoderTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder", description: "Encode or decode URLs and query text safely.",
    alternates: { canonical: "/tools/url-encoder" }
};

export default function Page() {
  return <ToolLayout title="URL Encoder & Decoder" description="Encode or decode URLs and query text safely." icon={Link} maxWidth="6xl"><UrlEncoderTool /></ToolLayout>;
}
