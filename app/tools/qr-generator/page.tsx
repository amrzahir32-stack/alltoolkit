import { QrCode } from "lucide-react";
import QRGenerator from "@/components/tools/QRGenerator";
import ToolLayout from "@/components/tools/ToolLayout";

export const metadata = {
  title: "QR Code Generator",
    description: "Generate QR codes instantly for free.",
    alternates: { canonical: "/tools/qr-generator" },
};

export default function QRGeneratorPage() {
  return (
    <ToolLayout
      title="QR Code Generator"
      description="Turn any text, link or message into a downloadable QR code in seconds."
      icon={QrCode}
    >
      <QRGenerator />
    </ToolLayout>
  );
}
