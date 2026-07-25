"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
}

export default function AnimatedSection({
  children,
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      {children}
    </motion.section>
  );
}