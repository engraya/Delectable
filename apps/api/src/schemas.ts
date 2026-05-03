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
  recipes: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      image: z.string().optional(),
    })
  ),
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
    veryHealthy: z.boolean().optional(),
    readyInMinutes: z.number().optional(),
    extendedIngredients: z.array(extendedIngredientSchema).optional(),
  })
  .passthrough();

export const aiMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string().max(12000),
});

export const recipeAssistBodySchema = z.object({
  messages: z.array(aiMessageSchema).max(30),
  recipe: z.object({
    id: z.number(),
    title: z.string(),
    summary: z.string().optional(),
    instructions: z.string().optional(),
    extendedIngredients: z
      .array(z.object({ original: z.string() }))
      .max(80)
      .optional(),
    healthScore: z.number().optional(),
    readyInMinutes: z.number().optional(),
    vegetarian: z.boolean().optional(),
    vegan: z.boolean().optional(),
    glutenFree: z.boolean().optional(),
    dairyFree: z.boolean().optional(),
  }),
});

export const searchParseBodySchema = z.object({
  naturalLanguageQuery: z.string().min(1).max(500),
});

export const searchParseResultSchema = z.object({
  query: z.string().optional(),
  cuisine: z.string().optional(),
  diet: z.string().optional(),
  intolerances: z.string().optional(),
  maxReadyTime: z.number().optional(),
  number: z.number().optional(),
});
