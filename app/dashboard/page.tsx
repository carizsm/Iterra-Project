import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { TripCard } from "@/components/common/trip-card";
import { EmptyState } from "@/components/common/empty-state";
import { MetricPill } from "@/components/common/metric-pill";
import { MotionItem, MotionList } from "@/components/common/motion";
import { Button } from "@/components/ui/button";
import { DashboardHero } from "@/features/dashboard/dashboard-hero";
import { QuickActionPanel } from "@/features/dashboard/quick-action-panel";
import { FeaturedTripCard } from "@/features/trips/featured-trip-card";
import { getDashboardSummary, requireUser } from "@/features/trips/data";
import { formatCurrency } from "@/lib/formatters";

export default async function DashboardPage() {
  await requireUser();
  const { trips, tripCards, actualExpenses } = await getDashboardSummary();
  const totalBudget = trips.reduce((sum, trip) => sum + Number(trip.target_budget), 0);
  const upcomingTripCard = [...tripCards]
    .filter((item) => new Date(item.trip.start_date) >= new Date())
    .sort(
      (a, b) => new Date(a.trip.start_date).getTime() - new Date(b.trip.start_date).getTime(),
    )[0] ?? tripCards[0];

  return (
    <AppShell>
      <div className="space-y-8">
        <DashboardHero />

        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <FeaturedTripCard item={upcomingTripCard} />
          <div className="space-y-4">
            <QuickActionPanel firstTripId={trips[0]?.id} />
            <div className="flex flex-wrap gap-2">
              <MetricPill label="Active Trips" value={String(trips.length)} />
              <MetricPill label="Planned" value={formatCurrency(totalBudget, "IDR")} />
              <MetricPill label="Actual" value={formatCurrency(actualExpenses, "IDR")} />
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-semibold">Recent Trips</h2>
              <p className="text-sm text-muted">
                Open a workspace to review itinerary, budget, and shared costs.
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/trips">View All</Link>
            </Button>
          </div>
          {trips.length > 0 ? (
            <MotionList className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {tripCards.map((item) => (
                <MotionItem key={item.trip.id}>
                  <TripCard
                    trip={item.trip}
                    plannedBudget={item.plannedBudget}
                    actualExpenses={item.actualExpenses}
                    memberCount={item.memberCount}
                  />
                </MotionItem>
              ))}
            </MotionList>
          ) : (
            <EmptyState
              title="No trips yet"
              description="Create your first trip to start planning itinerary and budget together."
              action={
                <Button asChild>
                  <Link href="/trips/new">Create New Trip</Link>
                </Button>
              }
            />
          )}
        </section>
      </div>
    </AppShell>
  );
}
