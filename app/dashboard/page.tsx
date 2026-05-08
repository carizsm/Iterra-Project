import { CalendarDays, CircleDollarSign, PlusCircle } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { TripCard } from "@/components/common/trip-card";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { getTripsForCurrentUser, requireUser } from "@/features/trips/data";
import { formatCurrency } from "@/lib/formatters";

export default async function DashboardPage() {
  await requireUser();
  const trips = await getTripsForCurrentUser();
  const totalBudget = trips.reduce((sum, trip) => sum + Number(trip.target_budget), 0);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Ringkasan trip, budget, dan perjalanan aktifmu."
          actions={
            <Button asChild>
              <Link href="/trips/new">
                <PlusCircle className="h-4 w-4" /> Buat Trip Baru
              </Link>
            </Button>
          }
        />
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Trip" value={String(trips.length)} icon={CalendarDays} />
          <StatCard label="Trip Aktif" value={String(trips.length)} icon={CalendarDays} />
          <StatCard label="Total Estimasi" value={formatCurrency(totalBudget, "IDR")} icon={CircleDollarSign} />
          <StatCard label="Actual Expenses" value={formatCurrency(1320000, "IDR")} icon={CircleDollarSign} />
        </section>
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Trip Terbaru</h2>
          {trips.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={CalendarDays}
              title="Belum ada trip"
              description="Buat trip pertama untuk mulai menyusun itinerary dan budget bersama."
              action={
                <Button asChild>
                  <Link href="/trips/new">Buat Trip Baru</Link>
                </Button>
              }
            />
          )}
        </section>
      </div>
    </AppShell>
  );
}
