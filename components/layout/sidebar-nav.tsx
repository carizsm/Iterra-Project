import Link from "next/link";
import { appNavItems, APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SidebarNav({ activePath = "" }: { activePath?: string }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-surface px-4 py-5 lg:block">
      <Link href="/dashboard" className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-semibold text-white">
          I
        </div>
        <div>
          <p className="font-semibold">{APP_NAME}</p>
          <p className="text-xs text-muted">Trip workspace</p>
        </div>
      </Link>
      <nav className="space-y-1" aria-label="Navigasi utama">
        {appNavItems.map((item) => {
          const Icon = item.icon;
          const active = activePath.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted hover:bg-soft hover:text-foreground",
                active && "bg-soft text-foreground",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
