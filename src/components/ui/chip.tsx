import { cn } from "@/lib/cn";

/** Tag de stack em fonte mono. */
export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-surface-2/60 px-2 py-0.5 font-mono text-[0.72rem] leading-5 text-ink-1",
        className,
      )}
    >
      {children}
    </span>
  );
}
