# Domínio do portfólio

Hoje o site responde em `portfolio-tau-kohl-48.vercel.app`, que parece endereço provisório.
Existem dois caminhos; o (b) é o recomendado.

## (a) Subdomínio melhor da Vercel (grátis, 2 minutos)

1. Na Vercel, abra o projeto **portfolio** → **Settings** → **Domains**
2. Clique em **Add** e digite, por exemplo, `gustavocunha.vercel.app`
   (se estiver ocupado, tente `gustavo-cunha.vercel.app` ou `gustavocunha-dev.vercel.app`)
3. Marque o novo como principal e configure o antigo para **redirecionar** para ele

Renomear o projeto em **Settings → General** muda só o nome; o endereço é definido em **Domains**.

## (b) Domínio próprio (recomendado, ~R$ 40/ano para `.com.br`)

Mesmo processo que você já fez no `personalmanager.com.br`:

1. Compre o domínio no **Registro.br** (ex.: `gustavocunha.com.br` ou `gustavocunha.dev.br`).
   `.dev` não é vendido no Registro.br; compre num registrador internacional se preferir
2. Na Vercel: **Settings** → **Domains** → **Add** → digite o domínio
3. A Vercel mostra o que configurar. Use os valores exatos que ela mostrar:
   - **Nameservers** (como no Personal Manager): no Registro.br, em **DNS** → **Alterar servidores DNS**,
     cole os servidores da Vercel
   - ou **registros A/CNAME**, se preferir manter o DNS no Registro.br
4. Adicione também o `www` e deixe um redirecionando para o outro
5. Espere a propagação (de minutos a algumas horas). O HTTPS é emitido automaticamente

## Depois de configurar

O site usa a variável `NEXT_PUBLIC_SITE_URL` para canonical, hreflang, sitemap, robots e
Open Graph. Na Vercel, em **Settings → Environment Variables**:

- **Defina** `NEXT_PUBLIC_SITE_URL=https://seudominio.com.br` (sem barra no final), ou
- **apague** a variável: o site passa a usar sozinho o domínio de produção da Vercel

Depois faça um **Redeploy** e confira `https://seudominio.com.br/sitemap.xml`.
Por fim, troque o link do portfólio no LinkedIn e no README do GitHub.
