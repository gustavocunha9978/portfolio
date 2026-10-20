import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * Classes de botão reutilizadas por <Link>, <a> e <button>.
 * Primário: bloco em tinta com sombra dura que "afunda" no clique, como papel sobre papel.
 */
export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[0.95rem] font-medium transition-[transform,box-shadow,background-color,color] duration-150",
    "disabled:pointer-events-none disabled:opacity-60",
    variant === "primary" &&
      "border-[1.5px] border-ink-0 bg-ink-0 text-surface-0 shadow-[3px_3px_0_var(--fg-brand)] hover:-translate-y-px hover:shadow-[4px_4px_0_var(--fg-brand)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    variant === "secondary" &&
      "border-[1.5px] border-ink-0 bg-surface-1 text-ink-0 shadow-paper hover:-translate-y-px active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    variant === "ghost" &&
      "px-0 text-ink-0 underline decoration-fg-accent decoration-wavy decoration-[1.5px] underline-offset-[6px] hover:text-fg-accent",
    className,
  );
}
