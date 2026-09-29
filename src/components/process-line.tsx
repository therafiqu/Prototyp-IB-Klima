"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProcessLine() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="absolute left-[10%] right-[10%] top-7 hidden h-0.5 origin-left bg-line md:block"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 1.2, ease }}
    />
  );
}
