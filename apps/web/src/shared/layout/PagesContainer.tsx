import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export function PagesContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
