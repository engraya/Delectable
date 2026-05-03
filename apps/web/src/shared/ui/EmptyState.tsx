export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div
      className="rounded-lg border border-dashed border-gray-300 dark:border-gray-600 p-8 text-center"
      role="status"
    >
      <p className="text-lg font-medium text-slate-800 dark:text-slate-100">
        {title}
      </p>
      {description ? (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
