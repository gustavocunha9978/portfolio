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
    id: "sicredi",
    kind: "work",
    org: "Sicredi",
    role: { pt: "Desenvolvedor RPA", en: "RPA Developer" },
    start: "2026-07",
    end: null,
    // O case "migracao-rpa-python" é anônimo de propósito: não linkar este item a ele.
    achievements: {
      pt: [
        "Desenvolvo e mantenho automações de processos em Python e PHP",
        "Migro robôs UiPath (.xaml) para Python orientado a objetos, com DAOs, cliente de API e automação de sistema legado, preservando as regras de negócio",
        "[TODO: resultado mensurável — ex.: nº de processos automatizados, horas economizadas]",
      ],
      en: [
        "Build and maintain process automations in Python and PHP",
        "Migrate UiPath robots (.xaml) to object-oriented Python with DAOs, an API client and legacy-system automation, preserving business rules",
        "[TODO: measurable result — e.g. processes automated, hours saved]",
      ],
    },
    stack: ["Python", "PHP", "UiPath", "RPA", "SQL", "REST APIs"],
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
    stack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "React",
      "React Native",
      "Docker",
    ],
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
    id: "benfatto",
    kind: "work",
    org: "Benfatto",
    role: { pt: "Desenvolvedor Backend", en: "Backend Developer" },
    start: "2025-05",
    end: "2026-05",
    achievements: {
      pt: [
        "Desenvolvi e evoluí módulos de um ERP corporativo de logística, rastreamento de cargas e operações aduaneiras",
        "Implementei regras de negócio em Oracle PL/SQL: packages, procedures, functions e triggers",
        "Otimizei consultas SQL sobre grandes volumes de dados, analisando planos de execução",
        "Criei APIs de integração entre sistemas internos e externos",
        "Investiguei e corrigi incidentes em produção a partir de logs e do rastreamento do fluxo transacional",
      ],
      en: [
        "Built and evolved modules of a corporate ERP for logistics, cargo tracking and customs operations",
        "Implemented business rules in Oracle PL/SQL: packages, procedures, functions and triggers",
        "Tuned SQL queries over large data volumes by analyzing execution plans",
        "Built APIs integrating internal and external systems",
        "Investigated and fixed production incidents using logs and transaction-flow tracing",
      ],
    },
    stack: ["Oracle PL/SQL", "SQL", "REST APIs", "Git", "CI/CD"],
  },
  {
    id: "biopark",
    kind: "work",
    org: "Biopark",
    role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    start: "2024-06",
    end: "2025-05",
    achievements: {
      pt: [
        "Desenvolvi aplicações web com Node.js, React e TypeScript, incluindo um sistema de chamados internos e uma plataforma de feedback anônimo integrada à gestão do Biopark",
        "Conteinerizei aplicações com Docker e gerenciei os ambientes com Traefik como proxy reverso",
        "Administrei a infraestrutura: servidores físicos e virtuais, redes e segurança",
        "Gerenciei bancos PostgreSQL e MySQL: modelagem, índices, otimização e migrações",
        "Construí dashboards em Power BI",
      ],
      en: [
        "Built web applications with Node.js, React and TypeScript, including an internal ticketing system and an anonymous feedback platform integrated with Biopark's management system",
        "Containerized applications with Docker and managed environments with Traefik as reverse proxy",
        "Ran the infrastructure: physical and virtual servers, networking and security",
        "Managed PostgreSQL and MySQL databases: modeling, indexes, tuning and migrations",
        "Built Power BI dashboards",
      ],
    },
    stack: [
      "Node.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "Traefik",
      "Linux",
      "Power BI",
    ],
  },
  {
    id: "ruralway",
    kind: "hackathon",
    org: "RuralWay",
    role: {
      pt: "Desenvolvedor Full Stack · hackathon premiado",
      en: "Full Stack Developer · award-winning hackathon",
    },
    start: "2024",
    end: "2024",
    achievements: {
      pt: [
        "Solução de logística rural premiada em hackathon",
        "Integrei um app offline para motoristas a uma plataforma web de gestão, com sincronização de dados em áreas de pouca conectividade",
      ],
      en: [
        "Rural logistics solution that won an award at a hackathon",
        "Connected an offline driver app to a web management platform, syncing data in low-connectivity areas",
      ],
    },
    stack: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "viacao-sorriso",
    kind: "work",
    org: "Viação Sorriso de Toledo",
    role: { pt: "Auxiliar de TI", en: "IT Assistant" },
    start: "2022-10",
    end: "2024-06",
    achievements: {
      pt: [
        "Dei suporte técnico a usuários e mantive hardware e software",
        "Administrei redes, backups e sistemas, e monitorei a infraestrutura da empresa",
        "Desenvolvi um sistema de controle de ativos de TI com estoque, movimentações e notificações automáticas",
        "Comecei como aprendiz no monitoramento de câmeras e operações de tráfego (jan 2021 – out 2022)",
      ],
      en: [
        "Provided user support and maintained hardware and software",
        "Ran networks, backups and systems, and monitored the company's infrastructure",
        "Built an IT asset management system with inventory, movement tracking and automatic notifications",
        "Started as an apprentice monitoring cameras and traffic operations (Jan 2021 – Oct 2022)",
      ],
    },
    stack: ["Linux", "Hardware"],
  },
  {
    id: "formacao-ct",
    kind: "education",
    org: "Biopark",
    role: { pt: "Bacharelado em Ciência e Tecnologia", en: "B.Sc. in Science and Technology" },
    start: "TODO",
    end: "2025-10",
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
  {
    id: "cursos",
    kind: "education",
    org: "Rocketseat · Udemy · Curso em Vídeo",
    role: { pt: "Cursos complementares", en: "Additional courses" },
    start: "",
    end: "",
    achievements: {
      pt: [
        "Node.js, React e Inteligência Artificial (Rocketseat)",
        "Docker, Traefik, DevOps e SRE (Udemy)",
        "MySQL, hardware e informática (Curso em Vídeo / WIT)",
      ],
      en: [
        "Node.js, React and Artificial Intelligence (Rocketseat)",
        "Docker, Traefik, DevOps and SRE (Udemy)",
        "MySQL, hardware and IT fundamentals (Curso em Vídeo / WIT)",
      ],
    },
    stack: [],
  },
];
