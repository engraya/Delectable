import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(8787),
  SPOONACULAR_API_KEY: z.string().min(1, "SPOONACULAR_API_KEY is required"),
  OPENAI_API_KEY: z.string().optional(),
  /** e.g. https://api.openai.com/v1 or compatible proxy; omit for OpenAI default */
  OPENAI_BASE_URL: z.string().optional(),
  OPENAI_MODEL: z.string().default("gpt-4o-mini"),
  ALLOWED_ORIGINS: z.string().default("http://localhost:5173"),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }
  return parsed.data;
}

export function getAllowedOrigins(env: Env): string[] {
  return env.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean);
}
