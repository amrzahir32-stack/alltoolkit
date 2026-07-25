import { KeyRound } from "lucide-react";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata = {
  title: "Password Generator",
    description: "Generate strong, secure passwords instantly for free.",
    alternates: { canonical: "/tools/password-generator" },
};

export default function PasswordGeneratorPage() {
  return (
    <ToolLayout
      title="Password Generator"
      description="Create strong passwords in seconds. Everything runs in your browser, so nothing is uploaded or stored."
      icon={KeyRound}
    >
      <PasswordGenerator />
    </ToolLayout>
  );
}
