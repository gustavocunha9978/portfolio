import type { Localized } from "./types";

/**
 * Timeline de /experiencia e fonte única do /cv.
 * Para adicionar um item: copie um objeto, ajuste os campos e mantenha a ordem
 * (mais recente primeiro). `end: null` = atual.
 */
export type ExperienceKind = "work" | "freelance" | "hackathon" | "education";

export type ExperienceItem = {
  id: string;
  kind: ExperienceKind;
  org: string;
  role: Localized;
  /** Formato AAAA-MM. Use "TODO" enquanto não souber. */
  start: string;
  end: string | null;
  location?: Localized;
  achievements: Localized<string[]>;
  stack: string[];
  /** Slug de um case em content/projects, se houver. */
  projectSlug?: string;
};

export const experience: ExperienceItem[] = [
  {
    id: "automacao-atual",
    kind: "work",
    // Confidencial: não citar a empresa enquanto não houver autorização.
    org: "[TODO: empresa atual ou 'Empresa do setor financeiro']",
    role: { pt: "[TODO: cargo] · Automação / RPA", en: "[TODO: title] · Automation / RPA" },
    start: "TODO",
    end: null,
    achievements: {
      pt: [
        "Migrei robôs UiPath (.xaml) para Python orientado a objetos, com DAOs, cliente de API e automação de sistema legado",
        "Mantive comportamento idêntico ao robô original: zero perda de regra de negócio no processo de concessão de crédito",
        "[TODO: resultado mensurável — ex.: tempo de execução, nº de processos migrados]",
      ],
      en: [
        "Migrated UiPath robots (.xaml) to object-oriented Python with DAOs, an API client and legacy-system automation",
        "Kept behavior identical to the original robot — no business rule lost in a credit-approval process",
        "[TODO: measurable result — e.g. runtime, number of processes migrated]",
      ],
    },
    stack: ["Python", "UiPath", "RPA", "SQL", "REST APIs"],
    projectSlug: "migracao-rpa-python",
  },
  {
    id: "personal-manager",
    kind: "freelance",
    org: "Personal Manager",
    role: { pt: "Desenvolvedor Fullstack", en: "Fullstack Developer" },
    start: "2026-07",
    end: null,
    achievements: {
      pt: [
        "Construí um SaaS multi-tenant com API, painel web, dois apps mobile e PWA de recepção",
        "Integrei pagamentos com Mercado Pago (PIX, cartão, assinaturas) com webhook assinado por HMAC",
        "Coloquei em produção numa academia com 100+ alunos ativos",
        "Auditei e corrigi isolamento entre tenants em endpoints de pagamento",
      ],
      en: [
        "Built a multi-tenant SaaS: API, web dashboard, two mobile apps and a reception PWA",
        "Integrated Mercado Pago payments (PIX, cards, subscriptions) with HMAC-signed webhooks",
        "Shipped to production at a gym with 100+ active members",
        "Audited and fixed cross-tenant isolation in payment endpoints",
      ],
    },
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "React", "React Native", "Docker"],
    projectSlug: "personal-manager",
  },
  {
    id: "maschio-soares",
    kind: "freelance",
    org: "Maschio & Soares Advogados",
    role: { pt: "Desenvolvedor Web", en: "Web Developer" },
    start: "2026-06",
    end: "2026-06",
    achievements: {
      pt: [
        "Entreguei o site institucional em Next.js + Tailwind v4 e depois como tema WordPress customizado, sem page builder",
      ],
      en: [
        "Delivered the firm's website in Next.js + Tailwind v4, later rebuilt as a custom WordPress theme with no page builder",
      ],
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "WordPress", "PHP"],
    projectSlug: "maschio-soares-advogados",
  },
  {
    id: "hackathon-biopark",
    kind: "hackathon",
    org: "Hackathon Biopark",
    role: { pt: "Desenvolvedor · integração com IA", en: "Developer · AI integration" },
    start: "2025-05",
    end: "2025-05",
    achievements: {
      pt: [
        "Integrei o Gemini para analisar PDFs de artigos científicos submetidos",
        "Montei o pipeline de upload: pasta observada → MinIO → análise por IA",
        "[TODO: colocação / premiação, se houver]",
      ],
      en: [
        "Integrated Gemini to analyze submitted scientific-paper PDFs",
        "Built the upload pipeline: watched folder → MinIO → AI analysis",
        "[TODO: placement / award, if any]",
      ],
    },
    stack: ["Node.js", "Express", "Prisma", "PostgreSQL", "Next.js", "Gemini", "MinIO", "Docker"],
    projectSlug: "submita",
  },
  {
    id: "biopark",
    kind: "work",
    org: "Biopark",
    role: { pt: "[TODO: cargo]", en: "[TODO: title]" },
    start: "TODO",
    end: "TODO",
    achievements: {
      pt: [
        "[TODO] Desenvolvi APIs em Node.js e interfaces em React sobre PostgreSQL",
        "[TODO] Administrei servidores Linux com Docker e Traefik como proxy reverso",
        "[TODO] Integrei armazenamento de arquivos com MinIO/S3 e filas com RabbitMQ",
      ],
      en: [
        "[TODO] Built Node.js APIs and React interfaces on top of PostgreSQL",
        "[TODO] Ran Linux servers with Docker and Traefik as reverse proxy",
        "[TODO] Integrated file storage with MinIO/S3 and queues with RabbitMQ",
      ],
    },
    stack: ["Node.js", "React", "PostgreSQL", "Docker", "Traefik", "MinIO", "AWS S3", "RabbitMQ", "Linux"],
  },
  {
    id: "benfatto",
    kind: "work",
    org: "Benfatto",
    role: { pt: "[TODO: cargo]", en: "[TODO: title]" },
    start: "TODO",
    end: "TODO",
    achievements: {
      pt: ["[TODO: 3–5 conquistas começando com verbo de ação]"],
      en: ["[TODO: 3–5 achievements starting with an action verb]"],
    },
    stack: ["[TODO]"],
  },
  {
    id: "formacao-ct",
    kind: "education",
    org: "[TODO: instituição]",
    role: { pt: "Bacharelado em Ciência e Tecnologia", en: "B.Sc. in Science and Technology" },
    start: "TODO",
    end: "2025-10", // inferido do repositório do TCC — confirmar
    achievements: {
      pt: [
        "TCC: previsão de atoleiros em estradas rurais com CNN sobre imagens de satélite e dados de chuva",
      ],
      en: [
        "Thesis: predicting mud traps on rural roads with a CNN over satellite imagery and rainfall data",
      ],
    },
    stack: ["Python", "TensorFlow", "OpenCV"],
    projectSlug: "previsao-atoleiros",
  },
];
