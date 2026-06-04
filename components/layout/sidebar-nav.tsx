import Link from "next/link";
import { LogOut } from "lucide-react";
import { appNavItems } from "@/lib/constants";
import { Logo } from "@/components/common/logo";
import { logoutAction } from "@/features/auth/actions";
import { cn } from "@/lib/utils";

export function SidebarNav({ activePath = "" }: { activePath?: string }) {
  return (
    <aside className="group fixed left-0 top-0 z-40 hidden h-screen w-20 overflow-hidden border-r border-border bg-paper/95 px-3 py-5 backdrop-blur transition-[width,box-shadow] duration-300 hover:w-64 hover:shadow-[20px_0_60px_rgba(49,88,70,0.08)] lg:block">
      <div className="flex h-full flex-col">
        <div className="relative">
          <Logo className="mb-9 px-1" compact />
          <div className="pointer-events-none absolute left-[4.75rem] top-2 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <p className="font-semibold leading-tight text-foreground">Iterra</p>
            <p className="mt-1 text-xs text-muted">Travel workspace</p>
          </div>
        </div>
        <nav className="space-y-1" aria-label="Main navigation">
          {appNavItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/trips"
                ? activePath === "/trips" ||
                  (activePath.startsWith("/trips/") && !activePath.startsWith("/trips/new"))
                : activePath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted transition-all duration-200 hover:translate-x-0.5 hover:bg-soft/70 hover:text-foreground",
                  active && "bg-soft text-primary shadow-[inset_3px_0_0_#315846]",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-border pt-3">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-sm font-medium text-muted transition-all duration-200 hover:translate-x-0.5 hover:bg-soft/70 hover:text-foreground"
            >
              <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Log Out
              </span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
