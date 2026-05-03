import { useQuery } from "@tanstack/react-query";
import { fetchVegetarianRecipes } from "@/shared/api/recipes";
import { PagesContainer } from "@/shared/layout/PagesContainer";
import { PageHeader } from "@/shared/ui/PageHeader";
import { QueryError } from "@/shared/ui/QueryError";
import { RecipeGridSkeleton } from "@/shared/ui/RecipeGridSkeleton";
import { RecipeCard } from "@/features/recipes/RecipeCard";

export function VegetarianPage() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["recipes", "vegetarian"],
    queryFn: () => fetchVegetarianRecipes(50),
    staleTime: 10 * 60 * 1000,
  });

  if (isPending) {
    return (
      <PagesContainer>
        <PageHeader
          eyebrow="Diet"
          title="Vegetarian recipes"
          description="Plant-forward dishes with clear dietary flags on each detail page."
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
        eyebrow="Diet"
        title="Vegetarian recipes"
        description="Explore meat-free ideas without sacrificing flavor. Each recipe page surfaces allergens and timing up front."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </PagesContainer>
  );
}
