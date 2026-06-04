import { headers } from "next/headers";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { Logo } from "@/components/common/logo";
import { SidebarNav } from "./sidebar-nav";
import { MobileNav } from "./mobile-nav";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const headerStore = await headers();
  const activePath = headerStore.get("x-pathname") ?? "";

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen lg:pl-20">
        <SidebarNav activePath={activePath} />
        <main className="flex min-w-0 flex-1 flex-col lg:h-screen lg:overflow-y-auto">
          <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:px-8">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
              <div className="lg:hidden">
                <Logo compact />
              </div>
              {!hasSupabaseEnv() ? (
                <p className="hidden text-xs text-muted sm:block">
                  Demo mode is active. Connect Supabase for live data.
                </p>
              ) : (
                <span />
              )}
              <span className="hidden lg:block" />
            </div>
          </header>
          <div className="mx-auto w-full max-w-6xl flex-1 px-4 pb-[calc(7.5rem+env(safe-area-inset-bottom))] pt-5 sm:pb-[calc(7.5rem+env(safe-area-inset-bottom))] sm:pt-7 lg:px-8 lg:pb-10">
            {children}
          </div>
        </main>
      </div>
      <MobileNav activePath={activePath} />
    </div>
  );
}
