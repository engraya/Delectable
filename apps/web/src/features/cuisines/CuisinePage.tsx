import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { RecipeCard } from "@/features/recipes/RecipeCard";
import { SearchRecipe } from "@/features/search/SearchRecipe";
import { fetchByCuisine } from "@/shared/api/recipes";
import { PagesContainer } from "@/shared/layout/PagesContainer";
import { EmptyState } from "@/shared/ui/EmptyState";
import { QueryError } from "@/shared/ui/QueryError";
import { Spinner } from "@/shared/ui/Spinner";

export function CuisinePage() {
  const { type } = useParams();

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["recipes", "cuisine", type],
    queryFn: () => fetchByCuisine(type ?? "", 20),
    enabled: Boolean(type && type.length > 0),
  });

  return (
    <PagesContainer>
      <SearchRecipe />
      {!type ? (
        <div className="mt-10">
          <EmptyState
            title="Choose a cuisine"
            description="Pick a cuisine above to load recipes from that region."
          />
        </div>
      ) : isPending ? (
        <Spinner label="Loading cuisine recipes" />
      ) : isError ? (
        <QueryError
          message={error instanceof Error ? error.message : "Failed to load"}
          onRetry={() => void refetch()}
        />
      ) : (
        <>
          <h2 className="text-md font-bold tracking-tight sm:text-2xl text-center text-cyan-600 mt-5">
            {type} cuisine
          </h2>
          <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {data.results.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </>
      )}
    </PagesContainer>
  );
}
