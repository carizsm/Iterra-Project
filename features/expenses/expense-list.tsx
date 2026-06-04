"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EmptyState } from "@/components/common/empty-state";
import { ExpenseCategoryBadge } from "@/components/common/expense-category-badge";
import { ListRow } from "@/components/common/list-row";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Expense, TripMember } from "@/types/trip";

type SortMode = "newest" | "highest" | "category";

export function ExpenseList({
  expenses,
  members,
  currency,
}: {
  expenses: Expense[];
  members: TripMember[];
  currency: string;
}) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(expenses.map((expense) => expense.category)))],
    [expenses],
  );
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortMode>("newest");

  const visibleExpenses = expenses
    .filter((expense) => category === "All" || expense.category === category)
    .sort((a, b) => {
      if (sort === "highest") return Number(b.amount) - Number(a.amount);
      if (sort === "category") return a.category.localeCompare(b.category);
      return new Date(b.expense_date).getTime() - new Date(a.expense_date).getTime();
    });

  return (
    <div className="space-y-5">
      {expenses.length > 0 ? (
        <div className="space-y-3.5">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={cn(
                  "min-h-9 shrink-0 rounded-full px-3 text-sm font-medium text-muted transition-all duration-200 ease-out hover:-translate-y-px hover:bg-soft hover:text-primary",
                  item === category && "bg-primary text-white hover:bg-primary hover:text-white",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortMode)}
            className="min-h-10 w-full rounded-md border border-border bg-surface px-3 text-sm transition-colors duration-200 hover:border-primary/35 hover:bg-soft/40 sm:w-56"
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest amount</option>
            <option value="category">Category</option>
          </select>
        </div>
      ) : null}

      <motion.div layout className="space-y-3.5">
        <AnimatePresence mode="popLayout">
          {visibleExpenses.length > 0 ? (
            visibleExpenses.map((expense) => {
              const payer = members.find((member) => member.user_id === expense.paid_by);
              return (
                <motion.div
                  key={expense.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListRow
                    title={expense.name}
                    description={`${formatDate(expense.expense_date)} - Paid by ${
                      payer?.profiles?.full_name ?? "Member"
                    }`}
                    aside={formatCurrency(expense.amount, currency)}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <ExpenseCategoryBadge category={expense.category} />
                      <span className="rounded-full bg-soft px-2 py-1 text-xs text-muted">
                        {expense.split_method === "equal" ? "Equal split" : "Custom"}
                      </span>
                    </div>
                  </ListRow>
                </motion.div>
              );
            })
          ) : (
            <EmptyState
              title="No expenses yet"
              description="Add the first expense so the shared-cost summary can take shape."
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
