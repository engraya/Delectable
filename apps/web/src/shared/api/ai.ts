import { apiUrl } from "@/shared/lib/http";
import {
  recipeAssistResponseSchema,
  searchParseResponseSchema,
} from "@/shared/api/schemas";
import type { RecipeInformation } from "@/shared/api/types";

export type ChatTurn = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function recipeAssist(
  recipe: Pick<
    RecipeInformation,
    | "id"
    | "title"
    | "summary"
    | "instructions"
    | "extendedIngredients"
    | "healthScore"
    | "readyInMinutes"
    | "vegetarian"
    | "vegan"
    | "glutenFree"
    | "dairyFree"
  >,
  messages: ChatTurn[]
) {
  const res = await fetch(apiUrl("/api/ai/recipe-assist"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipe: {
        id: recipe.id,
        title: recipe.title,
        summary: recipe.summary,
        instructions: recipe.instructions,
        extendedIngredients: recipe.extendedIngredients,
        healthScore: recipe.healthScore,
        readyInMinutes: recipe.readyInMinutes,
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        glutenFree: recipe.glutenFree,
        dairyFree: recipe.dairyFree,
      },
      messages,
    }),
  });
  const data: unknown = await res.json();
  if (!res.ok) {
    const err =
      data && typeof data === "object" && "error" in data
        ? String((data as { error: unknown }).error)
        : "Request failed";
    throw new Error(err);
  }
  return recipeAssistResponseSchema.parse(data);
}

export async function parseNaturalLanguageSearch(naturalLanguageQuery: string) {
  const res = await fetch(apiUrl("/api/ai/search-parse"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ naturalLanguageQuery }),
  });
  const data: unknown = await res.json();
  if (!res.ok) {
    const err =
      data && typeof data === "object" && "error" in data
        ? String((data as { error: unknown }).error)
        : "Request failed";
    throw new Error(err);
  }
  return searchParseResponseSchema.parse(data);
}
