import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn why AllToolkit provides fast, useful and mobile-friendly browser tools for everyday tasks.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <main className="mx-auto min-h-[65vh] max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
      <p className="font-bold uppercase tracking-[.2em] text-[#A7744D]">About</p>
      <h1 className="mt-3 text-4xl font-black text-[#2D241C] sm:text-5xl">Simple tools for everyday work.</h1>
      <div className="mt-8 space-y-5 text-lg leading-8 text-[#6B5B4D]">
        <p>
          AllToolkit is a growing collection of free online utilities for students, developers, creators and anyone who wants to finish a small task without installing another app.
        </p>
        <p>
          The tools are designed to be easy to understand, responsive on phones and private. Whenever possible, processing happens directly inside your browser.
        </p>
        <p>
          Have an idea for a useful tool? Visit the contact page and send it to <a className="font-bold text-[#A7744D]" href="mailto:amrzahir32@gmail.com">amrzahir32@gmail.com</a>.
        </p>
      </div>
    </main>
  );
}
