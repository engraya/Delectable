import { z } from "zod";

export const recipeSummarySchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string().optional(),
});

export const complexSearchResponseSchema = z.object({
  results: z.array(recipeSummarySchema),
  offset: z.number().optional(),
  number: z.number().optional(),
  totalResults: z.number().optional(),
});

export const randomRecipesResponseSchema = z.object({
  recipes: z.array(recipeSummarySchema),
});

export const extendedIngredientSchema = z.object({
  id: z.number().optional(),
  original: z.string(),
});

export const recipeInformationSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    image: z.string().optional(),
    summary: z.string().optional(),
    instructions: z.string().optional(),
    healthScore: z.number().optional(),
    dairyFree: z.boolean().optional(),
    glutenFree: z.boolean().optional(),
    vegetarian: z.boolean().optional(),
    vegan: z.boolean().optional(),
    veryHealthy: z.boolean().optional(),
    readyInMinutes: z.number().optional(),
    extendedIngredients: z.array(extendedIngredientSchema).optional(),
  })
  .passthrough();

export const recipeAssistResponseSchema = z.object({
  reply: z.string(),
});

export const searchParseResponseSchema = z.object({
  filters: z.object({
    query: z.string().optional(),
    cuisine: z.string().optional(),
    diet: z.string().optional(),
    intolerances: z.string().optional(),
    maxReadyTime: z.number().optional(),
    number: z.number().optional(),
  }),
});

export const errorResponseSchema = z.object({
  error: z.string(),
});
