import { z } from "zod";
import {
  recipeInformationSchema,
  recipeSummarySchema,
} from "@/shared/api/schemas";

export type RecipeSummary = z.infer<typeof recipeSummarySchema>;
export type RecipeInformation = z.infer<typeof recipeInformationSchema>;
