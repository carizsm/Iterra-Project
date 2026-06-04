import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/logo";
import { TAGLINE, TAGLINE_ID } from "@/lib/constants";

export default function Home() {
  const workspacePreview = [
    { label: "Destination", value: "Lombok, West Nusa Tenggara" },
    { label: "Budget target", value: "Rp4.500.000" },
    { label: "Shared Cost", value: "3 members, equal split" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl content-center gap-10 px-4 py-8 sm:py-12 md:grid-cols-[0.9fr_1fr] lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:min-h-[560px]">
          <div className="space-y-5">
            <Logo href="/" />
            <div className="space-y-4">
              <h1 className="max-w-lg text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
                A calm workspace for shared journeys.
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted">{TAGLINE}</p>
              <p className="max-w-xl text-sm leading-7 text-muted">{TAGLINE_ID}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard">Buka Workspace</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-md border border-border bg-surface p-4 sm:p-6">
          <div className="space-y-7">
            <div className="flex items-start justify-between gap-6 border-b border-border pb-5">
              <div>
                <p className="text-sm text-muted">Workspace trip</p>
                <h2 className="mt-1 text-2xl font-semibold">Rinjani Long Weekend</h2>
              </div>
              <p className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-primary">Hiking</p>
            </div>

            <div className="grid gap-4">
              {workspacePreview.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-[8rem_1fr] gap-3 text-sm">
                  <p className="text-muted">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 border-t border-border pt-5 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Planned</p>
                <p className="mt-1 font-semibold">Rp3.650.000</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Actual</p>
                <p className="mt-1 font-semibold">Rp1.320.000</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Agenda</p>
                <p className="mt-1 font-semibold">2 item</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
