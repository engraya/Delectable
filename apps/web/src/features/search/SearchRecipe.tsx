import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeCategory } from "@/features/cuisines/RecipeCategory";
import { parseNaturalLanguageSearch } from "@/shared/api/ai";

export function SearchRecipe() {
  const [inputQuery, setInputQuery] = useState("");
  const [nlInput, setNlInput] = useState("");
  const [nlLoading, setNlLoading] = useState(false);
  const [nlError, setNlError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const q = inputQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleSmartSearch = async () => {
    const text = nlInput.trim();
    if (!text) return;
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
    <div className="relative isolate overflow-hidden px-6 py-6 text-center sm:shadow-sm">
      <p className="mx-auto max-w-2xl dark:text-slate-100 sm:text-4xl text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Search for your favourite recipe
      </p>
      <form onSubmit={handleSubmitForm} className="mt-4">
        <label
          className="mx-auto mt-8 relative min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300 dark:border-slate-600"
          htmlFor="search-bar"
        >
          <input
            id="search-bar"
            type="search"
            value={inputQuery}
            placeholder="Search for recipes"
            onChange={(e) => setInputQuery(e.target.value)}
            className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-transparent text-slate-900 dark:text-slate-100"
            autoComplete="off"
          />
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-green-500 text-gray-800 active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all font-semibold text-sm"
          >
            Search
          </button>
        </label>
      </form>

      <div className="mx-auto max-w-2xl mt-10 text-left rounded-2xl border border-cyan-200 dark:border-cyan-800 p-4 bg-cyan-50/50 dark:bg-cyan-950/20">
        <h2 className="text-sm font-semibold text-cyan-800 dark:text-cyan-200">
          AI smart search
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Describe what you want (e.g. “cheap vegetarian dinners under 30
          minutes”). Requires API keys on the server.
        </p>
        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={nlInput}
            onChange={(e) => setNlInput(e.target.value)}
            placeholder="Natural language…"
            className="flex-1 rounded-lg border px-3 py-2 text-sm dark:bg-gray-900 dark:border-gray-600"
          />
          <button
            type="button"
            onClick={() => void handleSmartSearch()}
            disabled={nlLoading}
            className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-50"
          >
            {nlLoading ? "Thinking…" : "Parse with AI"}
          </button>
        </div>
        {nlError ? (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {nlError}
          </p>
        ) : null}
      </div>

      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#delectable-grad)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="delectable-grad">
            <stop stopColor="#3b82f6" />
            <stop offset={1} stopColor="#1d4ed8" />
          </radialGradient>
        </defs>
      </svg>
      <div className="mt-8">
        <RecipeCategory />
      </div>
    </div>
  );
}
