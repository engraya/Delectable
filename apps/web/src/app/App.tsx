import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { HashScroll } from "@/app/HashScroll";
import { NavBar } from "@/layouts/NavBar";
import { Footer } from "@/layouts/Footer";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { Spinner } from "@/shared/ui/Spinner";
import { LandingPage } from "@/features/landing/LandingPage";
import { LegacySearchRedirect } from "@/features/search/LegacySearchRedirect";

const TrendingPage = lazy(() =>
  import("@/features/recipes/TrendingPage").then((m) => ({
    default: m.TrendingPage,
  }))
);
const VegetarianPage = lazy(() =>
  import("@/features/recipes/VegetarianPage").then((m) => ({
    default: m.VegetarianPage,
  }))
);
const CuisinePage = lazy(() =>
  import("@/features/cuisines/CuisinePage").then((m) => ({
    default: m.CuisinePage,
  }))
);
const SearchResultsPage = lazy(() =>
  import("@/features/search/SearchResultsPage").then((m) => ({
    default: m.SearchResultsPage,
  }))
);
const RecipeDetailsPage = lazy(() =>
  import("@/features/recipes/RecipeDetailsPage").then((m) => ({
    default: m.RecipeDetailsPage,
  }))
);
const NotFoundPage = lazy(() =>
  import("@/features/misc/NotFoundPage").then((m) => ({
    default: m.NotFoundPage,
  }))
);

function PageFallback() {
  return <Spinner label="Loading page" />;
}

export function App() {
  return (
    <ErrorBoundary>
      <HashScroll />
      <div className="flex min-h-screen flex-col bg-canvas text-fg">
        <NavBar />
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/cuisines" element={<CuisinePage />} />
              <Route path="/cuisines/:type" element={<CuisinePage />} />
              <Route path="/vegetarian" element={<VegetarianPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/searched/:search" element={<LegacySearchRedirect />} />
              <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
