import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { RecipeCard } from "@/features/recipes/RecipeCard";
import { SearchRecipe } from "@/features/search/SearchRecipe";
import { fetchByCuisine } from "@/shared/api/recipes";
import { PagesContainer } from "@/shared/layout/PagesContainer";
import { EmptyState } from "@/shared/ui/EmptyState";
import { PageHeader } from "@/shared/ui/PageHeader";
import { QueryError } from "@/shared/ui/QueryError";
import { RecipeGridSkeleton } from "@/shared/ui/RecipeGridSkeleton";

export function CuisinePage() {
  const { type } = useParams();

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["recipes", "cuisine", type],
    queryFn: () => fetchByCuisine(type ?? "", 20),
    enabled: Boolean(type && type.length > 0),
  });

  return (
    <PagesContainer>
      <SearchRecipe variant="compact" className="pb-4" />

      {!type ? (
        <div className="mt-6">
          <EmptyState
            title="Choose a cuisine to load recipes"
            description="Pick a cuisine chip above. You can still search globally from the field at the top."
          />
        </div>
      ) : isPending ? (
        <div className="mt-8 space-y-6">
          <PageHeader
            eyebrow="Cuisine"
            title={`${type} recipes`}
            description="Hand-picked results from this region. Open a card for full instructions and nutrition context."
          />
          <RecipeGridSkeleton count={9} />
        </div>
      ) : isError ? (
        <div className="mt-8">
          <QueryError
            message={error instanceof Error ? error.message : "Failed to load"}
            onRetry={() => void refetch()}
          />
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          <PageHeader
            eyebrow="Cuisine"
            title={`${type} recipes`}
            description="Explore dishes from this tradition. Tap a recipe for ingredients, steps, and export options."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </PagesContainer>
  );
}
