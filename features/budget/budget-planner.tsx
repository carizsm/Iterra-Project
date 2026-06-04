"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EmptyState } from "@/components/common/empty-state";
import { ListRow } from "@/components/common/list-row";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { BudgetItem } from "@/types/trip";

export function BudgetPlanner({
  items,
  currency,
}: {
  items: BudgetItem[];
  currency: string;
}) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category)))],
    [items],
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredItems =
    activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-5">
      {items.length > 0 ? (
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
          {categories.map((category) => {
            const active = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative min-h-9 shrink-0 rounded-full px-3 text-sm font-medium text-muted transition-all duration-200 ease-out hover:-translate-y-px hover:bg-soft hover:text-primary",
                  active && "text-white",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="budget-category-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : null}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <motion.div layout className="space-y-3.5">
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <ListRow
                  title={item.name}
                  description={item.category}
                  meta={item.notes}
                  aside={formatCurrency(item.estimated_amount, currency)}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState
              title="No budget items yet"
              description="Add your main cost estimates so the target budget is easier to read."
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
