import { useState } from "react";
import { recipeAssist } from "@/shared/api/ai";
import type { RecipeInformation } from "@/shared/api/types";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function RecipeCopilot({ recipe }: { recipe: RecipeInformation }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    const userMsg: ChatMessage = { role: "user", content: text };
    const nextTurns = [...messages, userMsg];
    setMessages(nextTurns);
    setInput("");
    setLoading(true);
    try {
      const apiMessages = nextTurns.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const { reply } = await recipeAssist(recipe, apiMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reach assistant");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="mt-10 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50/40 dark:bg-cyan-950/20 p-4"
      aria-labelledby="copilot-heading"
    >
      <h2
        id="copilot-heading"
        className="text-lg font-semibold text-cyan-800 dark:text-cyan-200"
      >
        Recipe copilot
      </h2>
      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
        Ask for substitutions, scaling, simpler steps, or allergy-aware ideas.
        Not medical advice.
      </p>
      <div
        className="mt-3 max-h-64 overflow-y-auto space-y-2 text-sm rounded-lg bg-white/80 dark:bg-gray-900/50 p-3"
        role="log"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <p className="text-slate-500">Your conversation will appear here.</p>
        ) : (
          messages.map((m, i) => (
            <div
              key={`${m.role}-${i}`}
              className={
                m.role === "user"
                  ? "text-slate-800 dark:text-slate-200"
                  : "text-cyan-900 dark:text-cyan-100 whitespace-pre-wrap"
              }
            >
              <span className="font-medium">
                {m.role === "user" ? "You" : "Copilot"}:
              </span>{" "}
              {m.content}
            </div>
          ))
        )}
      </div>
      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. What can I use instead of cream?"
          rows={2}
          className="flex-1 rounded-lg border px-3 py-2 text-sm dark:bg-gray-900 dark:border-gray-600"
        />
        <button
          type="button"
          onClick={() => void send()}
          disabled={loading}
          className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-50 self-stretch sm:self-auto"
        >
          {loading ? "…" : "Send"}
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
}
