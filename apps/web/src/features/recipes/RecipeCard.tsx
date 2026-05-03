import { Link } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import type { RecipeSummary } from "@/shared/api/types";

export function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
          {recipe.image ? (
            <img
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              src={recipe.image}
              alt=""
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-xs text-fg-subtle"
              aria-hidden
            >
              No image
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fg/25 via-transparent to-transparent opacity-60 transition group-hover:opacity-80" />
          <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-canvas/90 text-fg opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100">
            <HiArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1 p-4">
          <h2 className="text-base font-semibold leading-snug text-fg transition group-hover:text-primary">
            {recipe.title}
          </h2>
          <p className="text-2xs font-medium uppercase tracking-wider text-fg-subtle">
            View recipe
          </p>
        </div>
      </article>
    </Link>
  );
}
