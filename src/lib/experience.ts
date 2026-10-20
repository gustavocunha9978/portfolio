import { experience, type ExperienceItem } from "@/data/experience";
import { isTodo, keepAll, SHOW_TODOS } from "./todo";

/**
 * Experiências prontas para renderizar.
 * Com TODOs ocultos (produção): item sem cargo e sem data some; campos e
 * conquistas ainda em TODO ficam vazios em vez de aparecer como placeholder.
 */
export function visibleExperience(show = SHOW_TODOS): ExperienceItem[] {
  if (show) return experience;
  return experience
    .filter((item) => !(isTodo(item.role.pt) && isTodo(item.start)))
    .map((item) => ({
      ...item,
      org: isTodo(item.org) ? "" : item.org,
      role: {
        pt: isTodo(item.role.pt) ? "" : item.role.pt,
        en: isTodo(item.role.en) ? "" : item.role.en,
      },
      start: isTodo(item.start) ? "" : item.start,
      end: isTodo(item.end) ? "" : item.end,
      achievements: {
        pt: keepAll(item.achievements.pt, false),
        en: keepAll(item.achievements.en, false),
      },
      stack: keepAll(item.stack, false),
    }));
}

/** "Cargo · Empresa", sem separador sobrando quando um dos dois falta. */
export function roleAndOrg(role: string, org: string) {
  return [role, org].filter(Boolean).join(" · ");
}
