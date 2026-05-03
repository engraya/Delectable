import { useQuery } from "@tanstack/react-query";
import { fetchTrendingRecipes } from "@/shared/api/recipes";
import { PagesContainer } from "@/shared/layout/PagesContainer";
import { PageHeader } from "@/shared/ui/PageHeader";
import { QueryError } from "@/shared/ui/QueryError";
import { RecipeGridSkeleton } from "@/shared/ui/RecipeGridSkeleton";
import { RecipeCard } from "@/features/recipes/RecipeCard";

export function TrendingPage() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["recipes", "trending"],
    queryFn: () => fetchTrendingRecipes(50),
    staleTime: 10 * 60 * 1000,
  });

  if (isPending) {
    return (
      <PagesContainer>
        <PageHeader
          eyebrow="Discover"
          title="Trending recipes"
          description="What home cooks are opening right now—updated on a short cache so pages stay snappy."
        />
        <RecipeGridSkeleton count={9} />
      </PagesContainer>
    );
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
      <PageHeader
        eyebrow="Discover"
        title="Trending recipes"
        description="A high-signal grid with fast scan, clear titles, and imagery that stays respectful of your attention."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </PagesContainer>
  );
}
