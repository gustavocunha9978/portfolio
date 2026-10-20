import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";

/** Classes de botão reutilizadas por <Link>, <a> e <button>. Retangulares, sem sombra. */
export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors duration-200",
    "disabled:pointer-events-none disabled:opacity-60",
    variant === "primary" && "bg-ink-0 text-surface-0 hover:bg-fg-brand hover:text-on-brand",
    variant === "secondary" &&
      "border border-line-strong text-ink-0 hover:border-ink-0 hover:bg-ink-0 hover:text-surface-0",
    variant === "ghost" &&
      "px-0 text-ink-0 underline decoration-line-strong underline-offset-[6px] hover:decoration-fg-brand",
    className,
  );
}
