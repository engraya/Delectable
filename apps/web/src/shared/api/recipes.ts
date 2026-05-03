import { fetchJson } from "@/shared/lib/http";
import {
  complexSearchResponseSchema,
  randomRecipesResponseSchema,
  recipeInformationSchema,
} from "@/shared/api/schemas";

export function fetchTrendingRecipes(number = 50) {
  return fetchJson(
    `/api/recipes/trending?number=${number}`,
    randomRecipesResponseSchema
  );
}

export function fetchVegetarianRecipes(number = 50) {
  return fetchJson(
    `/api/recipes/vegetarian?number=${number}`,
    randomRecipesResponseSchema
  );
}

export function searchRecipes(q: string, number = 16) {
  const params = new URLSearchParams({ number: String(number) });
  if (q) params.set("q", q);
  return fetchJson(
    `/api/recipes/search?${params.toString()}`,
    complexSearchResponseSchema
  );
}

export function searchRecipesComplex(args: {
  query?: string;
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  maxReadyTime?: number;
  number?: number;
}) {
  const params = new URLSearchParams();
  if (args.query) params.set("query", args.query);
  if (args.cuisine) params.set("cuisine", args.cuisine);
  if (args.diet) params.set("diet", args.diet);
  if (args.intolerances) params.set("intolerances", args.intolerances);
  if (args.maxReadyTime != null) {
    params.set("maxReadyTime", String(args.maxReadyTime));
  }
  params.set("number", String(args.number ?? 16));
  return fetchJson(
    `/api/recipes/complex?${params.toString()}`,
    complexSearchResponseSchema
  );
}

export function fetchByCuisine(cuisine: string, number = 20) {
  const params = new URLSearchParams({
    cuisine,
    number: String(number),
  });
  return fetchJson(
    `/api/recipes/by-cuisine?${params.toString()}`,
    complexSearchResponseSchema
  );
}

export function fetchRecipeById(id: number) {
  return fetchJson(`/api/recipes/${id}`, recipeInformationSchema);
}
