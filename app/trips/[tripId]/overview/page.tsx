import Link from "next/link";
import { CalendarDays, CircleDollarSign, PlusCircle, Users } from "lucide-react";
import { WorkspaceShell } from "@/features/trips/workspace-shell";
import { StatCard } from "@/components/common/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MemberAvatarGroup } from "@/components/common/member-avatar-group";
import { BudgetStatusBadge } from "@/components/common/budget-status-badge";
import { getTripWorkspace, requireUser } from "@/features/trips/data";
import { formatCurrency, formatDate, formatShortTime } from "@/lib/formatters";

export default async function OverviewPage({ params }: { params: Promise<{ tripId: string }> }) {
  await requireUser();
  const { tripId } = await params;
  const data = await getTripWorkspace(tripId);
  const estimated = data.budgetItems.reduce((sum, item) => sum + Number(item.estimated_amount), 0);
  const actual = data.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const difference = data.trip.target_budget - actual;
  const progress = data.trip.target_budget ? Math.min(100, (actual / data.trip.target_budget) * 100) : 0;
  const nextItem = data.itinerary[0];

  return (
    <WorkspaceShell trip={data.trip} active="overview">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Target Budget" value={formatCurrency(data.trip.target_budget, data.trip.currency)} icon={CircleDollarSign} />
        <StatCard label="Estimated Budget" value={formatCurrency(estimated, data.trip.currency)} icon={CircleDollarSign} />
        <StatCard label="Actual Expenses" value={formatCurrency(actual, data.trip.currency)} icon={CircleDollarSign} />
        <StatCard label="Members" value={String(data.members.length)} icon={Users} />
      </section>
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Budget Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <BudgetStatusBadge targetBudget={data.trip.target_budget} estimatedBudget={estimated} />
              <p className="text-sm font-medium">
                Selisih {formatCurrency(difference, data.trip.currency)}
              </p>
            </div>
            <Progress value={progress} />
            <p className="text-sm text-muted">
              {formatCurrency(actual, data.trip.currency)} dari target {formatCurrency(data.trip.target_budget, data.trip.currency)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Next Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            {nextItem ? (
              <div className="space-y-2">
                <p className="font-medium">{nextItem.title}</p>
                <p className="text-sm text-muted">
                  {formatDate(nextItem.item_date)} {formatShortTime(nextItem.start_time)}
                </p>
                <p className="text-sm text-muted">{nextItem.location}</p>
              </div>
            ) : (
              <p className="text-sm text-muted">Belum ada itinerary.</p>
            )}
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Anggota</CardTitle>
          </CardHeader>
          <CardContent>
            <MemberAvatarGroup members={data.members} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button asChild variant="outline"><Link href={`/trips/${tripId}/itinerary`}><CalendarDays className="h-4 w-4" /> Add itinerary</Link></Button>
            <Button asChild variant="outline"><Link href={`/trips/${tripId}/budget`}><PlusCircle className="h-4 w-4" /> Add budget</Link></Button>
            <Button asChild variant="outline"><Link href={`/trips/${tripId}/expenses`}><CircleDollarSign className="h-4 w-4" /> Add expense</Link></Button>
            <Button asChild variant="outline"><Link href={`/trips/${tripId}/members`}><Users className="h-4 w-4" /> Invite</Link></Button>
          </CardContent>
        </Card>
      </section>
    </WorkspaceShell>
  );
}
