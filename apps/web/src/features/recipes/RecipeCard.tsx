import { Link } from "react-router-dom";
import type { RecipeSummary } from "@/shared/api/types";

export function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="group block rounded-xl overflow-hidden shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
    >
      <article className="flex flex-col h-full bg-white dark:bg-gray-900/40">
        <div className="relative shadow-2xl rounded-xl overflow-hidden">
          {recipe.image ? (
            <img
              className="w-full h-48 object-cover transition group-hover:opacity-95"
              src={recipe.image}
              alt=""
            />
          ) : (
            <div className="w-full h-48 bg-slate-200 dark:bg-slate-700" aria-hidden />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gray-900/25 transition group-hover:bg-gray-900/10" />
        </div>
        <div className="px-6 py-4 mb-auto">
          <h2 className="font-medium text-lg text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 transition">
            {recipe.title}
          </h2>
        </div>
      </article>
    </Link>
  );
}
