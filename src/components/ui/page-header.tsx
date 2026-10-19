import { cn } from "@/lib/cn";

/** Cabeçalho das páginas internas, com o "caminho" em mono como num terminal. */
export function PageHeader({
  path,
  title,
  intro,
  children,
  className,
}: {
  path: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("relative isolate overflow-hidden border-b border-line", className)}>
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-12 sm:px-6 sm:pt-20">
        <p className="font-mono text-xs tracking-wider text-fg-brand">~{path}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-2xl leading-relaxed text-pretty text-ink-1">{intro}</p>}
        {children}
      </div>
    </header>
  );
}
