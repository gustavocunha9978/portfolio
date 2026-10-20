/**
 * Placeholders "TODO" marcam conteúdo que ainda depende do Gustavo.
 * Em desenvolvimento aparecem destacados para lembrar o que falta;
 * em produção não renderizam.
 */
export const SHOW_TODOS = process.env.NODE_ENV !== "production";

const TODO = /\bTODO\b/;

/** Trechos inline como "[TODO: métrica]" (podem quebrar linha). */
export const INLINE_TODO = /\s*\[TODO[^\]]*\]/g;

export function isTodo(value: unknown): value is string {
  return typeof value === "string" && TODO.test(value);
}

/** Devolve o valor, ou `undefined` se for TODO e os TODOs estiverem ocultos. */
export function keep<T>(value: T, show = SHOW_TODOS): T | undefined {
  return show || !isTodo(value) ? value : undefined;
}

/** Remove itens TODO de uma lista quando os TODOs estão ocultos. */
export function keepAll<T>(list: readonly T[], show = SHOW_TODOS): T[] {
  return list.filter((v) => show || !isTodo(v));
}
