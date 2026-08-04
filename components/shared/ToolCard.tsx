import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export default function ToolCard({ title, description, href, icon }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-7 shadow-[0_16px_45px_rgba(91,62,38,.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#C9A684] hover:shadow-[0_24px_60px_rgba(167,116,77,.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A7744D]/25 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#E6C8A5]/20 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6B48B] to-[#A7744D] text-4xl shadow-lg transition duration-300 group-hover:scale-105 group-hover:rotate-2" aria-hidden="true">
          {icon}
        </div>
        <h3 className="mt-7 text-2xl font-black tracking-tight text-[#2D241C]">{title}</h3>
        <p className="mt-4 flex-1 leading-7 text-[#6B5B4D]">{description}</p>
        <span className="mt-8 flex items-center gap-2 font-bold text-[#A7744D]">
          Open tool
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
