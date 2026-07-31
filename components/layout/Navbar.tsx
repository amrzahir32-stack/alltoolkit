"use client";

import Link from "next/link";
import { Lightbulb, Menu, X } from "lucide-react";
import { MouseEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/Logo";

const links = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/#categories" },
  { name: "About", href: "/about" },
  { name: "Suggest a Tool", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, href: string) {
    setOpen(false);

    // Next.js does not always move when linking to the route already open.
    // Handle the two homepage links explicitly so they always land correctly.
    if (pathname === "/" && href === "/") {
      event.preventDefault();
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    if (pathname === "/" && href === "/#categories") {
      event.preventDefault();
      window.history.replaceState(null, "", "/#categories");
      document.getElementById("categories")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    // Explicitly request scrolling for every normal route transition.
    if (!href.includes("#")) {
      event.preventDefault();
      router.push(href, { scroll: true });
    }
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/#categories") return false;
    return pathname === href;
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <div className="rounded-2xl border border-[#E6D8C8] bg-[#FFFDFB]/90 shadow-[0_10px_40px_rgba(120,90,60,.10)] backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <Logo onClick={(event) => handleNavigation(event, "/")} />

            <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(event) => handleNavigation(event, link.href)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-lg px-1 py-2 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] focus-visible:ring-offset-2 ${
                    isActive(link.href)
                      ? "text-[#A7744D]"
                      : "text-[#6B5B4D] hover:text-[#A7744D]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/tools"
                onClick={(event) => handleNavigation(event, "/tools")}
                className="rounded-xl bg-gradient-to-r from-[#C49A6C] to-[#A7744D] px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] focus-visible:ring-offset-2 sm:px-5"
              >
                Browse Tools
              </Link>
              <button
                type="button"
                aria-label={open ? "Close navigation" : "Open navigation"}
                aria-expanded={open}
                aria-controls="mobile-navigation"
                onClick={() => setOpen((value) => !value)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E6D8C8] bg-[#FFFCF8] text-[#5F5044] transition hover:bg-[#F5ECE3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] focus-visible:ring-offset-2 lg:hidden"
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
                  onClick={(event) => handleNavigation(event, link.href)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-xl px-3 py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7744D] ${
                    isActive(link.href)
                      ? "bg-[#F5ECE3] text-[#A7744D]"
                      : "text-[#5F5044] hover:bg-[#F5ECE3]"
                  }`}
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
