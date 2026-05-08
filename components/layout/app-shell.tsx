import { headers } from "next/headers";
import { logoutAction } from "@/features/auth/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "./sidebar-nav";
import { MobileNav } from "./mobile-nav";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const headerStore = await headers();
  const activePath = headerStore.get("x-pathname") ?? "";

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <SidebarNav activePath={activePath} />
        <main className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="lg:hidden">
                <p className="text-sm font-semibold">Iterra</p>
                <p className="text-xs text-muted">Plan, split, remember</p>
              </div>
              {!hasSupabaseEnv() ? (
                <p className="hidden text-xs text-muted sm:block">
                  Mode demo aktif. Hubungkan Supabase untuk data sungguhan.
                </p>
              ) : (
                <span />
              )}
              <form action={logoutAction}>
                <Button variant="outline" size="sm" type="submit">
                  Logout
                </Button>
              </form>
            </div>
          </header>
          <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 pb-24 lg:px-8 lg:pb-10">
            {children}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
