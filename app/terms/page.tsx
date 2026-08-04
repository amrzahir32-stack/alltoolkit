import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the terms that apply when using AllToolkit and its free online tools.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-[65vh] max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-black text-[#2D241C] sm:text-5xl">Terms of use</h1>
      <p className="mt-3 text-sm text-[#8B7A6C]">Last updated: July 25, 2026</p>
      <div className="mt-8 space-y-6 leading-8 text-[#6B5B4D]">
        <section>
          <h2 className="text-xl font-black text-[#2D241C]">General use</h2>
          <p className="mt-2">AllToolkit provides free utilities for general convenience. You may use the website for lawful personal, educational and professional purposes.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#2D241C]">Verify important results</h2>
          <p className="mt-2">Tools may produce incomplete or inaccurate results because of invalid input, browser limitations or software defects. Verify outputs before relying on them for financial, academic, legal, medical or other important decisions.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#2D241C]">Availability</h2>
          <p className="mt-2">The website is provided as available without a guarantee that every feature will always be uninterrupted, error-free or suitable for a particular purpose.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#2D241C]">Prohibited activity</h2>
          <p className="mt-2">Do not misuse the website, attempt unauthorized access, interfere with its operation, distribute malicious content or use it to violate applicable law or another person’s rights.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#2D241C]">Contact</h2>
          <p className="mt-2">Questions about these terms can be sent to <a className="font-bold text-[#A7744D]" href="mailto:amrzahir32@gmail.com">amrzahir32@gmail.com</a>.</p>
        </section>
      </div>
    </main>
  );
}
