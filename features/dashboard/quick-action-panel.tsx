import Link from "next/link";
import { PlusCircle, ReceiptText, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickActionPanel({ firstTripId }: { firstTripId?: string }) {
  const actions = [
    { label: "Create New Trip", href: "/trips/new", icon: PlusCircle },
    { label: "Join Trip", href: "/trips/join", icon: Ticket },
    { label: "Add Expense", href: `/trips/${firstTripId ?? "demo-trip"}/expenses`, icon: ReceiptText },
  ];

  return (
    <div className="rounded-[1.25rem] bg-paper/85 p-4 shadow-[0_18px_50px_rgba(49,88,70,0.07)]">
      <p className="px-1 text-sm font-medium text-muted">Quick Actions</p>
      <div className="mt-3 grid gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button key={action.href} asChild variant="outline" className="justify-start bg-surface/80">
              <Link href={action.href}>
                <Icon className="h-4 w-4 text-primary" />
                {action.label}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
