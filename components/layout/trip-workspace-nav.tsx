import Link from "next/link";
import { workspaceNavItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TripWorkspaceNav({
  tripId,
  active,
}: {
  tripId: string;
  active: string;
}) {
  return (
    <nav className="-mx-4 flex gap-2 overflow-x-auto border-b border-border px-4 pb-3" aria-label="Trip workspace">
      {workspaceNavItems.map((item) => {
        const Icon = item.icon;
        const href = `/trips/${tripId}/${item.segment}`;
        const isActive = active === item.segment;
        return (
          <Link
            key={item.segment}
            href={href}
            className={cn(
              "flex min-h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted hover:bg-soft hover:text-foreground",
              isActive && "bg-primary text-white hover:bg-primary hover:text-white",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
