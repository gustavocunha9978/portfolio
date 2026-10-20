import { cn } from "@/lib/cn";

/** Disponibilidade como carimbo verde batido na folha. */
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
        "inline-flex -rotate-2 items-center gap-2 rounded-sm border-2 border-fg-brand px-2.5 py-1 text-xs font-semibold tracking-[0.12em] text-fg-brand uppercase",
        className,
      )}
    >
      <span
        className="size-2 rounded-full bg-fg-brand motion-safe:animate-pulse-dot"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
