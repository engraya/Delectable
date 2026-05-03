import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface-elevated shadow-card",
        className
      )}
      {...props}
    />
  );
}
