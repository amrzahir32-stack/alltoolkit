"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import HeroSearch from "@/components/search/HeroSearch";

const tools = [
  ["Password Generator", "/tools/password-generator"],
  ["QR Generator", "/tools/qr-generator"],
  ["Word Counter", "/tools/word-counter"],
  ["JSON Formatter", "/tools/json-formatter"],
  ["UUID Generator", "/tools/uuid-generator"],
  ["Calculator", "/tools/percentage-calculator"],
];

export default function Hero() {
  return (
    <section className="relative z-20 overflow-x-clip overflow-y-visible">

      {/* Background */}

      <div className="absolute inset-0 -z-30 bg-[#FAF7F2]" />

      {/* Top Left Glow */}

      <div className="absolute -left-32 -top-32 -z-20 h-[430px] w-[430px] rounded-full bg-[#E4C7A3]/30 blur-[130px]" />

      {/* Top Right Glow */}

      <div className="absolute -right-32 -top-32 -z-20 h-[430px] w-[430px] rounded-full bg-[#E4C7A3]/30 blur-[130px]" />

      {/* Bottom Center Glow */}

      <div className="absolute left-1/2 bottom-[-220px] -z-20 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#C69A6D]/15 blur-[170px]" />

      {/* Soft Light */}

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.95),transparent_45%)]" />

      <div className="mx-auto flex min-h-[72vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        {/* Logo */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .45 }}
        >
          <Logo size={92} />
        </motion.div>

        {/* Search */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .15 }}
          className="relative z-50 mt-12 w-full max-w-5xl"
        >
          <HeroSearch />
        </motion.div>

        {/* Quick Tools */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          {tools.map(([tool, href]) => (
            <Link
              key={tool}
              href={href}
              className="rounded-full border border-[#E7D8C6] bg-[#FFFCF8] px-5 py-2.5 text-sm font-semibold text-[#5A4A3E] shadow-md backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#B68D62] hover:bg-white hover:shadow-xl"
            >
              {tool}
            </Link>
          ))}
        </motion.div>

      </div>

    </section>
  );
}