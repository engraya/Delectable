import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { HiArrowLeft, HiClock, HiHeart, HiDocumentArrowDown } from "react-icons/hi2";
import jsPDF from "jspdf";
import { RecipeCopilot } from "@/features/ai/RecipeCopilot";
import { ImageDownloader } from "@/features/recipes/ImageDownloader";
import { fetchRecipeById } from "@/shared/api/recipes";
import { sanitizeRecipeHtml } from "@/shared/lib/sanitize";
import { PagesContainer } from "@/shared/layout/PagesContainer";
import { QueryError } from "@/shared/ui/QueryError";
import { Skeleton } from "@/shared/ui/Skeleton";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2.5 text-sm last:border-0">
      <span className="text-fg-muted">{label}</span>
      <span className="font-medium text-fg">{value}</span>
    </div>
  );
}

export function RecipeDetailsPage() {
  const { id: idParam } = useParams();
  const id = Number(idParam);

  const { data: recipe, isPending, isError, error, refetch } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id),
    enabled: Number.isFinite(id) && id > 0,
  });

  const generatePdf = () => {
    if (!recipe) return;
    const pdf = new jsPDF("portrait");
    pdf.setFontSize(22);
    if (recipe.image) {
      try {
        pdf.addImage(recipe.image, "JPEG", 20, 10, 100, 100);
      } catch {
        /* ignore image errors in PDF */
      }
    }
    pdf.setTextColor(0, 120, 100);
    pdf.text(`Name: ${recipe.title}`, 20, 130);
    pdf.setFontSize(16);
    pdf.setTextColor(80);
    pdf.text(`Health score: ${recipe.healthScore ?? "—"}`, 20, 140);
    pdf.text(`Dairy free: ${recipe.dairyFree ? "Yes" : "No"}`, 20, 150);
    pdf.text(`Gluten free: ${recipe.glutenFree ? "Yes" : "No"}`, 20, 160);
    pdf.text(`Vegetarian: ${recipe.vegetarian ? "Yes" : "No"}`, 20, 170);
    pdf.text(`Very healthy: ${recipe.veryHealthy ? "Yes" : "No"}`, 20, 180);
    pdf.text(
      `Ready in minutes: ${recipe.readyInMinutes ?? "—"}`,
      20,
      190
    );
    pdf.text("Ingredients", 20, 200);
    const ingredientsText =
      recipe.extendedIngredients
        ?.map((ingredient) => ingredient.original)
        .join("\n") ?? "";
    pdf.text(ingredientsText.slice(0, 4000), 20, 210);
    pdf.save("recipe-details.pdf");
  };

  if (!Number.isFinite(id) || id <= 0) {
    return (
      <PagesContainer>
        <QueryError message="Invalid recipe link." />
      </PagesContainer>
    );
  }

  if (isPending) {
    return (
      <PagesContainer>
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-24 animate-pulse rounded-lg bg-surface-muted" />
        </div>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-4 lg:col-span-7">
            <Skeleton className="aspect-[16/10] w-full rounded-2xl sm:aspect-[16/9]" />
            <Skeleton className="h-10 w-3/4 rounded-lg" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
          <div className="space-y-4 lg:col-span-5">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        </div>
      </PagesContainer>
    );
  }
  if (isError) {
    return (
      <PagesContainer>
        <QueryError
          message={error instanceof Error ? error.message : "Failed to load"}
          onRetry={() => void refetch()}
        />
      </PagesContainer>
    );
  }

  const safeSummary = sanitizeRecipeHtml(recipe.summary);
  const safeInstructions = sanitizeRecipeHtml(recipe.instructions);
  const ready = recipe.readyInMinutes != null ? `${recipe.readyInMinutes} min` : "—";

  return (
    <PagesContainer className="pb-16">
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          to="/trending"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm font-medium text-fg-muted shadow-sm transition hover:border-primary/40 hover:bg-surface-muted hover:text-fg"
        >
          <HiArrowLeft className="h-4 w-4" aria-hidden />
          Back to discovery
        </Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-card">
            {recipe.image ? (
              <img
                src={recipe.image}
                alt=""
                className="aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
              />
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center bg-surface-muted text-sm text-fg-subtle sm:aspect-[16/9]">
                No hero image
              </div>
            )}
          </div>

          <header className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Recipe
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              {recipe.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-fg-muted">
                <HiClock className="h-3.5 w-3.5" aria-hidden />
                {ready}
              </span>
              {recipe.veryHealthy ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success-muted/40 px-3 py-1 text-xs font-medium text-success dark:bg-success-muted/20">
                  <HiHeart className="h-3.5 w-3.5" aria-hidden />
                  Very healthy
                </span>
              ) : null}
            </div>
          </header>

          <section className="mt-10 space-y-10">
            <div>
              <h2 className="text-lg font-semibold text-fg">Summary</h2>
              {safeSummary ? (
                <div
                  className="prose-recipe mt-3 max-w-none text-sm leading-relaxed text-fg-muted [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: safeSummary }}
                />
              ) : (
                <p className="mt-3 text-sm text-fg-subtle">No summary for this dish.</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-fg">Cooking instructions</h2>
              {safeInstructions ? (
                <div
                  className="prose-recipe mt-3 max-w-none text-sm leading-relaxed text-fg-muted [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: safeInstructions }}
                />
              ) : (
                <p className="mt-3 text-sm text-fg-subtle">
                  No written instructions—check ingredients and copilot for ideas.
                </p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-fg">Ingredients</h2>
              <ul
                role="list"
                className="mt-4 divide-y divide-border rounded-2xl border border-border bg-surface-elevated"
              >
                {recipe.extendedIngredients?.map((ingredient) => (
                  <li
                    key={`${ingredient.id}-${ingredient.original}`}
                    className="px-4 py-3 text-sm text-fg-muted"
                  >
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>

            <RecipeCopilot recipe={recipe} />
          </section>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            <Card className="p-5 sm:p-6">
              <h2 className="text-sm font-semibold text-fg">At a glance</h2>
              <p className="mt-1 text-xs text-fg-muted">
                Diet flags and scoring help you decide before you scroll the steps.
              </p>
              <div className="mt-4">
                <MetaChip
                  label="Health score"
                  value={recipe.healthScore != null ? String(recipe.healthScore) : "—"}
                />
                <MetaChip
                  label="Dairy free"
                  value={recipe.dairyFree ? "Yes" : "No"}
                />
                <MetaChip
                  label="Gluten free"
                  value={recipe.glutenFree ? "Yes" : "No"}
                />
                <MetaChip
                  label="Vegetarian"
                  value={recipe.vegetarian ? "Yes" : "No"}
                />
                <MetaChip
                  label="Very healthy"
                  value={recipe.veryHealthy ? "Yes" : "No"}
                />
                <MetaChip
                  label="Ready in"
                  value={ready}
                />
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <h2 className="text-sm font-semibold text-fg">Export</h2>
              <p className="mt-1 text-xs text-fg-muted">
                Download a quick PDF summary or save the hero image for offline use.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button
                  type="button"
                  className="w-full justify-center gap-2 rounded-xl"
                  onClick={generatePdf}
                >
                  <HiDocumentArrowDown className="h-4 w-4" aria-hidden />
                  Download PDF
                </Button>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-muted/50 px-4 py-3 dark:bg-surface-muted/30">
                  <span className="text-sm font-medium text-fg">Hero image</span>
                  <ImageDownloader imageUrl={recipe.image} filename={recipe.title} />
                </div>
              </div>
            </Card>
          </div>
        </aside>
      </div>
    </PagesContainer>
  );
}
