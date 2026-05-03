import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowRight, HiMagnifyingGlass } from "react-icons/hi2";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";

type Props = {
  className?: string;
  placeholder?: string;
  submitLabel?: string;
  /** Larger padding + icon for hero usage */
  size?: "default" | "lg";
  autoFocus?: boolean;
};

export function RecipeSearchField({
  className,
  placeholder = "Search with Delectable AI — dishes, ingredients, cuisines…",
  submitLabel = "Search",
  size = "default",
  autoFocus = false,
}: Props) {
  const [query, setQuery] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      setShowError(true);
      return;
    }
    setShowError(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn("w-full", className)}
      noValidate
    >
      <div
        className={cn(
          "flex flex-col gap-2 rounded-2xl border bg-surface-elevated p-1 shadow-card transition-shadow duration-180 focus-within:border-primary/40 focus-within:shadow-card-hover sm:flex-row sm:items-stretch",
          showError ? "border-danger" : "border-border"
        )}
      >
        <label className="sr-only" htmlFor="recipe-search-input">
          Search recipes
        </label>
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2 px-3",
            size === "lg" ? "py-3 sm:px-4" : "py-2 sm:px-3"
          )}
        >
          <HiMagnifyingGlass
            className="h-5 w-5 shrink-0 text-fg-subtle"
            aria-hidden
          />
          <input
            id="recipe-search-input"
            type="search"
            name="q"
            value={query}
            autoComplete="off"
            autoFocus={autoFocus}
            aria-invalid={showError}
            aria-describedby={showError ? "recipe-search-hint" : undefined}
            onChange={(e) => {
              setQuery(e.target.value);
              if (showError && e.target.value.trim()) setShowError(false);
            }}
            placeholder={placeholder}
            className="min-w-0 flex-1 border-0 bg-transparent text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-0 text-sm sm:text-base"
          />
        </div>
        <Button
          type="submit"
          size={size === "lg" ? "lg" : "md"}
          className="shrink-0 rounded-xl sm:rounded-lg"
        >
          {submitLabel}
          <HiArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
      {showError ? (
        <p id="recipe-search-hint" className="mt-2 text-sm text-danger" role="alert">
          Enter a dish, ingredient, or keyword to search.
        </p>
      ) : (
        <p className="mt-2 text-2xs text-fg-subtle sm:text-xs">
          Tip: try “quick chicken”, “vegan pasta”, or a cuisine you crave.
        </p>
      )}
    </form>
  );
}
