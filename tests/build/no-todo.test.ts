import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Roda depois de `npm run build`: nenhuma página gerada para produção pode
 * conter "TODO". Placeholders só aparecem em `npm run dev`.
 */
const APP_DIR = path.join(process.cwd(), ".next", "server", "app");

function htmlFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return htmlFiles(full);
    return e.name.endsWith(".html") ? [full] : [];
  });
}

const built = fs.existsSync(APP_DIR);

describe.runIf(built || process.env.REQUIRE_BUILD)("build de produção", () => {
  it("existe", () => {
    expect(built, "rode `npm run build` antes deste teste").toBe(true);
  });

  it('nenhuma página contém "TODO"', () => {
    const files = htmlFiles(APP_DIR);
    expect(files.length).toBeGreaterThan(0);
    const offenders = files
      .map((file) => {
        const html = fs.readFileSync(file, "utf8");
        const m = /.{0,60}\bTODO\b.{0,60}/s.exec(html);
        return m ? `${path.relative(APP_DIR, file)}: …${m[0].replace(/\s+/g, " ")}…` : null;
      })
      .filter(Boolean);
    expect(offenders).toEqual([]);
  });
});
