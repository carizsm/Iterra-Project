import Link from "next/link";
import { ArrowRight, BarChart3, CalendarDays, CircleDollarSign, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TAGLINE, TAGLINE_ID } from "@/lib/constants";

export default function Home() {
  const workspacePreview: { label: string; value: string; icon: LucideIcon }[] = [
    { label: "Budget target", value: "Rp4.500.000", icon: CircleDollarSign },
    { label: "Itinerary", value: "2 agenda tersusun", icon: CalendarDays },
    { label: "Review", value: "Siap dirangkum setelah trip", icon: BarChart3 },
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="space-y-7">
          <div className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted">
            Collaborative trip workspace
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Iterra
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted">{TAGLINE}</p>
            <p className="max-w-xl text-base leading-7 text-muted">{TAGLINE_ID}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Masuk ke Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">Buat Akun</Link>
            </Button>
          </div>
        </div>
        <Card className="p-5">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-muted">Workspace aktif</p>
              <h2 className="mt-1 text-xl font-semibold">Rinjani Long Weekend</h2>
            </div>
            <div className="grid gap-3">
              {workspacePreview.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3"
                >
                  <div>
                    <p className="text-sm text-muted">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
