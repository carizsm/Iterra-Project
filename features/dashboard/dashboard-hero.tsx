import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DestinationRotator } from "@/components/common/destination-rotator";
import { TravelHeroVisual } from "@/components/common/travel-hero-visual";

export function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-[#FBF8F1] p-5 shadow-[0_24px_70px_rgba(49,88,70,0.08)] sm:p-7 lg:grid lg:grid-cols-[1fr_0.85fr] lg:gap-8">
      <div className="flex flex-col justify-between gap-8">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted">Workspace for</span>
            <DestinationRotator />
          </div>
          <div className="space-y-3">
            <h1 className="max-w-xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              Plan your journey with more calm.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-muted sm:text-base">
              Organize itinerary, budget, expenses, and shared costs in one lightweight
              workspace for every trip member.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/trips/new">Create New Trip</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/trips/join">Join Trip</Link>
          </Button>
        </div>
      </div>
      <TravelHeroVisual className="mt-8 lg:mt-0" />
    </section>
  );
}
