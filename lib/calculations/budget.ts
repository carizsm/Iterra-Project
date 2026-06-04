export type BudgetStatus = "safe" | "warning" | "over";

export function calculateBudgetStatus(targetBudget = 0, estimatedBudget = 0): BudgetStatus {
  if (!targetBudget || targetBudget <= 0) return "safe";
  const ratio = estimatedBudget / targetBudget;
  if (ratio > 1) return "over";
  if (ratio >= 0.85) return "warning";
  return "safe";
}

export function getBudgetStatusLabel(status: BudgetStatus) {
  if (status === "over") return "Over Budget";
  if (status === "warning") return "Near Limit";
  return "Budget on Track";
}

export function calculateTripDuration(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  if (Number.isNaN(diff)) return 0;
  return Math.max(1, Math.floor(diff / 86_400_000) + 1);
}
