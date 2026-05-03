import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-surface-muted motion-reduce:animate-none",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/35 to-transparent dark:via-white/10 motion-reduce:animate-none"
        aria-hidden
      />
    </div>
  );
}
