import { describe, expect, it } from "vitest";
import { sanitizeRecipeHtml } from "@/shared/lib/sanitize";

describe("sanitizeRecipeHtml", () => {
  it("strips script tags", () => {
    const dirty = '<p>Hi</p><script>alert(1)</script>';
    expect(sanitizeRecipeHtml(dirty)).not.toContain("script");
  });

  it("allows safe tags", () => {
    const html = "<p><strong>Hello</strong></p>";
    expect(sanitizeRecipeHtml(html)).toContain("strong");
  });
});
