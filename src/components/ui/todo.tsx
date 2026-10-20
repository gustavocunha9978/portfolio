import { isTodo, SHOW_TODOS } from "@/lib/todo";

/**
 * Renderiza um texto que pode ser placeholder.
 * Dev: TODO aparece marcado em amarelo. Produção: TODO não renderiza.
 */
export function Todo({ children }: { children?: string | null }) {
  if (!children) return null;
  if (!isTodo(children)) return <>{children}</>;
  if (!SHOW_TODOS) return null;
  return <mark className="todo-mark">{children}</mark>;
}
