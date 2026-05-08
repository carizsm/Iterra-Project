import type { BudgetItem, Expense, ItineraryItem } from "@/types/trip";

export function groupItineraryByDate(items: ItineraryItem[]) {
  return items.reduce<Record<string, ItineraryItem[]>>((acc, item) => {
    acc[item.item_date] = acc[item.item_date] ?? [];
    acc[item.item_date].push(item);
    acc[item.item_date].sort((a, b) => (a.start_time ?? "").localeCompare(b.start_time ?? ""));
    return acc;
  }, {});
}

export function groupExpensesByCategory(expenses: Expense[]) {
  return expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] ?? 0) + Number(expense.amount);
    return acc;
  }, {});
}

export function groupBudgetByCategory(items: BudgetItem[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + Number(item.estimated_amount);
    return acc;
  }, {});
}
