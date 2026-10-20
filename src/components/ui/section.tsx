import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  /** Número da seção, ex.: "01". */
  index?: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Seção com cabeçalho editorial: à esquerda o número e o rótulo, à direita o título.
 * Abre com um filete de largura total, como a divisão de uma página impressa.
 */
export function Section({ id, index, kicker, title, subtitle, className, children }: Props) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("scroll-mt-20 border-t border-line py-16 sm:py-24", className)}
    >
      {(kicker || title) && (
        <header className="mb-12 grid gap-4 md:grid-cols-12">
          <p className="label-caps text-ink-2 md:col-span-3 md:pt-3">
            {index && <span className="text-fg-brand">{index}</span>}
            {index && kicker && <span aria-hidden="true"> — </span>}
            {kicker}
          </p>
          <div className="md:col-span-9">
            {title && (
              <h2
                id={headingId}
                className="max-w-3xl text-3xl font-medium tracking-[-0.03em] text-balance sm:text-5xl"
              >
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-4 max-w-xl text-ink-1">{subtitle}</p>}
          </div>
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
