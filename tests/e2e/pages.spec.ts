import { expect, test } from "@playwright/test";

const pages = [
  ["/pt/projetos", "/en/projects"],
  ["/pt/experiencia", "/en/experience"],
  ["/pt/servicos", "/en/services"],
  ["/pt/sobre", "/en/about"],
  ["/pt/contato", "/en/contact"],
  ["/pt/musica", "/en/music"],
  ["/pt/cv", "/en/cv"],
] as const;

test.describe("páginas", () => {
  for (const [pt, en] of pages) {
    test(`${pt} e ${en} respondem com título`, async ({ page }) => {
      for (const path of [pt, en]) {
        const res = await page.goto(path);
        expect(res?.status(), path).toBe(200);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      }
    });
  }

  test("trocar o idioma mantém a página atual", async ({ page }) => {
    await page.goto("/pt/servicos");
    // No mobile o seletor fica dentro do menu.
    const menu = page.getByRole("button", { name: "Menu" });
    if (await menu.isVisible()) await menu.click();
    await page.getByRole("button", { name: "English" }).filter({ visible: true }).first().click();
    await expect(page).toHaveURL(/\/en\/services$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("um case abre a partir da lista de projetos", async ({ page }) => {
    await page.goto("/pt/projetos");
    await page.getByRole("link", { name: "Personal Manager" }).first().click();
    await expect(page).toHaveURL(/\/pt\/projetos\/personal-manager$/);
    await expect(page.getByRole("heading", { level: 1, name: "Personal Manager" })).toBeVisible();
  });

  test("rota inexistente mostra a 404 'deploy falhou'", async ({ page }) => {
    const res = await page.goto("/pt/nao-existe");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Deploy falhou" })).toBeVisible();
  });
});

test.describe("formulário de contato", () => {
  test("valida no cliente e envia com a API mockada", async ({ page }) => {
    let payload: Record<string, unknown> | null = null;
    await page.route("**/api/contact", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 200, json: { ok: true } });
    });

    await page.goto("/pt/contato");
    await page.getByRole("button", { name: "Enviar mensagem" }).click();
    await expect(page.getByText("Informe seu nome.")).toBeVisible();
    expect(payload).toBeNull();

    await page.getByRole("textbox", { name: "Nome", exact: true }).fill("Maria Silva");
    await page.getByRole("textbox", { name: "E-mail", exact: true }).fill("maria@empresa.com");
    await page
      .getByRole("textbox", { name: "Mensagem", exact: true })
      .fill("Preciso de um sistema para minha academia.");
    await page.getByRole("button", { name: "Enviar mensagem" }).click();

    await expect(page.getByRole("status")).toContainText("Mensagem enviada");
    expect(payload).toMatchObject({ name: "Maria Silva", type: "projeto", locale: "pt" });
  });
});
