import { cn } from "@/lib/cn";
import { HandArrow } from "@/components/sketch/sketch";

type Props = {
  id?: string;
  /** Mantido por compatibilidade; o caderno não numera as seções. */
  index?: string;
  /** Anotação à caneta acima do título. */
  kicker?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
};

/** Seção do caderno: anotação à caneta com seta, título em serifa, texto curto. */
export function Section({ id, kicker, title, subtitle, className, children }: Props) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("scroll-mt-20 py-16 sm:py-24", className)}
    >
      {(kicker || title) && (
        <header className="mb-12 max-w-3xl">
          {kicker && (
            <p className="flex items-end gap-2 hand text-xl">
              {kicker}
              <HandArrow variant="down-right" className="w-10 translate-y-3" />
            </p>
          )}
          {title && (
            <h2
              id={headingId}
              className="mt-3 text-4xl font-medium tracking-[-0.025em] text-balance sm:text-5xl"
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-1">{subtitle}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}
