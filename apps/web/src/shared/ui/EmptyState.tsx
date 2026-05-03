import type { ReactNode } from "react";
import { Card } from "@/shared/ui/Card";

export function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <Card className="p-10 text-center" role="status">
      {icon ? (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface-muted text-fg-muted">
          {icon}
        </div>
      ) : null}
      <p className="text-lg font-semibold text-fg">{title}</p>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
          {description}
        </p>
      ) : null}
    </Card>
  );
}
