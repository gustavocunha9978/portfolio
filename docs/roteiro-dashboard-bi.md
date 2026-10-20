# Roteiro: dashboard de Power BI para o portfólio

Objetivo: em **um fim de semana**, ter um relatório que prove Power BI na prática e
tirar o case `dashboard-bi` do modo rascunho.

## 1. Dados (sábado de manhã, ~2h)

Use dados **fictícios ou abertos**. Nunca dados do trabalho.

Opções, da mais fácil para a mais interessante:

1. **Vendas fictícias geradas por script** (recomendado). Um script Python com Faker (`pt_BR`)
   gerando 2 anos de vendas. Você controla sazonalidade e "problemas" para o relatório revelar,
   como uma loja que cai no 2º semestre. Publique o script no GitHub junto com o `.pbix`.
2. **Olist Brazilian E-Commerce** (Kaggle): pedidos reais anonimizados de e-commerce brasileiro,
   com várias tabelas. Ótimo para modelagem, mas tem mais limpeza.
3. **Portal Brasileiro de Dados Abertos** (dados.gov.br): menos "comercial", mas mostra que você
   lida com dado público e sujo.

Tabelas mínimas (opção 1):

| Tabela      | Colunas                                                                    |
| ----------- | -------------------------------------------------------------------------- |
| fVendas     | data, id_loja, id_produto, id_vendedor, quantidade, preco_unit, custo_unit |
| dLoja       | id_loja, nome, cidade, UF, regiao                                          |
| dProduto    | id_produto, nome, categoria, subcategoria                                  |
| dVendedor   | id_vendedor, nome, id_loja                                                 |
| dCalendario | gerada em DAX ou Power Query                                               |

## 2. Modelo (sábado à tarde, ~2h)

- Power Query: tipos corretos, colunas renomeadas, nada de coluna calculada que deveria ser medida
- Modelo estrela: relações 1:N das dimensões para `fVendas`, filtro em direção única
- `dCalendario` contínua, marcada como **tabela de datas**
- Tabela vazia `_Medidas` para organizar as medidas

## 3. As 8 medidas DAX

```DAX
Receita = SUMX(fVendas, fVendas[quantidade] * fVendas[preco_unit])
Custo = SUMX(fVendas, fVendas[quantidade] * fVendas[custo_unit])
Margem % = DIVIDE([Receita] - [Custo], [Receita])
Pedidos = COUNTROWS(fVendas)
Ticket Médio = DIVIDE([Receita], [Pedidos])
Receita AA = CALCULATE([Receita], SAMEPERIODLASTYEAR(dCalendario[Data]))
Var % AA = DIVIDE([Receita] - [Receita AA], [Receita AA])
Receita Acum. Ano = TOTALYTD([Receita], dCalendario[Data])
```

Bônus para entrevista: um ranking (`RANKX`) de lojas e uma medida com `CALCULATE` + `ALL`
para "% do total".

## 4. As 3 páginas (domingo, ~4h)

1. **Visão geral**: segmentações (ano, região, categoria), 4 cartões (Receita, Margem %,
   Ticket Médio, Var % AA), linha de receita vs. ano anterior, barras por categoria
2. **Lojas**: mapa ou barras por loja, matriz loja × mês com formatação condicional, ranking
3. **Produtos**: top 10 produtos, dispersão margem × volume, drill-through para o detalhe do produto

Use um tema com o verde e o azul do portfólio (`#0F7A4E`, `#1F4FBF`).

## 5. O que printar

Salve em `public/images/projects/dashboard-bi/`, **1600×1000, WebP**:

- `cover.webp`: página Visão geral inteira
- `modelo.webp`: tela de Modelo, mostrando o esquema estrela
- `lojas.webp`: página Lojas com a matriz
- `dax.webp`: editor com a medida `Var % AA` aberta

## 6. Publicar o case

No `content/projects/dashboard-bi.pt.mdx` e `.en.mdx`:

1. `cover: /images/projects/dashboard-bi/cover.webp` e preencha `gallery`
2. Troque os `[TODO]` de Resultado, Impacto e Aprendizados
3. Se publicar o `.pbix` e o script no GitHub, adicione `repoUrl`
4. Apague a linha `draft: true`

O serviço "Dashboards e BI" passa a linkar o case automaticamente.
