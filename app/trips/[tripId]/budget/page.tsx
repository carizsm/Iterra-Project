import { CircleDollarSign } from "lucide-react";
import { WorkspaceShell } from "@/features/trips/workspace-shell";
import { BudgetForm } from "@/features/budget/budget-form";
import { BudgetStatusBadge } from "@/components/common/budget-status-badge";
import { StatCard } from "@/components/common/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
    <WorkspaceShell trip={data.trip} active="budget">
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Estimated" value={formatCurrency(estimated, data.trip.currency)} icon={CircleDollarSign} />
        <StatCard label="Target Budget" value={formatCurrency(data.trip.target_budget, data.trip.currency)} icon={CircleDollarSign} />
        <StatCard label="Selisih Target" value={formatCurrency(diff, data.trip.currency)} icon={CircleDollarSign} />
      </section>
      <Card>
        <CardContent className="space-y-3 pt-5">
          <div className="flex items-center justify-between gap-3">
            <BudgetStatusBadge targetBudget={data.trip.target_budget} estimatedBudget={estimated} />
            <p className="text-sm text-muted">{Math.round(progress)}%</p>
          </div>
          <Progress value={progress} />
        </CardContent>
      </Card>
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Budget Planner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.budgetItems.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4 rounded-md border border-border p-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted">{item.category}</p>
                  {item.notes ? <p className="text-sm text-muted">{item.notes}</p> : null}
                </div>
                <p className="shrink-0 text-sm font-semibold">{formatCurrency(item.estimated_amount, data.trip.currency)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tambah Budget Item</CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetForm tripId={tripId} />
          </CardContent>
        </Card>
      </section>
    </WorkspaceShell>
  );
}
