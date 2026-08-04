import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-bold uppercase tracking-[.2em] text-[#A7744D]">404</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-black tracking-tight text-[#2D241C] sm:text-5xl">
        This page is not in the toolkit.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-[#6B5B4D]">
        The link may be old, or the page may have moved. Browse the full library to find the tool you need.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/tools" className="rounded-xl bg-[#A7744D] px-6 py-3 font-bold text-white transition hover:bg-[#8F603E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] focus-visible:ring-offset-2">
          Browse tools
        </Link>
        <Link href="/" className="rounded-xl border border-[#DCC6B0] bg-[#FFF9F2] px-6 py-3 font-bold text-[#6B4A33] transition hover:bg-[#F3E6D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] focus-visible:ring-offset-2">
          Back home
        </Link>
      </div>
    </main>
  );
}
