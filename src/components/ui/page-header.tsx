import { cn } from "@/lib/cn";

/**
 * Cabeçalho das páginas internas: título grande à esquerda, introdução numa coluna
 * estreita à direita (grade assimétrica), fechado por um filete.
 */
export function PageHeader({
  path,
  title,
  intro,
  children,
  className,
}: {
  /** Rótulo pequeno acima do título (ex.: "Índice", "Trajetória"). */
  path: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-line", className)}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-14 pb-12 sm:px-6 sm:pt-24 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="label-caps text-ink-2">{path}</p>
          <h1 className="mt-4 text-5xl font-medium tracking-[-0.045em] text-balance sm:text-7xl">
            {title}
          </h1>
        </div>
        {(intro || children) && (
          <div className="md:col-span-5 md:pb-2">
            {intro && <p className="leading-relaxed text-pretty text-ink-1">{intro}</p>}
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
