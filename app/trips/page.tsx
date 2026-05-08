import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/common/page-header";
import { TripCard } from "@/components/common/trip-card";
import { Button } from "@/components/ui/button";
import { getTripsForCurrentUser, requireUser } from "@/features/trips/data";

export default async function TripsPage() {
  await requireUser();
  const trips = await getTripsForCurrentUser();
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Trips"
          description="Semua workspace perjalanan yang kamu ikuti."
          actions={
            <>
              <Button asChild variant="outline">
                <Link href="/trips/join">Gabung Trip</Link>
              </Button>
              <Button asChild>
                <Link href="/trips/new">
                  <PlusCircle className="h-4 w-4" /> Buat Trip
                </Link>
              </Button>
            </>
          }
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
