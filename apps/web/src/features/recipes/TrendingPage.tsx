import { useQuery } from "@tanstack/react-query";
import { fetchTrendingRecipes } from "@/shared/api/recipes";
import { PagesContainer } from "@/shared/layout/PagesContainer";
import { QueryError } from "@/shared/ui/QueryError";
import { Spinner } from "@/shared/ui/Spinner";
import { RecipeCard } from "@/features/recipes/RecipeCard";

export function TrendingPage() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["recipes", "trending"],
    queryFn: () => fetchTrendingRecipes(50),
    staleTime: 10 * 60 * 1000,
  });

  if (isPending) {
    return <Spinner label="Loading trending recipes" />;
  }
  if (isError) {
    return (
      <PagesContainer>
        <QueryError
          message={error instanceof Error ? error.message : "Failed to load"}
          onRetry={() => void refetch()}
        />
      </PagesContainer>
    );
  }

  return (
    <PagesContainer>
      <h1 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
        Trending recipes
      </h1>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {data.recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </PagesContainer>
  );
}
