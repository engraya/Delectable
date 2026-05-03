import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export function PageHeader({
  title,
  description,
  eyebrow,
  className,
  actions,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <header
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-2xl space-y-2 text-left">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="text-base text-fg-muted leading-relaxed">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}
