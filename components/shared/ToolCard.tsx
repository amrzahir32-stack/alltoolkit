"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export default function ToolCard({
  title,
  description,
  href,
  icon,
}: ToolCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Link
        href={href}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-8 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(182,141,98,.25)]"
      >
        {/* Background Glow */}

        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#E6C8A5]/20 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="relative z-10">

          <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6B48B] to-[#A7744D] text-4xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>

          <h3 className="mt-7 text-2xl font-bold text-[#2D241C]">
            {title}
          </h3>

          <p className="mt-4 flex-1 leading-7 text-[#6B5B4D]">
            {description}
          </p>

          <div className="mt-8 flex items-center gap-2 font-semibold text-[#A7744D]">
            Open Tool

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </div>

        </div>

      </Link>
    </motion.div>
  );
}