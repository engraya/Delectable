const buckets = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const hits = buckets.get(key) ?? [];
  const recent = hits.filter((t) => now - t < windowMs);
  if (recent.length >= maxRequests) {
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  return true;
}

export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return headers.get("x-real-ip") ?? "unknown";
}
