/**
 * Rate limit simples em memória (janela fixa por chave).
 * Em serverless cada instância tem a própria memória — é uma barreira contra
 * spam casual, não contra ataque distribuído. Para isso: Upstash/Vercel KV.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function check(key: string, now = Date.now()) {
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      if (hits.size > 5000) {
        for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
      }
      return { ok: true, remaining: limit - 1, retryAfterMs: 0 };
    }
    if (entry.count >= limit) {
      return { ok: false, remaining: 0, retryAfterMs: entry.resetAt - now };
    }
    entry.count += 1;
    return { ok: true, remaining: limit - entry.count, retryAfterMs: 0 };
  };
}
