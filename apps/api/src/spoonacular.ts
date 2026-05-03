import { fetch as undiciFetch, ProxyAgent } from "undici";
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
    "ECONNRESET",
    "UND_ERR_CONNECT_TIMEOUT",
  ].includes(code);
}

const TRANSIENT_RETRY = new Set([
  "EAI_AGAIN",
  "ENOTFOUND",
  "ETIMEDOUT",
  "ECONNRESET",
]);

let proxyDispatcher: ProxyAgent | undefined;
let proxyChecked = false;

function getProxyDispatcher(): ProxyAgent | undefined {
  if (proxyChecked) return proxyDispatcher;
  proxyChecked = true;
  const uri = process.env.HTTPS_PROXY ?? process.env.HTTP_PROXY;
  if (uri) {
    proxyDispatcher = new ProxyAgent(uri);
  }
  return proxyDispatcher;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getErrno(e: unknown): string | undefined {
  const err = e as NodeJS.ErrnoException & { cause?: { code?: string } };
  return err.code ?? err.cause?.code;
}

/**
 * Uses undici (same stack as Node fetch) with optional ProxyAgent when
 * HTTPS_PROXY / HTTP_PROXY is set — global fetch often ignores the Windows
 * system proxy, so explicit env is required on many corporate networks.
 */
async function outboundFetch(url: string): Promise<Response> {
  const dispatcher = getProxyDispatcher();
  const res = await undiciFetch(url, {
    ...(dispatcher ? { dispatcher } : {}),
    redirect: "follow",
  });
  return res as unknown as Response;
}

const MAX_SPOONACULAR_ATTEMPTS = 3;

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

  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_SPOONACULAR_ATTEMPTS; attempt++) {
    try {
      return await outboundFetch(url);
    } catch (e) {
      lastError = e;
      const code = getErrno(e);
      if (
        attempt < MAX_SPOONACULAR_ATTEMPTS &&
        code &&
        TRANSIENT_RETRY.has(code)
      ) {
        await sleep(350 * attempt + Math.floor(Math.random() * 250));
        continue;
      }
      if (isLikelyNetworkFailure(code)) {
        const usingProxy = Boolean(
          process.env.HTTPS_PROXY ?? process.env.HTTP_PROXY
        );
        const proxyHint = usingProxy
          ? " Proxy is set; verify HTTPS_PROXY and that the proxy allows api.spoonacular.com."
          : " If you use a corporate network, try setting HTTPS_PROXY (Node does not use the Windows system proxy by default).";
        throw new SpoonacularNetworkError(
          `Cannot reach api.spoonacular.com (network or DNS). Check internet, VPN, firewall, or try another DNS (e.g. 1.1.1.1).${proxyHint}`,
          code
        );
      }
      throw e;
    }
  }

  const code = getErrno(lastError);
  throw new SpoonacularNetworkError(
    `Cannot reach api.spoonacular.com after ${MAX_SPOONACULAR_ATTEMPTS} attempts.`,
    code
  );
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
