import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
};

/** Seção com cabeçalho padrão. `kicker` aparece em mono, como um label de log. */
export function Section({ id, kicker, title, subtitle, className, children }: Props) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("py-16 sm:py-24", className)}
    >
      {(kicker || title) && (
        <header className="mb-10 max-w-2xl">
          {kicker && (
            <p className="mb-3 font-mono text-xs tracking-wider text-fg-brand uppercase">
              {kicker}
            </p>
          )}
          {title && (
            <h2
              id={headingId}
              className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
            >
              {title}
            </h2>
          )}
          {subtitle && <p className="mt-3 text-ink-1">{subtitle}</p>}
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
