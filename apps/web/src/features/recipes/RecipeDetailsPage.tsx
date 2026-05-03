import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";
import jsPDF from "jspdf";
import { RecipeCopilot } from "@/features/ai/RecipeCopilot";
import { ImageDownloader } from "@/features/recipes/ImageDownloader";
import { fetchRecipeById } from "@/shared/api/recipes";
import { sanitizeRecipeHtml } from "@/shared/lib/sanitize";
import { PagesContainer } from "@/shared/layout/PagesContainer";
import { QueryError } from "@/shared/ui/QueryError";
import { Spinner } from "@/shared/ui/Spinner";

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
    pdf.setTextColor("green");
    pdf.text(`Name: ${recipe.title}`, 20, 130);
    pdf.setFontSize(16);
    pdf.setTextColor(100);
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
    return <Spinner label="Loading recipe" />;
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

  return (
    <PagesContainer>
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <li>
            <Link
              to="/trending"
              className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              aria-label="Back to trending"
            >
              <GrFormPreviousLink aria-hidden />
            </Link>
          </li>
        </ol>
      </nav>

      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 dark:lg:border-gray-700">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-slate-900 dark:text-slate-100">
            {recipe.title}
          </h1>
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Recipe metadata</h2>
          <p className="text-2xl tracking-tight text-cyan-600">Details</p>
          <hr className="dark:border-gray-600" />
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="font-medium text-cyan-600">Health score</dt>
              <dd className="text-gray-600 dark:text-gray-400">
                {recipe.healthScore ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-cyan-600">Dairy free</dt>
              <dd className="text-gray-600 dark:text-gray-400">
                {recipe.dairyFree ? "Yes" : "No"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-cyan-600">Gluten free</dt>
              <dd className="text-gray-600 dark:text-gray-400">
                {recipe.glutenFree ? "Yes" : "No"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-cyan-600">Vegetarian</dt>
              <dd className="text-gray-600 dark:text-gray-400">
                {recipe.vegetarian ? "Yes" : "No"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-cyan-600">Very healthy</dt>
              <dd className="text-gray-600 dark:text-gray-400">
                {recipe.veryHealthy ? "Yes" : "No"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-cyan-600">Ready in minutes</dt>
              <dd className="text-gray-600 dark:text-gray-400">
                {recipe.readyInMinutes ?? "—"}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={generatePdf}
            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 px-8 py-3 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Download PDF
          </button>
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-2 rounded-md border border-transparent bg-cyan-600 px-8 py-3 text-base font-medium text-white">
            <span className="text-center">Download image</span>
            <ImageDownloader imageUrl={recipe.image} filename={recipe.title} />
          </div>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6 dark:lg:border-gray-700">
          <div className="mb-12 mt-3">
            <hr className="dark:border-gray-600" />
            <h3 className="font-serif font-bold mt-4 text-cyan-600 underline">
              Summary
            </h3>
            {safeSummary ? (
              <div
                className="max-w-none text-sm text-gray-600 dark:text-gray-300 [&_a]:text-cyan-600 [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: safeSummary }}
              />
            ) : (
              <p className="text-gray-500">No summary.</p>
            )}
          </div>
          <hr className="dark:border-gray-600" />
          <div>
            <h3 className="font-serif font-bold mt-4 text-cyan-600 underline">
              Cooking instructions
            </h3>
            {safeInstructions ? (
              <div
                className="max-w-none text-sm text-gray-600 dark:text-gray-300 [&_a]:text-cyan-600 [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: safeInstructions }}
              />
            ) : (
              <p className="text-gray-500">No instructions listed.</p>
            )}
          </div>

          <div className="mt-10">
            <hr className="dark:border-gray-600" />
            <h3 className="font-serif font-bold mt-4 text-cyan-600 underline">
              Ingredients
            </h3>
            <ul
              role="list"
              className="list-disc space-y-2 pl-4 text-sm text-gray-600 dark:text-gray-300"
            >
              {recipe.extendedIngredients?.map((ingredient) => (
                <li key={`${ingredient.id}-${ingredient.original}`}>
                  {ingredient.original}
                </li>
              ))}
            </ul>
          </div>

          <RecipeCopilot recipe={recipe} />
        </div>
      </div>
    </PagesContainer>
  );
}
