import { Navigate, useParams } from "react-router-dom";

/** Old path `/searched/:search` → `/search?q=…` */
export function LegacySearchRedirect() {
  const { search } = useParams();
  const q = search ?? "";
  return <Navigate to={`/search?q=${encodeURIComponent(q)}`} replace />;
}
