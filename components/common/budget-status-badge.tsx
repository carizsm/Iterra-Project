import { Badge } from "@/components/ui/badge";
import { calculateBudgetStatus, getBudgetStatusLabel } from "@/lib/calculations/budget";
import { SoftReveal } from "@/components/common/motion";

export function BudgetStatusBadge({
  targetBudget,
  estimatedBudget,
}: {
  targetBudget: number;
  estimatedBudget: number;
}) {
  const status = calculateBudgetStatus(targetBudget, estimatedBudget);
  const variant = status === "over" ? "danger" : status === "warning" ? "warning" : "success";
  return (
    <SoftReveal className="inline-flex">
      <Badge variant={variant}>{getBudgetStatusLabel(status)}</Badge>
    </SoftReveal>
  );
}
