import "./bootstrapEnv.js";
import { SchemaType, type ResponseSchema } from "@google/generative-ai";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { z } from "zod";
import { getAllowedOrigins, loadEnv, normalizeOrigin } from "./env.js";
import {
  geminiGenerate,
  GeminiNetworkError,
  parseJsonFromModelText,
} from "./gemini.js";
import { checkRateLimit, clientKey } from "./rateLimit.js";
import {
  complexSearchResponseSchema,
  randomRecipesResponseSchema,
  recipeAssistBodySchema,
  recipeInformationSchema,
  searchParseBodySchema,
  searchParseResultSchema,
} from "./schemas.js";
import {
  spoonacularFetch,
  SpoonacularNetworkError,
  stripHtml,
} from "./spoonacular.js";

const env = loadEnv();
const allowed = getAllowedOrigins(env);

/** Gemini structured output for `/api/ai/search-parse` (optional keys match Zod schema). */
const searchParseGeminiSchema = {
  type: SchemaType.OBJECT,
  properties: {
    query: { type: SchemaType.STRING, description: "Main recipe search keywords" },
    cuisine: { type: SchemaType.STRING },
    diet: { type: SchemaType.STRING },
    intolerances: { type: SchemaType.STRING },
    maxReadyTime: { type: SchemaType.INTEGER },
    number: { type: SchemaType.INTEGER },
  },
} as ResponseSchema;

const app = new Hono();

app.onError((err, c) => {
  console.error(err);
  if (err instanceof SpoonacularNetworkError) {
    return c.json({ error: err.message, code: err.code }, 503);
  }
  if (err instanceof GeminiNetworkError) {
    return c.json({ error: err.message, code: err.code }, 503);
  }
  return c.json({ error: "Internal server error" }, 500);
});

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) return allowed[0] ?? "*";
      // Must reflect the request Origin exactly when allowed; never substitute another origin.
      return allowed.includes(normalizeOrigin(origin)) ? origin : null;
    },
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    maxAge: 86400,
  })
);

app.get("/health", (c) => c.json({ ok: true }));

const numberQuery = z.coerce.number().int().min(1).max(100).optional();

app.get("/api/recipes/trending", async (c) => {
  const q = z
    .object({ number: numberQuery.default(50) })
    .parse({ number: c.req.query("number") });
  const res = await spoonacularFetch(env, "/recipes/random", {
    number: q.number,
  });
  if (!res.ok) {
    return c.json({ error: "Spoonacular request failed" }, 502);
  }
  const json: unknown = await res.json();
  const parsed = randomRecipesResponseSchema.safeParse(json);
  if (!parsed.success) {
    return c.json({ error: "Invalid Spoonacular response" }, 502);
  }
  return c.json(parsed.data);
});

app.get("/api/recipes/vegetarian", async (c) => {
  const q = z
    .object({ number: numberQuery.default(50) })
    .parse({ number: c.req.query("number") });
  const res = await spoonacularFetch(env, "/recipes/random", {
    number: q.number,
    tags: "vegetarian",
  });
  if (!res.ok) {
    return c.json({ error: "Spoonacular request failed" }, 502);
  }
  const json: unknown = await res.json();
  const parsed = randomRecipesResponseSchema.safeParse(json);
  if (!parsed.success) {
    return c.json({ error: "Invalid Spoonacular response" }, 502);
  }
  return c.json(parsed.data);
});

app.get("/api/recipes/search", async (c) => {
  const q = z
    .object({
      q: z.string().max(200).optional(),
      number: numberQuery.default(16),
    })
    .parse({ q: c.req.query("q"), number: c.req.query("number") });
  const res = await spoonacularFetch(env, "/recipes/complexSearch", {
    query: q.q ?? "",
    number: q.number,
  });
  if (!res.ok) {
    return c.json({ error: "Spoonacular request failed" }, 502);
  }
  const json: unknown = await res.json();
  const parsed = complexSearchResponseSchema.safeParse(json);
  if (!parsed.success) {
    return c.json({ error: "Invalid Spoonacular response" }, 502);
  }
  return c.json(parsed.data);
});

/** Full complexSearch proxy for AI-parsed filters (all params optional except constraints). */
app.get("/api/recipes/complex", async (c) => {
  const q = z
    .object({
      query: z.string().max(200).optional(),
      cuisine: z
        .string()
        .max(80)
        .regex(/^[a-zA-Z\s-]*$/)
        .optional(),
      diet: z.string().max(80).optional(),
      intolerances: z.string().max(120).optional(),
      maxReadyTime: z.coerce.number().int().min(1).max(240).optional(),
      number: numberQuery.default(16),
    })
    .parse({
      query: c.req.query("query"),
      cuisine: c.req.query("cuisine"),
      diet: c.req.query("diet"),
      intolerances: c.req.query("intolerances"),
      maxReadyTime: c.req.query("maxReadyTime"),
      number: c.req.query("number"),
    });
  const res = await spoonacularFetch(env, "/recipes/complexSearch", {
    query: q.query ?? "",
    cuisine: q.cuisine,
    diet: q.diet,
    intolerances: q.intolerances,
    maxReadyTime: q.maxReadyTime,
    number: q.number,
  });
  if (!res.ok) {
    return c.json({ error: "Spoonacular request failed" }, 502);
  }
  const json: unknown = await res.json();
  const parsed = complexSearchResponseSchema.safeParse(json);
  if (!parsed.success) {
    return c.json({ error: "Invalid Spoonacular response" }, 502);
  }
  return c.json(parsed.data);
});

app.get("/api/recipes/by-cuisine", async (c) => {
  const q = z
    .object({
      cuisine: z
        .string()
        .min(1)
        .max(80)
        .regex(/^[a-zA-Z\s-]+$/),
      number: numberQuery.default(20),
    })
    .parse({ cuisine: c.req.query("cuisine"), number: c.req.query("number") });
  const res = await spoonacularFetch(env, "/recipes/complexSearch", {
    cuisine: q.cuisine,
    number: q.number,
  });
  if (!res.ok) {
    return c.json({ error: "Spoonacular request failed" }, 502);
  }
  const json: unknown = await res.json();
  const parsed = complexSearchResponseSchema.safeParse(json);
  if (!parsed.success) {
    return c.json({ error: "Invalid Spoonacular response" }, 502);
  }
  return c.json(parsed.data);
});

app.get("/api/recipes/:id", async (c) => {
  const id = z.coerce.number().int().positive().parse(c.req.param("id"));
  const res = await spoonacularFetch(
    env,
    `/recipes/${id}/information`,
    {}
  );
  if (!res.ok) {
    return c.json({ error: "Recipe not found" }, res.status === 404 ? 404 : 502);
  }
  const json: unknown = await res.json();
  const parsed = recipeInformationSchema.safeParse(json);
  if (!parsed.success) {
    return c.json({ error: "Invalid Spoonacular response" }, 502);
  }
  return c.json(parsed.data);
});

app.post("/api/ai/recipe-assist", async (c) => {
  const ip = clientKey(c.req.raw.headers);
  if (!checkRateLimit(`ai:${ip}`, 30, 60_000)) {
    return c.json({ error: "Too many AI requests. Try again shortly." }, 429);
  }
  let body: z.infer<typeof recipeAssistBodySchema>;
  try {
    body = recipeAssistBodySchema.parse(await c.req.json());
  } catch {
    return c.json({ error: "Invalid request body" }, 400);
  }
  try {
    const ing = (body.recipe.extendedIngredients ?? [])
      .map((i) => i.original)
      .slice(0, 40)
      .join("; ");
    const context = [
      `Recipe: ${body.recipe.title}`,
      body.recipe.summary
        ? `Summary: ${stripHtml(body.recipe.summary).slice(0, 1500)}`
        : "",
      body.recipe.instructions
        ? `Instructions: ${stripHtml(body.recipe.instructions).slice(0, 4000)}`
        : "",
      `Ingredients: ${ing}`,
      `Time (min): ${body.recipe.readyInMinutes ?? "unknown"}`,
      `Tags — veg: ${body.recipe.vegetarian}, glutenFree: ${body.recipe.glutenFree}, dairyFree: ${body.recipe.dairyFree}`,
    ]
      .filter(Boolean)
      .join("\n");

    const systemInstruction = `You are a careful cooking assistant for the Delectable app. Use only the recipe context; if information is missing, say so. Do not give medical or allergy guarantees—suggest the user verify allergens. Be concise; use short bullets when listing steps or substitutions.`;

    const userText = `Recipe context:\n${context}\n\nConversation:\n${body.messages.map((m) => `${m.role}: ${m.content}`).join("\n")}`;

    const reply = await geminiGenerate(env, {
      systemInstruction,
      userText,
      maxOutputTokens: 900,
      temperature: 0.4,
    });
    return c.json({ reply });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI error";
    return c.json({ error: msg }, 503);
  }
});

app.post("/api/ai/search-parse", async (c) => {
  const ip = clientKey(c.req.raw.headers);
  if (!checkRateLimit(`ai-search:${ip}`, 20, 60_000)) {
    return c.json({ error: "Too many AI requests. Try again shortly." }, 429);
  }
  let body: z.infer<typeof searchParseBodySchema>;
  try {
    body = searchParseBodySchema.parse(await c.req.json());
  } catch {
    return c.json({ error: "Invalid request body" }, 400);
  }
  try {
    const systemInstruction = `You map a user's natural-language recipe search into JSON parameters for the Spoonacular complexSearch API.
Use only these optional fields in the JSON output:
- query: main keywords
- cuisine: one of african american chinese french indian italian japanese korean mexican thai vietnamese mediterranean european asian (lowercase) or omit
- diet: one of ketogenic vegetarian vegan pescetarian paleo primal whole30 gluten free (lowercase) or omit
- intolerances: comma-separated e.g. dairy,gluten or omit
- maxReadyTime: minutes 1-240
- number: result count 1-30 (default 16 when unsure)

If the user is vague, still infer reasonable query keywords.`;

    const raw = await geminiGenerate(env, {
      systemInstruction,
      userText: `User request: ${body.naturalLanguageQuery}`,
      maxOutputTokens: 300,
      temperature: 0.2,
      responseMimeType: "application/json",
      responseSchema: searchParseGeminiSchema,
    });

    let parsedJson: unknown;
    try {
      parsedJson = parseJsonFromModelText(raw);
    } catch {
      return c.json({ error: "Could not parse AI response" }, 502);
    }
    const parsed = searchParseResultSchema.safeParse(parsedJson);
    if (!parsed.success) {
      return c.json({ error: "Invalid structured output" }, 502);
    }
    return c.json({ filters: parsed.data });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI error";
    return c.json({ error: msg }, 503);
  }
});

const port = env.PORT;
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`API listening on http://localhost:${info.port}`);
});
