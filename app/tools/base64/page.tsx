import { Binary } from "lucide-react"; import ToolLayout from "@/components/tools/ToolLayout"; import Base64Tool from "@/components/tools/Base64Tool";
export const metadata={
  title:"Base64 Encoder & Decoder",description:"Encode and decode Base64 text locally in your browser.",
    alternates: { canonical: "/tools/base64" }
};
export default function Page(){return <ToolLayout title="Base64 Encoder & Decoder" description="Encode plain text to Base64 or decode Base64 back to readable text." icon={Binary}><Base64Tool/></ToolLayout>}
