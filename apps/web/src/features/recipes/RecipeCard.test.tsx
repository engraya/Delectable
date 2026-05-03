import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { RecipeCard } from "@/features/recipes/RecipeCard";

describe("RecipeCard", () => {
  it("links to recipe detail by id", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: (
            <RecipeCard
              recipe={{
                id: 42,
                title: "Test stew",
                image: "https://ex.test/i.jpg",
              }}
            />
          ),
        },
      ],
      { initialEntries: ["/"] }
    );
    render(<RouterProvider router={router} />);
    const link = screen.getByRole("link", { name: /test stew/i });
    expect(link).toHaveAttribute("href", "/recipe/42");
  });
});
