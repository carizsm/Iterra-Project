"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BudgetProgress } from "@/components/common/budget-progress";
import { DateRangeDisplay } from "@/components/common/date-range-display";
import { formatCurrency } from "@/lib/formatters";
import { MotionCard } from "@/components/common/motion";
import type { Trip } from "@/types/trip";

function getTripStatus(startDate: string, endDate: string) {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (today < start) return { label: "Planning", variant: "secondary" as const };
  if (today > end) return { label: "Completed", variant: "success" as const };
  return { label: "Ongoing", variant: "accent" as const };
}

export function TripCard({
  trip,
  plannedBudget = 0,
  actualExpenses = 0,
  memberCount,
}: {
  trip: Trip;
  plannedBudget?: number;
  actualExpenses?: number;
  memberCount?: number;
}) {
  const status = getTripStatus(trip.start_date, trip.end_date);
  const basis = plannedBudget || Number(trip.target_budget) || 1;
  const progress = Math.min(100, (actualExpenses / basis) * 100);

  return (
    <MotionCard className="group overflow-hidden">
      <Card className="border-0 bg-transparent p-4 shadow-none sm:p-5">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <Link href={`/trips/${trip.id}/overview`} className="min-w-0 space-y-1">
              <h2 className="truncate text-base font-semibold transition-colors group-hover:text-primary">
                {trip.name}
              </h2>
              <p className="line-clamp-1 text-sm text-muted">{trip.destination}</p>
            </Link>
            <button
              type="button"
              aria-label="Aksi trip"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted opacity-80 transition-all hover:bg-soft hover:text-foreground group-hover:opacity-100"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <DateRangeDisplay startDate={trip.start_date} endDate={trip.end_date} />
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted">Budget progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <BudgetProgress value={progress} tone={progress > 85 ? "accent" : "primary"} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant={status.variant}>{status.label}</Badge>
              {memberCount ? <span className="text-xs text-muted">{memberCount} member</span> : null}
            </div>
            <span className="font-medium">{formatCurrency(trip.target_budget, trip.currency)}</span>
          </div>
        </div>
      </Card>
    </MotionCard>
  );
}
