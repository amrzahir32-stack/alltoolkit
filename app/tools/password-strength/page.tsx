import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { PasswordStrengthTool } from "@/components/tools/ExtraTools";

export const metadata: Metadata = {
  title: "Password Strength Checker", description: "Review password length and character variety locally.",
    alternates: { canonical: "/tools/password-strength" }
};

export default function Page() {
  return <ToolLayout title="Password Strength Checker" description="Review password length and character variety locally." icon={ShieldCheck} maxWidth="6xl"><PasswordStrengthTool /></ToolLayout>;
}
