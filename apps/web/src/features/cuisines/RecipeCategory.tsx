import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/cn";

const categories = [
  { name: "African", path: "/cuisines/African" },
  { name: "American", path: "/cuisines/American" },
  { name: "European", path: "/cuisines/European" },
  { name: "Indian", path: "/cuisines/Indian" },
  { name: "Mediterranean", path: "/cuisines/Mediterranean" },
  { name: "Asian", path: "/cuisines/Asian" },
] as const;

export function RecipeCategory() {
  return (
    <div
      className="flex flex-wrap justify-center gap-2 sm:justify-start"
      role="navigation"
      aria-label="Cuisine categories"
    >
      {categories.map((category) => (
        <NavLink
          to={category.path}
          key={category.path}
          className={({ isActive }) =>
            cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition duration-150 sm:text-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
              isActive
                ? "border-primary bg-primary-muted text-fg shadow-sm"
                : "border-border bg-surface-elevated text-fg-muted hover:border-primary/40 hover:bg-surface-muted hover:text-fg"
            )
          }
        >
          {category.name}
        </NavLink>
      ))}
    </div>
  );
}
