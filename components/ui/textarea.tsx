import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-28 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-[0_6px_18px_rgba(49,88,70,0.035)] transition-all duration-200 placeholder:text-muted focus:border-primary/45 focus:shadow-[0_0_0_4px_rgba(49,88,70,0.08)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
