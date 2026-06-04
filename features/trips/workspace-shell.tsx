import Link from "next/link";
import { CalendarDays, Clock3, MapPin, ReceiptText, Ticket } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { TripWorkspaceNav } from "@/components/layout/trip-workspace-nav";
import { BudgetProgress } from "@/components/common/budget-progress";
import { BudgetStatusBadge } from "@/components/common/budget-status-badge";
import { MemberAvatarGroup } from "@/components/common/member-avatar-group";
import { Button } from "@/components/ui/button";
import type { Trip, TripWorkspaceData } from "@/types/trip";
import { calculateTripDuration } from "@/lib/calculations/budget";
import { formatCurrency, formatDateRange } from "@/lib/formatters";

function formatTripType(value: string) {
  return value
    .split("_")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");
}

export function WorkspaceShell({
  trip,
  active,
  workspace,
  children,
}: {
  trip: Trip;
  active: string;
  workspace?: TripWorkspaceData;
  children: React.ReactNode;
}) {
  const duration = calculateTripDuration(trip.start_date, trip.end_date);
  const estimated = workspace?.budgetItems.reduce(
    (sum, item) => sum + Number(item.estimated_amount),
    0,
  ) ?? 0;
  const actual = workspace?.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0) ?? 0;
  const progress = trip.target_budget ? Math.min(100, (actual / Number(trip.target_budget)) * 100) : 0;

  return (
    <AppShell>
      <div className="space-y-5">
        <section className="relative overflow-hidden rounded-[1.45rem] border border-border bg-surface px-5 py-4 shadow-[0_22px_60px_rgba(49,88,70,0.08)] sm:px-6">
          <svg
            viewBox="0 0 420 180"
            className="pointer-events-none absolute right-0 top-0 hidden h-full w-[34rem] text-primary opacity-[0.08] lg:block"
            aria-hidden="true"
          >
            <path d="M26 144 C94 78 160 168 230 92 C276 42 332 84 392 34" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeDasharray="16 18" />
            <path d="M210 176 L278 70 L336 176 Z" fill="currentColor" />
            <path d="M284 176 L350 46 L408 176 Z" fill="currentColor" opacity="0.75" />
            <circle cx="390" cy="34" r="13" fill="#C86B4A" />
          </svg>

          <div className="relative grid gap-4 lg:grid-cols-[1.15fr_0.85fr_auto] lg:items-center">
            <div className="min-w-0 space-y-3">
              <div className="space-y-1">
                <h1 className="truncate text-2xl font-semibold tracking-normal text-foreground sm:text-[1.8rem]">
                  {trip.name}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    {trip.destination}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    {formatDateRange(trip.start_date, trip.end_date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-primary" />
                    {duration} days
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-primary">
                  {formatTripType(trip.trip_type)}
                </span>
                {workspace ? (
                  <BudgetStatusBadge targetBudget={Number(trip.target_budget)} estimatedBudget={estimated} />
                ) : null}
              </div>
            </div>

            {workspace ? (
              <div className="rounded-2xl bg-paper/75 p-3.5 shadow-[inset_0_0_0_1px_#E5DED3]">
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted">Actual expenses</span>
                  <span className="font-semibold">{formatCurrency(actual, trip.currency)}</span>
                </div>
                <BudgetProgress value={progress} tone={progress > 85 ? "accent" : "primary"} />
                <div className="mt-2 flex items-center justify-between text-xs text-muted">
                  <span>Target {formatCurrency(trip.target_budget, trip.currency)}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>
            ) : null}

            {workspace ? (
              <div className="flex items-center gap-3 lg:justify-end">
                <MemberAvatarGroup members={workspace.members} />
                <div className="flex shrink-0 gap-2">
                  <Button asChild size="sm">
                    <Link href={`/trips/${trip.id}/expenses`}>
                      <ReceiptText className="h-4 w-4" />
                      Add Expense
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/trips/${trip.id}/members`}>
                      <Ticket className="h-4 w-4" />
                      Invite
                    </Link>
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <TripWorkspaceNav tripId={trip.id} active={active} />
        <div className="space-y-5 pt-1 sm:space-y-6">{children}</div>
      </div>
    </AppShell>
  );
}
