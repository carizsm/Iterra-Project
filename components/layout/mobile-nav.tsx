import Link from "next/link";
import { appNavItems } from "@/lib/constants";

export function MobileNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-border bg-surface/95 px-2 py-2 backdrop-blur lg:hidden"
      aria-label="Navigasi mobile"
    >
      {appNavItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-medium text-muted hover:bg-soft hover:text-foreground"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label === "Create Trip" ? "Buat" : item.label}
          </Link>
        );
      })}
    </nav>
  );
}
