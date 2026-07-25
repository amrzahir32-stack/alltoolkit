import { Braces } from "lucide-react";
import JSONFormatter from "@/components/tools/JSONFormatter";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata = {
  title: "JSON Formatter",
    description: "Format, beautify and validate JSON instantly.",
    alternates: { canonical: "/tools/json-formatter" },
};

export default function JSONFormatterPage() {
  return (
    <ToolLayout
      title="JSON Formatter"
      description="Beautify, validate and copy JSON directly in your browser."
      icon={Braces}
      maxWidth="6xl"
    >
      <JSONFormatter />
    </ToolLayout>
  );
}
