"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BudgetProgress({
  value,
  className,
  tone = "primary",
}: {
  value: number;
  className?: string;
  tone?: "primary" | "accent" | "warning";
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const color =
    tone === "warning" ? "bg-[#d6a56d]" : tone === "accent" ? "bg-accent" : "bg-primary";

  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-soft", className)}>
      <motion.div
        className={cn("h-full rounded-full", color)}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
