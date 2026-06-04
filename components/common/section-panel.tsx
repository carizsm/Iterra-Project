import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionPanel({
  title,
  description,
  action,
  children,
  className,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-[1.2rem] bg-surface/90 shadow-[inset_0_0_0_1px_#E5DED3,0_12px_34px_rgba(49,88,70,0.045)]",
        className,
      )}
    >
      {(title || description || action) ? (
        <div className="flex flex-col gap-3 border-b border-border/80 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
          <div className="space-y-1">
            {title ? <h2 className="text-base font-semibold">{title}</h2> : null}
            {description ? <p className="text-sm text-muted">{description}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}
