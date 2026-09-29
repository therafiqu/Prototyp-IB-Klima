"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const viewport = { once: true, margin: "0px 0px -100px 0px" } as const;

const staggerTags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
} as const;

const staggerItemTags = {
  div: motion.div,
  li: motion.li,
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 64, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewport}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  stagger = 0.14,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: keyof typeof staggerTags;
}) {
  const reduce = useReducedMotion();
  const Comp = staggerTags[as];

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : 0.08 },
        },
      }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof typeof staggerItemTags;
}) {
  const reduce = useReducedMotion();
  const Comp = staggerItemTags[as];

  return (
    <Comp
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.94 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
      }}
    >
      {children}
    </Comp>
  );
}
