import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiLightBulb } from "react-icons/hi2";
import { RecipeCategory } from "@/features/cuisines/RecipeCategory";
import { RecipeSearchField } from "@/features/search/RecipeSearchField";
import { parseNaturalLanguageSearch } from "@/shared/api/ai";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { cn } from "@/shared/lib/cn";

type Props = {
  /** Tighter heading for pages that already establish context */
  variant?: "hero" | "compact";
  className?: string;
};

export function SearchRecipe({ variant = "hero", className }: Props) {
  const [nlInput, setNlInput] = useState("");
  const [nlLoading, setNlLoading] = useState(false);
  const [nlError, setNlError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSmartSearch = async () => {
    const text = nlInput.trim();
    if (!text) {
      setNlError("Describe what you want to cook—e.g. “high protein meals under 30 minutes.”");
      return;
    }
    setNlError(null);
    setNlLoading(true);
    try {
      const { filters } = await parseNaturalLanguageSearch(text);
      const params = new URLSearchParams();
      if (filters.query) params.set("q", filters.query);
      if (filters.cuisine) params.set("cuisine", filters.cuisine);
      if (filters.diet) params.set("diet", filters.diet);
      if (filters.intolerances) params.set("intolerances", filters.intolerances);
      if (filters.maxReadyTime != null) {
        params.set("maxReadyTime", String(filters.maxReadyTime));
      }
      if (filters.number != null) params.set("number", String(filters.number));
      navigate(`/search?${params.toString()}`);
    } catch (err) {
      setNlError(err instanceof Error ? err.message : "Smart search failed");
    } finally {
      setNlLoading(false);
    }
  };

  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center sm:text-left">
        {variant === "hero" ? (
          <>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Find your next favorite dish
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-base">
              Search by keyword, then refine with cuisines and diets—or let AI turn a
              sentence into filters.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-fg">Search & filters</h2>
            <p className="mt-1 text-sm text-fg-muted">
              Keywords first. AI parsing is optional and runs on the server.
            </p>
          </>
        )}
      </div>

      <RecipeSearchField />

      <Card className="p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-muted text-primary">
            <HiLightBulb className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-fg">AI smart search</h3>
            <p className="mt-1 text-xs leading-relaxed text-fg-muted sm:text-sm">
              Describe a meal in plain language. The API extracts query, cuisine,
              diet, intolerances, and time constraints when your server keys are
              configured.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <label className="sr-only" htmlFor="nl-search">
            Natural language search
          </label>
          <input
            id="nl-search"
            type="text"
            value={nlInput}
            onChange={(e) => {
              setNlInput(e.target.value);
              if (nlError) setNlError(null);
            }}
            placeholder='e.g. “cheap vegetarian dinners under 30 minutes”'
            className="min-h-10 w-full flex-1 rounded-xl border border-border bg-canvas px-3 py-2 text-sm text-fg placeholder:text-fg-subtle focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
            aria-invalid={Boolean(nlError)}
            aria-describedby={nlError ? "nl-search-error" : "nl-search-hint"}
          />
          <Button
            type="button"
            className="shrink-0 rounded-xl sm:w-auto"
            onClick={() => void handleSmartSearch()}
            disabled={nlLoading}
          >
            {nlLoading ? "Parsing…" : "Parse with AI"}
          </Button>
        </div>
        <p id="nl-search-hint" className="mt-2 text-2xs text-fg-subtle sm:text-xs">
          Natural language requests are sent to your backend; nothing is stored in
          the browser beyond normal navigation.
        </p>
        {nlError ? (
          <p id="nl-search-error" className="mt-2 text-sm text-danger" role="alert">
            {nlError}
          </p>
        ) : null}
      </Card>

      <div>
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-fg-subtle sm:text-left">
          Popular cuisines
        </p>
        <RecipeCategory />
      </div>
    </div>
  );
}
