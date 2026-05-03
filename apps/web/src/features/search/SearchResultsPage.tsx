import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RecipeCard } from "@/features/recipes/RecipeCard";
import { searchRecipes, searchRecipesComplex } from "@/shared/api/recipes";
import { PagesContainer } from "@/shared/layout/PagesContainer";
import { EmptyState } from "@/shared/ui/EmptyState";
import { PageHeader } from "@/shared/ui/PageHeader";
import { QueryError } from "@/shared/ui/QueryError";
import { RecipeGridSkeleton } from "@/shared/ui/RecipeGridSkeleton";

export function SearchResultsPage() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const cuisine = params.get("cuisine") ?? undefined;
  const diet = params.get("diet") ?? undefined;
  const intolerances = params.get("intolerances") ?? undefined;
  const maxReadyTime = params.get("maxReadyTime");
  const number = params.get("number");

  const hasComplex =
    Boolean(cuisine) ||
    Boolean(diet) ||
    Boolean(intolerances) ||
    Boolean(maxReadyTime);

  const enabled = hasComplex || q.length > 0;

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [
      "recipes",
      "search",
      q,
      cuisine,
      diet,
      intolerances,
      maxReadyTime,
      number,
    ],
    queryFn: () => {
      if (hasComplex) {
        return searchRecipesComplex({
          query: q,
          cuisine,
          diet,
          intolerances,
          maxReadyTime: maxReadyTime ? Number(maxReadyTime) : undefined,
          number: number ? Number(number) : 16,
        });
      }
      return searchRecipes(q, number ? Number(number) : 16);
    },
    enabled,
  });

  if (!enabled) {
    return (
      <PagesContainer>
        <PageHeader
          eyebrow="Search"
          title="Start with a keyword or AI filters"
          description="Run a search from the home hero, cuisines page, or paste a URL with query parameters."
        />
        <EmptyState
          title="No active search"
          description="Try a dish name or ingredient, or use AI smart search on the Cuisines page to build filters from a sentence."
          icon={<HiMagnifyingGlass className="h-6 w-6" aria-hidden />}
        />
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex h-10 items-center rounded-xl border border-border bg-surface-elevated px-4 text-sm font-medium text-fg shadow-sm transition hover:bg-surface-muted"
          >
            Back to home
          </Link>
          <Link
            to="/cuisines"
            className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg shadow-sm transition hover:bg-primary-hover"
          >
            Open cuisines & search
          </Link>
        </div>
      </PagesContainer>
    );
  }

  const title = q.trim() ? `Results for “${q.trim()}”` : "Search results";

  if (isPending) {
    return (
      <PagesContainer>
        <PageHeader eyebrow="Search" title={title} />
        <RecipeGridSkeleton count={9} />
      </PagesContainer>
    );
  }
  if (isError) {
    return (
      <PagesContainer>
        <QueryError
          message={error instanceof Error ? error.message : "Search failed"}
          onRetry={() => void refetch()}
        />
      </PagesContainer>
    );
  }

  return (
    <PagesContainer>
      <PageHeader
        eyebrow="Search"
        title={title}
        description={
          hasComplex
            ? "Filtered with additional constraints from your last AI or manual selection."
            : "Keyword match across the catalog. Refine by opening a recipe or running smart search."
        }
      />
      {data.results.length === 0 ? (
        <EmptyState
          title="No recipes matched"
          description="Broaden the keyword, remove a filter, or try a different cuisine."
          icon={<HiMagnifyingGlass className="h-6 w-6" aria-hidden />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.results.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </PagesContainer>
  );
}
