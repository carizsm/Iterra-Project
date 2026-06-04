"use client";

import { motion, useReducedMotion } from "framer-motion";

export function TravelHeroVisual({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`relative min-h-56 overflow-hidden rounded-[1.5rem] border border-border bg-paper p-5 shadow-[0_24px_70px_rgba(49,88,70,0.10)] ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 bottom-0 h-28 bg-soft/70" />
      <motion.div
        className="absolute right-10 top-8 h-12 w-12 rounded-full bg-[#e4b16f]/70"
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-8 top-9 rounded-full bg-surface px-4 py-2 text-xs font-medium text-muted shadow-[0_12px_30px_rgba(49,88,70,0.08)]"
        animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        Rinjani
      </motion.div>
      <svg viewBox="0 0 520 260" className="absolute inset-x-0 bottom-0 h-full w-full">
        <path d="M0 214 C80 184 134 198 210 164 C296 126 356 148 520 94 V260 H0 Z" fill="#315846" opacity="0.12" />
        <path d="M0 232 C86 205 148 220 232 183 C330 139 402 154 520 116 V260 H0 Z" fill="#315846" opacity="0.18" />
        <path d="M76 206 L166 98 L232 206 Z" fill="#315846" opacity="0.78" />
        <path d="M194 206 L312 78 L432 206 Z" fill="#274638" opacity="0.88" />
        <path d="M306 84 L335 126 L286 126 Z" fill="#F8F3EA" opacity="0.75" />
        <motion.path
          d="M70 174 C150 126 230 236 316 164 C370 119 424 139 466 96"
          fill="none"
          stroke="#C86B4A"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 13"
          initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.4 }}
          animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 4.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.circle
          cx="466"
          cy="96"
          r="8"
          fill="#C86B4A"
          animate={reduceMotion ? undefined : { scale: [1, 1.18, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
