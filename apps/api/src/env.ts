import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(8787),
  SPOONACULAR_API_KEY: z.string().min(1, "SPOONACULAR_API_KEY is required"),
  /** Google AI Studio / Gemini API key for recipe copilot and smart search */
  GEMINI_API_KEY: z.string().optional(),
  /** See Google AI Studio model list (e.g. gemini-3-flash-preview, gemini-2.0-flash) */
  GEMINI_MODEL: z.string().default("gemini-3-flash-preview"),
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

/** Browser Origin never includes a trailing slash; env values sometimes do. */
export function normalizeOrigin(origin: string): string {
  const s = origin.trim();
  return s.endsWith("/") ? s.slice(0, -1) : s;
}

export function getAllowedOrigins(env: Env): string[] {
  return env.ALLOWED_ORIGINS.split(",")
    .map((s) => normalizeOrigin(s))
    .filter(Boolean);
}
