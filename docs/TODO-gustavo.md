# O que depende de você

Em ordem de impacto. Tudo que está pendente aparece **destacado em amarelo** quando você roda
`npm run dev`, e **some sozinho em produção**. O CI falha se algum "TODO" escapar para o site.

## 1. Arquivos que faltam (maior impacto)

- [ ] **CV em PDF**: `public/cv/gustavo-cunha-cv-pt.pdf` e `gustavo-cunha-cv-en.pdf`.
      Enquanto não existirem, o botão "Baixar CV" fica escondido. Atalho: abra `/pt/cv` e
      `/en/cv` no navegador e use "Imprimir → Salvar como PDF"
- [ ] **Foto de perfil**: `public/images/profile.webp` (800×1000). Hoje aparece o monograma "GC"
- [ ] **Prints dos projetos**: ver `docs/prints-necessarios.md`. Comece pelo Personal Manager

## 2. Experiência (`data/experience.ts`)

Biopark e Benfatto estão **ocultos** no site até terem cargo e data.

- [ ] Sicredi: mês de início (`start: "AAAA-MM"`) e um resultado mensurável
- [ ] Biopark: cargo, início, fim. Confirme os 3 bullets e apague o `[TODO]` deles
- [ ] Benfatto: cargo, início, fim, 3–5 conquistas e stack
- [ ] Formação: instituição e ano de início
- [ ] Hackathon Biopark: colocação ou prêmio, se houve

## 3. Habilidades (`data/skills.ts`)

- [ ] **Power BI**: onde você usou de verdade? Hoje só o case de BI (rascunho) comprova, então
      em produção ele aparece como "uso com frequência". Adicione o id da experiência em `where`
      (ex.: `"benfatto"`) ou publique o case de BI
- [ ] **Traefik**: só a Biopark comprova, e ela está oculta. Mesmo caso acima
- [ ] Confirme o nível destes e apague o `confirm: true` (até lá não aparecem em produção):
      C# / .NET, Oracle / PL-SQL, MySQL, OpenAI API, Selenium, Web Scraping

## 4. Números dos cases (`content/projects/*.mdx`)

Os trechos `[TODO]` somem em produção; se a seção inteira ficar vazia, o título some junto.

- [ ] Personal Manager: métrica de impacto confirmada com o cliente
- [ ] Contagem de pessoas: período, precisão contra contagem manual, decisão tomada com os dados
- [ ] Migração RPA: período, status, nº de processos migrados ou tempo economizado
- [ ] Maschio & Soares: link de produção (`liveUrl`) e retorno do escritório
- [ ] Submita: colocação no hackathon, nº de artigos ou avaliadores
- [ ] Escalas Life: nº de voluntários e tempo economizado
- [ ] Previsão de atoleiros: acurácia/F1 e nota ou retorno da banca

## 5. Case de Power BI

- [ ] Montar o dashboard seguindo `docs/roteiro-dashboard-bi.md` e publicar (apagar `draft: true`)

## 6. Domínio

- [ ] Trocar o `portfolio-tau-kohl-48.vercel.app`: ver `docs/dominio.md`

## 7. Música

- [ ] IDs de vídeos do YouTube e fotos em `data/music.ts`. Sem eles, as seções ficam ocultas

## 8. Decisões

- [ ] Confirmar com o Sicredi se pode citar o nome da empresa. Se não, em `site.config.ts`
      mude `employer.showEmployerName` para `false`: o site passa a dizer "instituição financeira"
- [ ] Revisar os textos em inglês com alguém fluente
