import { useState } from "react";
import { HiPaperAirplane } from "react-icons/hi2";
import { recipeAssist } from "@/shared/api/ai";
import type { RecipeInformation } from "@/shared/api/types";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";

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
    <Card className="overflow-hidden" aria-labelledby="copilot-heading">
      <div className="border-b border-border bg-primary-muted/40 px-5 py-4 dark:bg-primary-muted/15">
        <h2 id="copilot-heading" className="text-base font-semibold text-fg">
          Recipe copilot
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-fg-muted sm:text-sm">
          Ask for substitutions, scaling, simpler steps, or allergy-aware ideas. Not
          medical advice.
        </p>
      </div>
      <div className="p-5 sm:p-6">
        <div
          className="max-h-72 space-y-3 overflow-y-auto rounded-xl border border-border bg-surface-muted/40 p-3 dark:bg-surface-muted/25"
          role="log"
          aria-live="polite"
        >
          {messages.length === 0 ? (
            <p className="text-sm text-fg-subtle">
              Your conversation will appear here. Start with a concrete question tied
              to this recipe.
            </p>
          ) : (
            messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={
                  m.role === "user"
                    ? "rounded-xl bg-surface-elevated px-3 py-2 text-sm text-fg shadow-sm"
                    : "rounded-xl border border-border bg-canvas px-3 py-2 text-sm text-fg-muted whitespace-pre-wrap"
                }
              >
                <span className="text-2xs font-semibold uppercase tracking-wide text-fg-subtle">
                  {m.role === "user" ? "You" : "Copilot"}
                </span>
                <p className="mt-1 leading-relaxed">{m.content}</p>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <label className="sr-only" htmlFor="copilot-input">
            Message to copilot
          </label>
          <textarea
            id="copilot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. What can I use instead of heavy cream?"
            rows={3}
            className="min-h-[5.5rem] w-full flex-1 resize-y rounded-xl border border-border bg-canvas px-3 py-2 text-sm text-fg placeholder:text-fg-subtle focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
          />
          <Button
            type="button"
            className="h-11 shrink-0 justify-center gap-2 rounded-xl sm:h-auto sm:self-start sm:px-5"
            onClick={() => void send()}
            disabled={loading || !input.trim()}
          >
            <HiPaperAirplane className="h-4 w-4" aria-hidden />
            {loading ? "Sending…" : "Send"}
          </Button>
        </div>
        <p className="mt-2 text-2xs text-fg-subtle">
          Shift+Enter adds a new line. Plain Enter sends.
        </p>
        {error ? (
          <p className="mt-2 text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </Card>
  );
}
