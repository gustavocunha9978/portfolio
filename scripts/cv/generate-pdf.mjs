/**
 * Gera public/cv/gustavo-cunha-cv-{pt,en}.pdf a partir da página /cv.
 *
 *   npm run build && npm run cv:pdf
 *
 * Usa o build de produção (sem TODOs) e o CSS de impressão da própria página,
 * então o PDF é sempre igual ao /cv do site. Rode de novo sempre que mudar
 * data/experience.ts ou data/skills.ts.
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { chromium } from "@playwright/test";

const PORT = 3456;
const base = `http://localhost:${PORT}`;
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: root, stdio: "ignore" });

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(`${base}/pt/cv`)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("servidor não subiu: rode `npm run build` antes");
}

try {
  await waitForServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const locale of ["pt", "en"]) {
    await page.goto(`${base}/${locale}/cv`, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print", colorScheme: "light" });
    const out = path.join(root, "public/cv", `gustavo-cunha-cv-${locale}.pdf`);
    await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
    console.log("✓", path.relative(root, out));
  }
  await browser.close();
} finally {
  server.kill();
}
