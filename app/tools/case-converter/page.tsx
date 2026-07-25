import { CaseSensitive } from "lucide-react"; import ToolLayout from "@/components/tools/ToolLayout"; import CaseConverter from "@/components/tools/CaseConverter";
export const metadata={
  title:"Case Converter",description:"Convert text between uppercase, lowercase, title case and sentence case.",
    alternates: { canonical: "/tools/case-converter" }
};
export default function Page(){return <ToolLayout title="Case Converter" description="Transform text between common capitalization styles instantly." icon={CaseSensitive}><CaseConverter/></ToolLayout>}
