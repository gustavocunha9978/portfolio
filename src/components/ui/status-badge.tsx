import { cn } from "@/lib/cn";

/** Badge "● disponível para projetos" com ponto pulsando. */
export function StatusBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-surface-1/70 px-3 py-1 font-mono text-xs text-ink-1 backdrop-blur",
        className,
      )}
    >
      <span
        className="relative inline-block size-2 rounded-full bg-fg-brand motion-safe:animate-pulse-dot"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
