import { Hash } from "lucide-react"; import ToolLayout from "@/components/tools/ToolLayout"; import HashGenerator from "@/components/tools/HashGenerator";
export const metadata={
  title:"Hash Generator",description:"Generate SHA hashes locally in your browser.",
    alternates: { canonical: "/tools/hash-generator" }
};
export default function Page(){return <ToolLayout title="Hash Generator" description="Generate SHA-256, SHA-384 or SHA-512 hashes without uploading your text." icon={Hash}><HashGenerator/></ToolLayout>}
