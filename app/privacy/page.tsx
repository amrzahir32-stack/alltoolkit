import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read how AllToolkit handles browser-based tool data and basic website information.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-[65vh] max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-black text-[#2D241C] sm:text-5xl">Privacy policy</h1>
      <p className="mt-3 text-sm text-[#8B7A6C]">Last updated: July 25, 2026</p>
      <div className="mt-8 space-y-6 leading-8 text-[#6B5B4D]">
        <section>
          <h2 className="text-xl font-black text-[#2D241C]">Browser-based processing</h2>
          <p className="mt-2">AllToolkit does not require an account. The current tools are designed to process entered text and selected files locally in your browser whenever possible. AllToolkit does not intentionally store the content you process with these tools.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#2D241C]">Hosting logs</h2>
          <p className="mt-2">The hosting provider may automatically record basic technical information, such as IP address, browser type, device type, requested page and timestamp, for security and reliability.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#2D241C]">Contact messages</h2>
          <p className="mt-2">The contact form opens your email application. Messages you choose to send are delivered to <a className="font-bold text-[#A7744D]" href="mailto:amrzahir32@gmail.com">amrzahir32@gmail.com</a> and are handled through the email services involved.</p>
        </section>
        <section>
          <h2 className="text-xl font-black text-[#2D241C]">Future services</h2>
          <p className="mt-2">If analytics, advertising, accounts or third-party processing services are added later, this policy should be updated before those features are enabled.</p>
        </section>
      </div>
    </main>
  );
}
