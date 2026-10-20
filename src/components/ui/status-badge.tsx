import { cn } from "@/lib/cn";

/** "■ Disponível para projetos" — um quadradinho verde e texto, sem pílula. */
export function StatusBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 label-caps text-ink-1", className)}>
      <span
        className="inline-block size-2 bg-fg-brand motion-safe:animate-pulse-dot"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
