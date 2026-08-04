import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Suggest a Tool",
  description: "Contact AllToolkit, report a problem, or suggest a useful new browser-based tool.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact AllToolkit",
    description: "Share a tool idea, report a problem, or suggest an improvement.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-[70vh] max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
      <div className="mb-10 max-w-3xl sm:mb-12">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-[#A7744D]">Contact</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-[#2D241C] sm:text-6xl">
          Ideas are always welcome.
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#6B5B4D]">
          Reach out with a new tool idea, feedback about the website, or a bug that needs attention.
        </p>
      </div>
      <ContactForm />
    </main>
  );
}
