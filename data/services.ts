import type { Localized } from "./types";

export type Service = {
  id: string;
  icon: "app-window" | "smartphone" | "globe" | "bot" | "bar-chart-3" | "sparkles";
  title: Localized;
  problem: Localized;
  deliverables: Localized<string[]>;
  /** Prazo típico. Ajuste à sua realidade. */
  timeline: Localized;
  relatedProject?: string;
};

export const services: Service[] = [
  {
    id: "saas",
    icon: "app-window",
    title: { pt: "Sistemas web sob medida e SaaS", en: "Custom web systems & SaaS" },
    problem: {
      pt: "Planilhas e processos manuais que já não dão conta do volume do negócio.",
      en: "Spreadsheets and manual processes that can no longer keep up with the business.",
    },
    deliverables: {
      pt: ["Painel web com login e permissões", "API e banco de dados", "Pagamentos (PIX/cartão)", "Deploy e monitoramento"],
      en: ["Web dashboard with login and roles", "API and database", "Payments (PIX/cards)", "Deployment and monitoring"],
    },
    timeline: { pt: "6 a 12 semanas", en: "6–12 weeks" },
    relatedProject: "personal-manager",
  },
  {
    id: "mobile",
    icon: "smartphone",
    title: { pt: "Apps mobile", en: "Mobile apps" },
    problem: {
      pt: "Seu cliente precisa do serviço no bolso — com notificação, QR Code e acesso offline.",
      en: "Your customers need the service in their pocket — with push, QR codes and offline access.",
    },
    deliverables: {
      pt: ["App Android/iOS em React Native", "Notificações push", "Publicação na loja ou APK"],
      en: ["Android/iOS app in React Native", "Push notifications", "Store release or APK"],
    },
    timeline: { pt: "4 a 10 semanas", en: "4–10 weeks" },
    relatedProject: "personal-manager",
  },
  {
    id: "sites",
    icon: "globe",
    title: { pt: "Sites institucionais", en: "Business websites" },
    problem: {
      pt: "Um site lento ou desatualizado que não transmite a seriedade do seu trabalho.",
      en: "A slow or outdated website that doesn't reflect how serious your work is.",
    },
    deliverables: {
      pt: ["Next.js ou WordPress (tema próprio, sem page builder)", "SEO técnico", "Formulário de contato", "Painel para você editar"],
      en: ["Next.js or WordPress (custom theme, no page builder)", "Technical SEO", "Contact form", "Editing panel for you"],
    },
    timeline: { pt: "2 a 4 semanas", en: "2–4 weeks" },
    relatedProject: "maschio-soares-advogados",
  },
  {
    id: "automacao",
    icon: "bot",
    title: { pt: "Automação de processos", en: "Process automation" },
    problem: {
      pt: "Horas por semana perdidas copiando dados entre sistemas, sites e planilhas.",
      en: "Hours every week lost copying data between systems, websites and spreadsheets.",
    },
    deliverables: {
      pt: ["Robôs em Python ou RPA", "Web scraping", "Integração com sistemas legados", "Logs e alertas de falha"],
      en: ["Python or RPA robots", "Web scraping", "Legacy-system integration", "Logs and failure alerts"],
    },
    timeline: { pt: "1 a 4 semanas", en: "1–4 weeks" },
    relatedProject: "migracao-rpa-python",
  },
  {
    id: "bi",
    icon: "bar-chart-3",
    title: { pt: "Dashboards e BI", en: "Dashboards & BI" },
    problem: {
      pt: "Os dados existem, mas ninguém consegue tirar uma decisão deles.",
      en: "The data is there, but nobody can make a decision out of it.",
    },
    deliverables: {
      pt: ["Dashboards em Power BI", "Modelagem e DAX", "Atualização automática", "Indicadores definidos com você"],
      en: ["Power BI dashboards", "Data modeling and DAX", "Scheduled refresh", "KPIs defined together"],
    },
    timeline: { pt: "1 a 3 semanas", en: "1–3 weeks" },
  },
  {
    id: "ia",
    icon: "sparkles",
    title: { pt: "Integrações com IA", en: "AI integrations" },
    problem: {
      pt: "Tarefas repetitivas de leitura, contagem ou classificação que uma IA faz em segundos.",
      en: "Repetitive reading, counting or classification work an AI can do in seconds.",
    },
    deliverables: {
      pt: ["Chat e geração de conteúdo (Gemini/OpenAI)", "Visão computacional (YOLO)", "Revisão humana no fluxo", "Custo previsível"],
      en: ["Chat and content generation (Gemini/OpenAI)", "Computer vision (YOLO)", "Human review in the loop", "Predictable cost"],
    },
    timeline: { pt: "2 a 6 semanas", en: "2–6 weeks" },
    relatedProject: "contagem-pessoas-igreja",
  },
];
