"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import {
  fadeInUp,
  listItemMotion,
  pageTransition,
  scaleIn,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

export function MotionPage({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageTransition}
      className={cn("min-h-full", className)}
      {...props}
    />
  );
}

export function MotionCard({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "rounded-md border border-border bg-surface shadow-[0_10px_30px_rgba(49,88,70,0.06)] transition-colors hover:border-primary/40 hover:shadow-[0_18px_44px_rgba(49,88,70,0.12)]",
        className,
      )}
      {...props}
    />
  );
}

export function MotionList({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={className}
      {...props}
    />
  );
}

export function MotionItem({ className, ...props }: HTMLMotionProps<"div">) {
  return <motion.div variants={staggerItem} className={className} {...props} />;
}

export function MotionListItem({ className, ...props }: HTMLMotionProps<"div">) {
  return <motion.div variants={listItemMotion} className={className} {...props} />;
}

export function SoftReveal({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className={className}
      {...props}
    />
  );
}
