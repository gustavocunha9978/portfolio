/** Junta classes condicionais. Sem dependência extra para algo tão pequeno. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
