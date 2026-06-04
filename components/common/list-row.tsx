import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ListRow({
  title,
  description,
  meta,
  aside,
  children,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl bg-paper/70 px-4 py-3.5 shadow-[inset_0_0_0_1px_#E5DED3] transition-all duration-200 ease-out hover:-translate-y-px hover:bg-surface hover:shadow-[inset_0_0_0_1px_rgba(49,88,70,0.2),0_12px_28px_rgba(49,88,70,0.08)]",
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="font-medium">{title}</p>
          {description ? <div className="text-sm text-muted">{description}</div> : null}
          {meta ? <div className="text-sm text-muted">{meta}</div> : null}
        </div>
        {aside ? <div className="shrink-0 text-sm font-semibold">{aside}</div> : null}
      </div>
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  );
}
