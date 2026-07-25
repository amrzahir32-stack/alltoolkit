import { Wrench, type LucideIcon } from "lucide-react";
import AdSlot from "@/components/ads/AdSlot";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  maxWidth?: "5xl" | "6xl";
}

export default function ToolLayout({
  title,
  description,
  icon: Icon = Wrench,
  children,
  maxWidth = "5xl",
}: ToolLayoutProps) {
  const widthClass = maxWidth === "6xl" ? "max-w-6xl" : "max-w-5xl";
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any modern web browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="relative min-h-screen overflow-hidden py-16 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-[#D6B48B]/20 blur-3xl" />
        <div className="absolute right-[-8rem] top-52 h-80 w-80 rounded-full bg-[#B78962]/15 blur-3xl" />
      </div>

      <div className={`mx-auto ${widthClass} px-5 sm:px-6`}>
        <div className="mb-9 flex items-start gap-4 sm:mb-12 sm:gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#DCC6B0] bg-[#FFF9F2] shadow-[0_12px_30px_rgba(113,78,48,.12)] sm:h-16 sm:w-16">
            <Icon className="h-7 w-7 text-[#A7744D] sm:h-8 sm:w-8" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#A7744D]">AllToolkit utility</p>
            <h1 className="break-words text-3xl font-black tracking-tight text-[#2D241C] sm:text-5xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#6B5B4D] sm:text-lg">{description}</p>
          </div>
        </div>

        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_TOOL_TOP_SLOT} format="horizontal" />

        {children}

        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_SLOT} format="horizontal" />
      </div>
    </main>
  );
}
