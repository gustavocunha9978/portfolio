import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const paths = [
  "/pt",
  "/en",
  "/pt/projetos",
  "/pt/projetos/personal-manager",
  "/en/projects/contagem-pessoas-igreja",
  "/pt/experiencia",
  "/pt/servicos",
  "/pt/sobre",
  "/pt/contato",
  "/pt/musica",
  "/pt/cv",
];

test.describe("acessibilidade (axe, WCAG 2.2 A/AA)", () => {
  // Uma passada basta: o layout mobile é coberto pelos outros testes.
  test.skip(({ isMobile }) => isMobile, "só desktop");

  for (const scheme of ["dark", "light"] as const) {
    for (const path of paths) {
      test(`${path} · ${scheme}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
        await page.goto(path);
        await page.waitForLoadState("networkidle");

        const { violations } = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();

        const report = violations.map(
          (v) =>
            `${v.id} (${v.impact}): ${v.nodes
              .map((n) => n.target.join(" "))
              .slice(0, 3)
              .join(" | ")}`,
        );
        expect(report, report.join("\n")).toEqual([]);
      });
    }
  }
});
