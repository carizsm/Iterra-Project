import Link from "next/link";
import { CalendarClock, HandCoins, ReceiptText, Users } from "lucide-react";
import { WorkspaceShell } from "@/features/trips/workspace-shell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MemberAvatarGroup } from "@/components/common/member-avatar-group";
import { BudgetStatusBadge } from "@/components/common/budget-status-badge";
import { SectionPanel } from "@/components/common/section-panel";
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
    <WorkspaceShell trip={data.trip} active="overview" workspace={data}>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Target", value: formatCurrency(data.trip.target_budget, data.trip.currency) },
          { label: "Planned", value: formatCurrency(estimated, data.trip.currency) },
          { label: "Actual", value: formatCurrency(actual, data.trip.currency) },
          { label: "Members", value: String(data.members.length) },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-full bg-paper/75 px-4 py-3 shadow-[inset_0_0_0_1px_#E5DED3]"
          >
            <p className="text-xs uppercase tracking-wide text-muted">{metric.label}</p>
            <p className="mt-1 text-sm font-semibold">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <SectionPanel title="Budget Health" description="Planned budget and real spending at a glance.">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <BudgetStatusBadge targetBudget={data.trip.target_budget} estimatedBudget={estimated} />
              <p className="text-sm font-medium">
                Difference {formatCurrency(difference, data.trip.currency)}
              </p>
            </div>
            <Progress value={progress} />
            <p className="text-sm text-muted">
              {formatCurrency(actual, data.trip.currency)} of target {formatCurrency(data.trip.target_budget, data.trip.currency)}
            </p>
          </div>
        </SectionPanel>
        <SectionPanel title="Next Up">
          {nextItem ? (
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-soft p-2 text-primary">
                  <CalendarClock className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium">{nextItem.title}</p>
                  <p className="text-sm text-muted">
                    {formatDate(nextItem.item_date)} {formatShortTime(nextItem.start_time)}
                  </p>
                  <p className="text-sm text-muted">{nextItem.location}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">No itinerary yet.</p>
          )}
        </SectionPanel>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionPanel title="Members">
          <MemberAvatarGroup members={data.members} />
        </SectionPanel>
        <SectionPanel title="Quick Actions" description="Jump to the most common workspace updates.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button asChild variant="outline" size="sm">
              <Link href={`/trips/${tripId}/itinerary`}>
                <CalendarClock className="h-4 w-4" />
                Itinerary
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/trips/${tripId}/budget`}>
                <HandCoins className="h-4 w-4" />
                Budget
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/trips/${tripId}/expenses`}>
                <ReceiptText className="h-4 w-4" />
                Expenses
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/trips/${tripId}/members`}>
                <Users className="h-4 w-4" />
                Invite
              </Link>
            </Button>
          </div>
        </SectionPanel>
      </section>
    </WorkspaceShell>
  );
}
