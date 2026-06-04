import { WorkspaceShell } from "@/features/trips/workspace-shell";
import { BudgetForm } from "@/features/budget/budget-form";
import { BudgetStatusBadge } from "@/components/common/budget-status-badge";
import { ActionDialog } from "@/components/common/action-dialog";
import { Progress } from "@/components/ui/progress";
import { SectionPanel } from "@/components/common/section-panel";
import { BudgetPlanner } from "@/features/budget/budget-planner";
import { formatCurrency } from "@/lib/formatters";
import { getTripWorkspace, requireUser } from "@/features/trips/data";

export default async function BudgetPage({ params }: { params: Promise<{ tripId: string }> }) {
  await requireUser();
  const { tripId } = await params;
  const data = await getTripWorkspace(tripId);
  const estimated = data.budgetItems.reduce((sum, item) => sum + Number(item.estimated_amount), 0);
  const diff = data.trip.target_budget - estimated;
  const progress = data.trip.target_budget ? Math.min(100, (estimated / data.trip.target_budget) * 100) : 0;

  return (
    <WorkspaceShell trip={data.trip} active="budget" workspace={data}>
      <SectionPanel
        title="Budget Health"
        description="A compact view of target, estimates, and remaining budget."
        action={
          <ActionDialog
            title="Add Budget Item"
            description="Add a planned cost estimate to this trip."
            triggerLabel="Add Item"
          >
            <BudgetForm tripId={tripId} />
          </ActionDialog>
        }
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <BudgetStatusBadge targetBudget={data.trip.target_budget} estimatedBudget={estimated} />
              <p className="text-sm text-muted">{Math.round(progress)}%</p>
            </div>
            <Progress value={progress} />
          </div>
          <div className="grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1">
            <p><span className="text-muted">Planned:</span> <span className="font-medium">{formatCurrency(estimated, data.trip.currency)}</span></p>
            <p><span className="text-muted">Target:</span> <span className="font-medium">{formatCurrency(data.trip.target_budget, data.trip.currency)}</span></p>
            <p><span className="text-muted">Remaining:</span> <span className="font-medium">{formatCurrency(diff, data.trip.currency)}</span></p>
          </div>
        </div>
      </SectionPanel>
      <SectionPanel title="Planned Budget" description="Filter and review the main cost estimates.">
        <BudgetPlanner items={data.budgetItems} currency={data.trip.currency} />
      </SectionPanel>
    </WorkspaceShell>
  );
}
