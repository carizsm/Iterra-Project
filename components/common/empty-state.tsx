import type { LucideIcon } from "lucide-react";
import { SoftReveal } from "@/components/common/motion";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <SoftReveal className={cn("flex flex-col items-start gap-3 rounded-lg border border-dashed border-border bg-soft/45 p-6", className)}>
      {Icon ? <Icon className="h-5 w-5 text-primary/80" aria-hidden="true" /> : null}
      <div className="space-y-1">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-sm text-muted">{description}</p>
      </div>
      {action}
    </SoftReveal>
  );
}
