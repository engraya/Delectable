import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { RecipeCard } from "@/features/recipes/RecipeCard";
import { searchRecipes, searchRecipesComplex } from "@/shared/api/recipes";
import { PagesContainer } from "@/shared/layout/PagesContainer";
import { EmptyState } from "@/shared/ui/EmptyState";
import { QueryError } from "@/shared/ui/QueryError";
import { Spinner } from "@/shared/ui/Spinner";

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
        <EmptyState
          title="No search yet"
          description="Enter a keyword in the search bar or use AI smart search from the Cuisines page."
        />
      </PagesContainer>
    );
  }

  if (isPending) {
    return <Spinner label="Loading search results" />;
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

  const title = q || "Search results";

  return (
    <PagesContainer>
      <h1 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
        {title}
      </h1>
      {data.results.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No recipes found" />
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {data.results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </PagesContainer>
  );
}
