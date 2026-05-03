import { NavLink } from "react-router-dom";

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
      className="divB flex flex-wrap justify-center mx-auto max-w-2xl items-center gap-2"
      role="navigation"
      aria-label="Cuisine categories"
    >
      {categories.map((category) => (
        <NavLink
          to={category.path}
          key={category.path}
          className={({ isActive }) =>
            [
              "rounded-tl-full rounded-br-full text-white text-xs text-center px-4 py-2 m-1 transition-colors",
              isActive
                ? "bg-green-500 ring-2 ring-green-300"
                : "bg-gradient-to-r from-green-400 to-blue-500 hover:opacity-90",
            ].join(" ")
          }
        >
          {category.name}
        </NavLink>
      ))}
    </div>
  );
}
