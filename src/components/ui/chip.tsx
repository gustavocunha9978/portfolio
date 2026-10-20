import { cn } from "@/lib/cn";

/** Etiqueta de stack: texto mono com filete, sem preenchimento. */
export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-line px-1.5 py-0.5 font-mono text-[0.72rem] leading-5 text-ink-1",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Stack como lista separada por barras: "Node.js / React / PostgreSQL". */
export function StackLine({ items, className }: { items: string[]; className?: string }) {
  return (
    <p className={cn("font-mono text-xs leading-relaxed text-ink-2", className)}>
      {items.map((s, i) => (
        // Espaço real entre os itens para a linha poder quebrar; cada item fica inteiro.
        <span key={s}>
          {i > 0 && (
            <span className="text-line-strong" aria-hidden="true">
              {" / "}
            </span>
          )}
          <span className="whitespace-nowrap">{s}</span>{" "}
        </span>
      ))}
    </p>
  );
}
