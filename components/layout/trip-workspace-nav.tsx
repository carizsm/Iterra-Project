"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard, ReceiptText, Route, Star, Users, Wallet } from "lucide-react";
import { workspaceNavItems } from "@/lib/constants";
import { tabIndicator } from "@/lib/animations";
import { cn } from "@/lib/utils";

const icons = {
  overview: LayoutDashboard,
  itinerary: Route,
  budget: Wallet,
  expenses: ReceiptText,
  members: Users,
  review: Star,
} as const;

export function TripWorkspaceNav({
  tripId,
  active,
}: {
  tripId: string;
  active: string;
}) {
  return (
    <nav
      className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto border-y border-border bg-background/75 px-4 py-2 backdrop-blur sm:mx-0 sm:rounded-full sm:border sm:bg-paper/70 sm:p-1.5"
      aria-label="Trip workspace navigation"
    >
      {workspaceNavItems.map((item) => {
        const href = `/trips/${tripId}/${item.segment}`;
        const isActive = active === item.segment;
        const Icon = icons[item.segment as keyof typeof icons];
        return (
          <Link
            key={item.segment}
            href={href}
            className={cn(
              "relative flex min-h-9 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted transition-all duration-200 ease-out hover:-translate-y-px hover:bg-[#EFE7D8]/70 hover:text-primary",
              isActive && "text-white hover:text-white",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {isActive ? (
              <motion.span
                {...tabIndicator}
                className="absolute inset-0 rounded-full bg-primary shadow-[0_10px_22px_rgba(49,88,70,0.16)]"
              />
            ) : null}
            <Icon className="relative z-10 h-4 w-4" />
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
