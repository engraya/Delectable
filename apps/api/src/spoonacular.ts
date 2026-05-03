import type { Env } from "./env.js";

const BASE = "https://api.spoonacular.com";

/** Thrown when fetch cannot connect (DNS, offline, firewall, etc.). */
export class SpoonacularNetworkError extends Error {
  readonly code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.name = "SpoonacularNetworkError";
    this.code = code;
  }
}

function isLikelyNetworkFailure(code: string | undefined): boolean {
  if (!code) return false;
  return [
    "EAI_AGAIN",
    "ENOTFOUND",
    "ETIMEDOUT",
    "ECONNREFUSED",
    "EHOSTUNREACH",
    "ENETUNREACH",
    "UND_ERR_CONNECT_TIMEOUT",
  ].includes(code);
}

export async function spoonacularFetch(
  env: Env,
  path: string,
  searchParams: Record<string, string | number | undefined>
): Promise<Response> {
  const params = new URLSearchParams();
  params.set("apiKey", env.SPOONACULAR_API_KEY);
  for (const [k, v] of Object.entries(searchParams)) {
    if (v !== undefined && v !== "") {
      params.set(k, String(v));
    }
  }
  const url = `${BASE}${path}?${params.toString()}`;
  try {
    return await fetch(url);
  } catch (e) {
    const err = e as NodeJS.ErrnoException & { cause?: { code?: string } };
    const code = err.code ?? err.cause?.code;
    if (isLikelyNetworkFailure(code)) {
      throw new SpoonacularNetworkError(
        "Cannot reach api.spoonacular.com (network or DNS issue). Check your internet, VPN, firewall, or DNS and try again.",
        code
      );
    }
    throw e;
  }
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
