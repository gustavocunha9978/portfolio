import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";

/** Classes de botão reutilizadas por <Link>, <a> e <button>. */
export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
    "disabled:pointer-events-none disabled:opacity-60",
    variant === "primary" &&
      "bg-brand-500 text-[#04130d] hover:bg-brand-400 light:bg-brand-700 light:text-white light:hover:bg-brand-600",
    variant === "secondary" &&
      "border border-line-strong bg-surface-1 text-ink-0 hover:border-fg-accent",
    variant === "ghost" && "text-ink-1 hover:bg-surface-2 hover:text-ink-0",
    className,
  );
}
