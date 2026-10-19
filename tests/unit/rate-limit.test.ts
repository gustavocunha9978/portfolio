import { describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/rate-limit";

describe("createRateLimiter", () => {
  it("bloqueia após o limite e libera quando a janela expira", () => {
    const check = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(check("ip", 0).ok).toBe(true);
    expect(check("ip", 10).ok).toBe(true);
    const blocked = check("ip", 20);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterMs).toBe(980);
    expect(check("ip", 1000).ok).toBe(true);
  });

  it("conta cada chave separadamente", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(check("a", 0).ok).toBe(true);
    expect(check("b", 0).ok).toBe(true);
    expect(check("a", 1).ok).toBe(false);
  });
});
