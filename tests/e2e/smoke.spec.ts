import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
  test("a home carrega em português", async ({ page }) => {
    await page.goto("/pt");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("a home carrega em inglês", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("a raiz redireciona conforme o idioma do navegador", async ({ browser }) => {
    const ctx = await browser.newContext({ locale: "en-US" });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await ctx.close();
  });
});
