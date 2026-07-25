"use client";

import Link from "next/link";
import { Lightbulb, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/Logo";

const links = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/#categories" },
  { name: "About", href: "/about" },
  { name: "Suggest a Tool", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <div className="rounded-2xl border border-[#E6D8C8] bg-[#FFFDFB]/90 shadow-[0_10px_40px_rgba(120,90,60,.10)] backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <Logo />
            <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
              {links.map((link) => (
                <Link key={link.name} href={link.href} className="font-semibold text-[#6B5B4D] transition hover:text-[#A7744D]">
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Link
                href="/tools"
                className="rounded-xl bg-gradient-to-r from-[#C49A6C] to-[#A7744D] px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 sm:px-5"
              >
                Browse Tools
              </Link>
              <button
                type="button"
                aria-label="Toggle navigation"
                aria-expanded={open}
                aria-controls="mobile-navigation"
                onClick={() => setOpen((value) => !value)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E6D8C8] bg-[#FFFCF8] lg:hidden"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
          {open && (
            <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-[#E9DDD0] px-4 py-3 lg:hidden">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-3 font-semibold text-[#5F5044] hover:bg-[#F5ECE3]"
                >
                  {link.name === "Suggest a Tool" && <Lightbulb className="h-4 w-4 text-[#A7744D]" />}
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
