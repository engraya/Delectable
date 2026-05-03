import DOMPurify from "dompurify";

const SAFE_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "a",
  "span",
  "h1",
  "h2",
  "h3",
  "h4",
];

const SAFE_ATTR = ["href", "title", "target", "rel", "class"];

export function sanitizeRecipeHtml(dirty: string | undefined): string {
  if (!dirty) return "";
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: SAFE_TAGS,
    ALLOWED_ATTR: SAFE_ATTR,
    ALLOW_DATA_ATTR: false,
  });
}
