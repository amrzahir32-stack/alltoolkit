import type { Metadata } from "next";
import ToolLibrary from "@/components/shared/ToolLibrary";

export const metadata: Metadata = {
  title: "All Tools",
  description: "Browse private browser-based utilities for PDFs, documents, images, students, developers and everyday work.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "All Tools | AllToolkit",
    description: "Search and filter browser-based tools for PDFs, documents, images, students, developers and everyday tasks.",
    url: "/tools",
  },
};

export default function ToolsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-[#A7744D]">Tool library</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-[#2D241C] sm:text-6xl">Find the right tool fast</h1>
        <p className="mt-5 text-lg leading-8 text-[#6B5B4D]">
          Search or filter private, browser-based tools. PDF, student, image, writing, developer and calculator utilities are grouped clearly.
        </p>
      </div>
      <ToolLibrary />
    </main>
  );
}
