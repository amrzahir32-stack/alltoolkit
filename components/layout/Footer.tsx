import Link from "next/link";
import { Lightbulb, Mail } from "lucide-react";
import Logo from "@/components/Logo";

const email = "amrzahir32@gmail.com";
const toolLinks = [
  ["Password Generator", "/tools/password-generator"],
  ["PDF Merge", "/tools/pdf-merge"],
  ["Word Counter", "/tools/word-counter"],
  ["All Tools", "/tools"],
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#E7D8C7] bg-[#F7F0E8]/80">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-5 max-w-md leading-7 text-[#6B5B4D]">
              Free, useful browser tools with a clean experience. No account required, and many tools process files locally on your device.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 font-bold text-[#8E6240] transition hover:text-[#A7744D]"
              >
                <Mail className="h-4 w-4" />
                {email}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-bold text-[#8E6240] transition hover:text-[#A7744D] sm:ml-4"
              >
                <Lightbulb className="h-4 w-4" />
                Suggest a tool
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-black text-[#2D241C]">Popular tools</h2>
            <div className="mt-4 space-y-3">
              {toolLinks.map(([name, href]) => (
                <Link key={href} href={href} className="block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] focus-visible:ring-offset-2 text-[#6B5B4D] transition hover:text-[#A7744D]">
                  {name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-black text-[#2D241C]">AllToolkit</h2>
            <div className="mt-4 space-y-3">
              <Link href="/#categories" className="block text-[#6B5B4D] transition hover:text-[#A7744D] focus-visible:text-[#A7744D]">Categories</Link>
              <Link href="/about" className="block text-[#6B5B4D] transition hover:text-[#A7744D] focus-visible:text-[#A7744D]">About</Link>
              <Link href="/privacy" className="block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] focus-visible:ring-offset-2 text-[#6B5B4D] transition hover:text-[#A7744D]">Privacy</Link>
              <Link href="/terms" className="block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] focus-visible:ring-offset-2 text-[#6B5B4D] transition hover:text-[#A7744D]">Terms</Link>
              <Link href="/contact" className="block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] focus-visible:ring-offset-2 text-[#6B5B4D] transition hover:text-[#A7744D]">Contact & ideas</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#E7D8C7] pt-7 text-sm text-[#8B7A6C] sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} AllToolkit. All rights reserved.</p>
          <p>Built with Next.js · Designed for desktop and mobile</p>
        </div>
      </div>
    </footer>
  );
}
