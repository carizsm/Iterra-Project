import { Badge } from "@/components/ui/badge";
import { calculateBudgetStatus, getBudgetStatusLabel } from "@/lib/calculations/budget";

export function BudgetStatusBadge({
  targetBudget,
  estimatedBudget,
}: {
  targetBudget: number;
  estimatedBudget: number;
}) {
  const status = calculateBudgetStatus(targetBudget, estimatedBudget);
  const variant = status === "over" ? "danger" : status === "warning" ? "warning" : "success";
  return <Badge variant={variant}>{getBudgetStatusLabel(status)}</Badge>;
}
