import { cn } from "@/lib/cn";
import { HandArrow } from "@/components/sketch/sketch";

/**
 * Cabeçalho das páginas internas: anotação à caneta, título grande em serifa,
 * introdução ao lado. Fecha com um traço de caneta, não com um filete técnico.
 */
export function PageHeader({
  path,
  title,
  intro,
  children,
  className,
}: {
  /** Anotação à caneta acima do título. */
  path: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn(className)}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-14 pb-10 sm:px-6 sm:pt-20 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="flex items-end gap-2 hand text-xl">
            {path}
            <HandArrow variant="down-right" className="w-10 translate-y-3" />
          </p>
          <h1 className="mt-3 text-5xl font-medium tracking-[-0.03em] text-balance sm:text-7xl">
            {title}
          </h1>
        </div>
        {(intro || children) && (
          <div className="md:col-span-5 md:pb-2">
            {intro && <p className="text-lg leading-relaxed text-pretty text-ink-1">{intro}</p>}
            {children}
          </div>
        )}
      </div>
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 12"
        preserveAspectRatio="none"
        className="mx-auto block h-3 w-[calc(100%-2rem)] max-w-6xl text-ink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M2 7 C 200 4, 420 9, 640 6 S 1000 4, 1198 7" />
      </svg>
    </header>
  );
}
