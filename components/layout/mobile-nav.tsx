import Link from "next/link";
import { appNavItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileNav({ activePath = "" }: { activePath?: string }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-border bg-paper/95 px-2 pb-[calc(0.55rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden"
      aria-label="Mobile navigation"
    >
      {appNavItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/trips"
            ? activePath === "/trips" ||
              (activePath.startsWith("/trips/") && !activePath.startsWith("/trips/new"))
            : activePath === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-medium text-muted transition-colors hover:bg-soft/80 hover:text-foreground",
              isActive && "bg-soft text-primary",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.mobileLabel}
          </Link>
        );
      })}
    </nav>
  );
}
