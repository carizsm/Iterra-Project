"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatShortTime } from "@/lib/formatters";
import type { ItineraryItem } from "@/types/trip";

export function TimelineItem({ item, currency }: { item: ItineraryItem; currency: string }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(item.status);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative pl-7"
    >
      <span className="absolute left-0 top-4 h-3 w-3 rounded-full border-2 border-surface bg-primary shadow-[0_0_0_4px_#EFE7D8] transition-all duration-200 ease-out group-hover:bg-accent group-hover:shadow-[0_0_0_5px_#EFE7D8]" />
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="w-full rounded-xl bg-surface/85 px-4 py-3.5 text-left shadow-[inset_0_0_0_1px_#E5DED3] transition-all duration-200 ease-out hover:-translate-y-px hover:bg-white hover:shadow-[inset_0_0_0_1px_rgba(49,88,70,0.18),0_12px_28px_rgba(49,88,70,0.08)]"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {formatShortTime(item.start_time)}
              {item.end_time ? ` - ${formatShortTime(item.end_time)}` : ""}
            </p>
            <p className="font-medium">{item.title}</p>
            {item.location ? <p className="text-sm text-muted">{item.location}</p> : null}
          </div>
          <Badge variant={status === "done" ? "success" : status === "skipped" ? "warning" : "secondary"}>
            {status}
          </Badge>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="ml-0 mt-2 rounded-md bg-soft/55 p-4">
              {item.notes ? <p className="text-sm text-muted">{item.notes}</p> : null}
              {Number(item.estimated_cost) > 0 ? (
                <p className="mt-2 text-sm font-medium">
                  Estimated {formatCurrency(item.estimated_cost, currency)}
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button type="button" size="sm" variant="outline" onClick={() => setStatus("done")}>
                  Done
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={() => setStatus("skipped")}>
                  Skip
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
