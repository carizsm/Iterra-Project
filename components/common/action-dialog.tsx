"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActionDialog({
  title,
  description,
  triggerLabel,
  children,
}: {
  title: string;
  description?: string;
  triggerLabel: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" size="sm" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        {triggerLabel}
      </Button>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-end bg-[#1F2933]/35 px-3 pb-3 pt-16 backdrop-blur-sm sm:place-items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="workspace-action-dialog-title"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[min(82vh,720px)] w-full max-w-2xl overflow-hidden rounded-[1.35rem] bg-surface shadow-[0_30px_90px_rgba(31,41,51,0.22)]"
            >
              <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                <div className="space-y-1">
                  <h2 id="workspace-action-dialog-title" className="text-lg font-semibold">
                    {title}
                  </h2>
                  {description ? <p className="text-sm text-muted">{description}</p> : null}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-muted transition-colors hover:bg-soft hover:text-foreground"
                  aria-label="Close dialog"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>
              <div className="max-h-[calc(min(82vh,720px)-76px)] overflow-y-auto p-5">
                {children}
              </div>
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
