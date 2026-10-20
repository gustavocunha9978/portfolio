import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@/data": r("./data"),
      "@/site.config": r("./site.config.ts"),
      "@/messages": r("./messages"),
      "@": r("./src"),
      // "server-only" lança erro fora do runtime de React Server Components.
      "server-only": r("./tests/stubs/empty.ts"),
    },
  },
  test: {
    include: ["tests/unit/**/*.test.ts", "tests/build/**/*.test.ts"],
    environment: "node",
  },
});
