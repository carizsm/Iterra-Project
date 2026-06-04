"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const destinations = [
  "Mountains",
  "Beaches",
  "City Trip",
  "Open Trip",
  "Backpacking",
];

export function DestinationRotator() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % destinations.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <span className="inline-flex min-w-28 items-center rounded-full bg-soft px-3 py-1 text-sm font-medium text-primary">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={destinations[index]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {destinations[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
