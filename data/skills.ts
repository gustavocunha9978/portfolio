import type { Localized } from "./types";

/**
 * Níveis honestos, sem barra de porcentagem.
 *
 * - `where`: slugs de cases (content/projects) ou ids de experiência (data/experience.ts)
 *   que comprovam o uso. Vira o "onde usei" no site. "production" sem prova visível
 *   aparece como "uso com frequência".
 * - `confirm: true`: nível ainda não confirmado pelo Gustavo. Aparece em dev, nunca em
 *   produção. Para publicar, confirme o nível e apague o `confirm`.
 */
export type SkillLevel = "production" | "frequent" | "learning";

export type Skill = {
  name: string;
  level: SkillLevel;
  where?: string[];
  confirm?: boolean;
};

export type SkillGroup = {
  id: string;
  title: Localized;
  highlight?: boolean;
  skills: Skill[];
};

export const skillLevelLabel: Record<SkillLevel, Localized> = {
  production: { pt: "uso em produção", en: "used in production" },
  frequent: { pt: "uso com frequência", en: "use often" },
  learning: { pt: "estudando", en: "learning" },
};

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: { pt: "Backend", en: "Backend" },
    skills: [
      { name: "Node.js", level: "production", where: ["personal-manager", "submita", "escalas-life"] },
      { name: "TypeScript", level: "production", where: ["personal-manager", "submita", "maschio-soares-advogados"] },
      { name: "Express", level: "production", where: ["personal-manager", "submita"] },
      { name: "REST APIs", level: "production", where: ["personal-manager", "submita", "migracao-rpa-python"] },
      { name: "WebSockets (Socket.io)", level: "production", where: ["personal-manager"] },
      { name: "Python", level: "production", where: ["contagem-pessoas-igreja", "migracao-rpa-python", "sicredi"] },
      { name: "FastAPI", level: "production", where: ["contagem-pessoas-igreja"] },
      { name: "PHP", level: "production", where: ["maschio-soares-advogados", "sicredi"] },
      { name: "C# / .NET", level: "frequent", confirm: true },
    ],
  },
  {
    id: "frontend",
    title: { pt: "Frontend", en: "Frontend" },
    skills: [
      { name: "React", level: "production", where: ["personal-manager", "contagem-pessoas-igreja", "orcamento-compartilhado"] },
      { name: "Next.js", level: "production", where: ["maschio-soares-advogados", "submita"] },
      { name: "Tailwind CSS", level: "production", where: ["maschio-soares-advogados", "broadcast"] },
      { name: "Vite", level: "production", where: ["contagem-pessoas-igreja", "orcamento-compartilhado", "escalas-life"] },
      { name: "WordPress (temas)", level: "production", where: ["maschio-soares-advogados"] },
      { name: "Vue", level: "learning" },
    ],
  },
  {
    id: "mobile",
    title: { pt: "Mobile", en: "Mobile" },
    skills: [
      { name: "React Native", level: "production", where: ["personal-manager"] },
      { name: "Expo / EAS", level: "production", where: ["personal-manager"] },
      { name: "PWA", level: "production", where: ["personal-manager"] },
      { name: "Flutter", level: "learning" },
    ],
  },
  {
    id: "dados",
    title: { pt: "Dados & BI", en: "Data & BI" },
    highlight: true,
    skills: [
      { name: "Power BI", level: "production", where: ["dashboard-bi"] },
      { name: "DAX", level: "frequent", where: ["dashboard-bi"] },
      { name: "SQL", level: "production", where: ["migracao-rpa-python", "contagem-pessoas-igreja", "sicredi"] },
      { name: "Pandas", level: "frequent", where: ["previsao-atoleiros"] },
      { name: "Recharts", level: "production", where: ["contagem-pessoas-igreja", "orcamento-compartilhado"] },
    ],
  },
  {
    id: "ia",
    title: { pt: "IA & Visão Computacional", en: "AI & Computer Vision" },
    skills: [
      { name: "YOLOv8", level: "production", where: ["contagem-pessoas-igreja"] },
      { name: "ByteTrack", level: "production", where: ["contagem-pessoas-igreja"] },
      { name: "OpenCV", level: "frequent", where: ["contagem-pessoas-igreja", "previsao-atoleiros"] },
      { name: "Gemini API", level: "production", where: ["personal-manager", "submita"] },
      { name: "TensorFlow / Keras", level: "frequent", where: ["previsao-atoleiros"] },
      { name: "OpenAI API", level: "frequent", confirm: true },
    ],
  },
  {
    id: "automacao",
    title: { pt: "Automação & RPA", en: "Automation & RPA" },
    skills: [
      { name: "Python (RPA)", level: "production", where: ["migracao-rpa-python", "sicredi"] },
      { name: "UiPath", level: "production", where: ["migracao-rpa-python", "sicredi"] },
      { name: "Selenium", level: "frequent", confirm: true },
      { name: "Web Scraping", level: "frequent", confirm: true },
    ],
  },
  {
    id: "devops",
    title: { pt: "DevOps & Infra", en: "DevOps & Infra" },
    skills: [
      { name: "Docker", level: "production", where: ["personal-manager", "submita", "escalas-life"] },
      { name: "GitHub Actions (CI/CD)", level: "production", where: ["personal-manager"] },
      { name: "Linux", level: "production", where: ["contagem-pessoas-igreja", "biopark"] },
      { name: "Traefik", level: "production", where: ["biopark"] },
      { name: "Vercel", level: "production", where: ["maschio-soares-advogados", "escalas-life"] },
      { name: "Railway", level: "production", where: ["personal-manager"] },
      { name: "Cloudflare Tunnel", level: "production", where: ["contagem-pessoas-igreja"] },
      { name: "RabbitMQ", level: "frequent", where: ["biopark"] },
      { name: "MinIO / S3", level: "production", where: ["submita", "biopark"] },
    ],
  },
  {
    id: "db",
    title: { pt: "Bancos de dados", en: "Databases" },
    skills: [
      { name: "PostgreSQL", level: "production", where: ["personal-manager", "contagem-pessoas-igreja", "escalas-life"] },
      { name: "Prisma", level: "production", where: ["personal-manager", "submita"] },
      { name: "Redis", level: "production", where: ["personal-manager"] },
      { name: "Firebase Firestore", level: "production", where: ["orcamento-compartilhado", "broadcast"] },
      { name: "MySQL", level: "frequent", confirm: true },
      { name: "Oracle / PL-SQL", level: "frequent", confirm: true },
    ],
  },
];
