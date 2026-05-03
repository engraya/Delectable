import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Env } from "./env.js";

export type GeminiGenerateOptions = {
  /** Model system / developer instruction (Gemini systemInstruction). */
  systemInstruction: string;
  /** Single user turn (includes any embedded conversation history). */
  userText: string;
  maxOutputTokens?: number;
  temperature?: number;
};

/** Low-level connection failure (DNS, TLS, firewall, proxy, offline). */
export class GeminiNetworkError extends Error {
  readonly code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.name = "GeminiNetworkError";
    this.code = code;
  }
}

function collectErrorChain(err: unknown, maxDepth = 6): string[] {
  const lines: string[] = [];
  let cur: unknown = err;
  let depth = 0;
  while (cur != null && depth < maxDepth) {
    if (cur instanceof Error) {
      lines.push(cur.message);
      cur = (cur as Error & { cause?: unknown }).cause;
    } else if (typeof cur === "object" && cur !== null && "message" in cur) {
      lines.push(String((cur as { message: unknown }).message));
      cur =
        "cause" in cur
          ? (cur as { cause?: unknown }).cause
          : undefined;
    } else {
      lines.push(String(cur));
      break;
    }
    depth++;
  }
  return lines;
}

function errnoFromChain(err: unknown): string | undefined {
  let cur: unknown = err;
  let depth = 0;
  while (cur != null && depth < 8) {
    if (typeof cur === "object" && cur !== null && "code" in cur) {
      const code = (cur as { code?: unknown }).code;
      if (typeof code === "string") return code;
    }
    if (cur instanceof Error) {
      cur = (cur as Error & { cause?: unknown }).cause;
    } else {
      break;
    }
    depth++;
  }
  return undefined;
}

function isLikelyTransportFailure(messages: string[], errno?: string): boolean {
  const joined = messages.join(" ").toLowerCase();
  if (
    joined.includes("fetch failed") ||
    joined.includes("network") ||
    joined.includes("econnreset") ||
    joined.includes("socket") ||
    joined.includes("certificate") ||
    joined.includes("ssl") ||
    joined.includes("tls")
  ) {
    return true;
  }
  if (
    errno &&
    [
      "EAI_AGAIN",
      "ENOTFOUND",
      "ECONNREFUSED",
      "ECONNRESET",
      "ETIMEDOUT",
      "EHOSTUNREACH",
      "ENETUNREACH",
      "UND_ERR_CONNECT_TIMEOUT",
      "CERT_HAS_EXPIRED",
      "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
    ].includes(errno)
  ) {
    return true;
  }
  return false;
}

export async function geminiGenerate(
  env: Env,
  options: GeminiGenerateOptions
): Promise<string> {
  if (!env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: env.GEMINI_MODEL,
    systemInstruction: options.systemInstruction,
    generationConfig: {
      maxOutputTokens: options.maxOutputTokens ?? 1024,
      temperature: options.temperature ?? 0.4,
    },
  });

  try {
    const result = await model.generateContent(options.userText);
    const text = result.response.text();
    if (!text?.trim()) {
      throw new Error("Empty Gemini completion");
    }
    return text;
  } catch (e) {
    const chain = collectErrorChain(e);
    const errno = errnoFromChain(e);
    const detail = chain.filter(Boolean).join(" → ");

    if (isLikelyTransportFailure(chain, errno)) {
      throw new GeminiNetworkError(
        [
          "Cannot reach Google Gemini (generativelanguage.googleapis.com).",
          "Check: internet connection, VPN, firewall, corporate proxy.",
          "If you use a proxy, set HTTPS_PROXY (and NO_PROXY for localhost).",
          "Try GEMINI_MODEL=gemini-1.5-flash if the model endpoint is blocked in your region.",
          errno ? `System code: ${errno}.` : "",
          detail ? `Detail: ${detail.slice(0, 400)}` : "",
        ]
          .filter(Boolean)
          .join(" "),
        errno
      );
    }

    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(`Gemini error: ${msg.slice(0, 500)}${detail ? ` (${detail.slice(0, 200)})` : ""}`);
  }
}
