import type { Localized } from "./types";

/**
 * Níveis honestos, sem barra de porcentagem.
 * TODO(gustavo): níveis inferidos dos repositórios e do seu README de perfil — revise.
 */
export type SkillLevel = "production" | "frequent" | "learning";

export type SkillGroup = {
  id: string;
  title: Localized;
  highlight?: boolean;
  skills: { name: string; level: SkillLevel }[];
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
      { name: "Node.js", level: "production" },
      { name: "TypeScript", level: "production" },
      { name: "Express", level: "production" },
      { name: "REST APIs", level: "production" },
      { name: "WebSockets (Socket.io)", level: "production" },
      { name: "Python", level: "production" },
      { name: "FastAPI", level: "production" },
      { name: "PHP", level: "production" },
      { name: "C# / .NET", level: "frequent" },
    ],
  },
  {
    id: "frontend",
    title: { pt: "Frontend", en: "Frontend" },
    skills: [
      { name: "React", level: "production" },
      { name: "Next.js", level: "production" },
      { name: "Tailwind CSS", level: "production" },
      { name: "Vite", level: "production" },
      { name: "WordPress (temas)", level: "production" },
      { name: "Vue", level: "learning" },
    ],
  },
  {
    id: "mobile",
    title: { pt: "Mobile", en: "Mobile" },
    skills: [
      { name: "React Native", level: "production" },
      { name: "Expo / EAS", level: "production" },
      { name: "PWA", level: "production" },
      { name: "Flutter", level: "learning" },
    ],
  },
  {
    id: "dados",
    title: { pt: "Dados & BI", en: "Data & BI" },
    highlight: true,
    skills: [
      { name: "Power BI", level: "production" },
      { name: "DAX", level: "frequent" },
      { name: "SQL", level: "production" },
      { name: "Pandas", level: "frequent" },
      { name: "Recharts", level: "production" },
    ],
  },
  {
    id: "ia",
    title: { pt: "IA & Visão Computacional", en: "AI & Computer Vision" },
    skills: [
      { name: "YOLOv8", level: "production" },
      { name: "ByteTrack", level: "production" },
      { name: "OpenCV", level: "frequent" },
      { name: "Gemini API", level: "production" },
      { name: "TensorFlow / Keras", level: "frequent" },
      { name: "OpenAI API", level: "frequent" },
    ],
  },
  {
    id: "automacao",
    title: { pt: "Automação & RPA", en: "Automation & RPA" },
    skills: [
      { name: "Python (automação)", level: "production" },
      { name: "UiPath", level: "production" },
      { name: "PHP", level: "production" },
      { name: "Selenium", level: "frequent" },
      { name: "Web Scraping", level: "frequent" },
    ],
  },
  {
    id: "devops",
    title: { pt: "DevOps & Infra", en: "DevOps & Infra" },
    skills: [
      { name: "Docker", level: "production" },
      { name: "GitHub Actions (CI/CD)", level: "production" },
      { name: "Linux", level: "production" },
      { name: "Traefik", level: "production" },
      { name: "Vercel", level: "production" },
      { name: "Railway", level: "production" },
      { name: "Cloudflare Tunnel", level: "production" },
      { name: "RabbitMQ", level: "frequent" },
      { name: "MinIO / S3", level: "production" },
    ],
  },
  {
    id: "db",
    title: { pt: "Bancos de dados", en: "Databases" },
    skills: [
      { name: "PostgreSQL", level: "production" },
      { name: "Prisma", level: "production" },
      { name: "Redis", level: "production" },
      { name: "Firebase Firestore", level: "production" },
      { name: "MySQL", level: "frequent" },
      { name: "Oracle / PL-SQL", level: "frequent" },
    ],
  },
];
