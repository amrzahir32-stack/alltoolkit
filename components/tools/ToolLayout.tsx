import Link from "next/link";
import { Wrench, type LucideIcon } from "lucide-react";
import AdSlot from "@/components/ads/AdSlot";
import { tools } from "@/data/tools";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  maxWidth?: "5xl" | "6xl";
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://alltoolkit.org").replace(/\/$/, "");

export default function ToolLayout({
  title,
  description,
  icon: Icon = Wrench,
  children,
  maxWidth = "5xl",
}: ToolLayoutProps) {
  const widthClass = maxWidth === "6xl" ? "max-w-6xl" : "max-w-5xl";
  const currentTool = tools.find((tool) => tool.title === title);
  const currentUrl = currentTool ? `${siteUrl}${currentTool.href}` : siteUrl;
  const relatedTools = currentTool
    ? tools
        .filter((tool) => tool.category === currentTool.category && tool.id !== currentTool.id)
        .slice(0, 4)
    : [];

  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    url: currentUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any modern web browser",
    browserRequirements: "Requires JavaScript and a modern web browser",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "AllToolkit",
      url: siteUrl,
      logo: `${siteUrl}/alltoolkit-icon-v3-512.png`,
    },
  };

  const faqItems = [
    { question: `Is ${title} free to use?`, answer: `Yes. ${title} is available without an account or subscription.` },
    { question: `Does ${title} work on mobile devices?`, answer: "Yes. AllToolkit is designed for modern desktop and mobile browsers." },
    { question: "Is my information private?", answer: currentTool?.category === "PDF" ? "Browser-based tools process files locally when possible. Server converters use the conversion API only for the requested job." : "This tool runs in your browser and does not require an account." },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbSchema = currentTool
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/tools` },
          { "@type": "ListItem", position: 3, name: title, item: currentUrl },
        ],
      }
    : null;

  return (
    <main id="main-content" tabIndex={-1} className="relative min-h-screen overflow-hidden py-16 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {breadcrumbSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      ) : null}

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-[#D6B48B]/20 blur-3xl" />
        <div className="absolute right-[-8rem] top-52 h-80 w-80 rounded-full bg-[#B78962]/15 blur-3xl" />
      </div>

      <div className={`mx-auto ${widthClass} px-5 sm:px-6`}>
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#7A6858]">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="transition hover:text-[#8D5E3A]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/tools" className="transition hover:text-[#8D5E3A]">Tools</Link></li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-[#2D241C]" aria-current="page">{title}</li>
          </ol>
        </nav>

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

        <section className="mt-10 rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-6 sm:p-8" aria-labelledby="tool-faq-heading">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#A7744D]">Helpful answers</p>
          <h2 id="tool-faq-heading" className="mt-2 text-2xl font-black text-[#2D241C]">Frequently asked questions</h2>
          <div className="mt-5 divide-y divide-[#E7D8C7]">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="cursor-pointer list-none pr-8 font-bold text-[#3D3026] marker:content-none">{item.question}</summary>
                <p className="mt-3 max-w-3xl leading-7 text-[#6B5B4D]">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {relatedTools.length > 0 ? (
          <section className="mt-10 rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-6 sm:p-8" aria-labelledby="related-tools-heading">
            <h2 id="related-tools-heading" className="text-2xl font-black text-[#2D241C]">Related tools</h2>
            <p className="mt-2 text-[#6B5B4D]">Continue with another useful {currentTool?.category.toLowerCase()} utility.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 font-bold text-[#3D3026] transition hover:-translate-y-0.5 hover:border-[#C59A73] hover:text-[#8D5E3A]"
                >
                  {tool.title}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_SLOT} format="horizontal" />
      </div>
    </main>
  );
}
