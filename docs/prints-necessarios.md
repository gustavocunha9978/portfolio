# Prints necessários

As capas atuais são ilustrações (SVG). Prints reais valem muito mais para recrutador e cliente.

## Regras para todos

- **Formato:** WebP, **1600×1000** (16:10), qualidade ~80
- **Dados:** só dados de seed/demo. Nada de nome, CPF, telefone, foto ou valor de cliente real
- **Telas de celular:** monte 2 ou 3 telas lado a lado num fundo neutro de 1600×1000
- **Onde salvar:** `public/images/projects/{slug}/`
- **Como ligar no case:** no `.pt.mdx` e no `.en.mdx` do projeto:

```yaml
cover: /images/projects/personal-manager/cover.webp
gallery:
  - src: /images/projects/personal-manager/recepcao.webp
    alt: PWA de recepção liberando a entrada de um aluno em dia
```

O `alt` da versão em inglês vai em inglês.

## Personal Manager (prioridade máxima)

Rode o script de seed da demo antes de printar.

| Arquivo           | Tela                                        | Mostra                                             |
| ----------------- | ------------------------------------------- | -------------------------------------------------- |
| `cover.webp`      | Painel web: saúde do negócio                | churn, ticket médio, LTV, faturamento 12 meses     |
| `recepcao.webp`   | PWA de recepção                             | leitura do QR com status verde, amarelo e vermelho |
| `apps.webp`       | App do aluno + app do personal, lado a lado | QR de acesso e treino do dia                       |
| `avaliacao.webp`  | Avaliação física                            | comparativo Pollock 7 dobras e evolução            |
| `dieta-ia.webp`   | Chat de dieta com Gemini                    | sugestão da IA aguardando aprovação do personal    |
| `pagamentos.webp` | Cobranças                                   | PIX, cartão e dinheiro na mesma lista              |

## Contagem de pessoas (igreja)

| Arquivo         | Tela                                               | Cuidado                                                  |
| --------------- | -------------------------------------------------- | -------------------------------------------------------- |
| `cover.webp`    | Dashboard: ocupação ao vivo e frequência por culto | sem nomes                                                |
| `deteccao.webp` | Frame da câmera com caixas e linha de contagem     | **desfoque rostos** ou use um vídeo de teste sem membros |

## Maschio & Soares Advogados

| Arquivo         | Tela                                                   |
| --------------- | ------------------------------------------------------ |
| `cover.webp`    | Home no desktop                                        |
| `mobile.webp`   | Home e página de área de atuação no celular            |
| `wp-admin.webp` | Painel WordPress mostrando que o cliente edita sozinho |

## Demais cases

| Case                      | `cover.webp`                                          |
| ------------------------- | ----------------------------------------------------- |
| `orcamento-compartilhado` | Dois celulares com o mesmo orçamento sincronizado     |
| `escalas-life`            | Escala do mês e tela de disponibilidade do voluntário |
| `submita`                 | Tela de avaliação com a análise do PDF pela IA        |
| `broadcast`               | Tela principal do app                                 |
| `previsao-atoleiros`      | Mapa/imagem de satélite com a previsão de risco       |
| `dashboard-bi`            | Ver `docs/roteiro-dashboard-bi.md`                    |
| `migracao-rpa-python`     | **Sem print**: é confidencial. Mantenha a ilustração  |

## Foto de perfil

`public/images/profile.webp`, **800×1000**, rosto bem iluminado, fundo simples.
Assim que o arquivo existir, a página Sobre troca o monograma "GC" pela foto.
