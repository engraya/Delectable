import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";

export function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 sm:px-6">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          This page doesn’t exist
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-fg-muted">
          The link may be outdated, or the recipe moved. Head home and search again—we’ll
          keep the UI out of your way.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-fg shadow-sm transition hover:bg-primary-hover active:bg-primary-active"
        >
          <HiHome className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
      </div>
    </main>
  );
}
