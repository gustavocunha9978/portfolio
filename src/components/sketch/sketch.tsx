import { cn } from "@/lib/cn";

/*
 * Elementos "de caderno": setas desenhadas, anotações à caneta, carimbos, fita adesiva.
 * Tudo SVG/CSS estático: zero JavaScript no cliente.
 */

const arrowPaths = {
  // curva para baixo, terminando à esquerda
  "down-left": {
    viewBox: "0 0 70 60",
    line: "M62 4 C 58 22, 44 40, 12 50",
    head: "M22 42 L 11 50.5 L 24 55",
  },
  // curva para baixo, terminando à direita
  "down-right": {
    viewBox: "0 0 70 60",
    line: "M8 4 C 12 22, 26 40, 58 50",
    head: "M48 42 L 59 50.5 L 46 55",
  },
  // para a direita, com uma barriga
  right: {
    viewBox: "0 0 90 34",
    line: "M4 22 C 24 6, 52 6, 82 18",
    head: "M71 9 L 83 18.5 L 70 26",
  },
  // para a esquerda, com uma barriga
  left: {
    viewBox: "0 0 90 34",
    line: "M86 22 C 66 6, 38 6, 8 18",
    head: "M19 9 L 7 18.5 L 20 26",
  },
  // para cima e à direita
  "up-right": {
    viewBox: "0 0 60 60",
    line: "M6 54 C 10 34, 26 16, 50 8",
    head: "M38 5 L 51 7.5 L 45 19",
  },
} as const;

export type ArrowVariant = keyof typeof arrowPaths;

/** Seta desenhada à caneta. Decorativa: sempre aria-hidden. */
export function HandArrow({ variant, className }: { variant: ArrowVariant; className?: string }) {
  const a = arrowPaths[variant];
  return (
    <svg
      viewBox={a.viewBox}
      aria-hidden="true"
      className={cn("inline-block h-auto text-fg-accent", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={a.line} />
      <path d={a.head} />
    </svg>
  );
}

/** Anotação à caneta na margem. */
export function Note({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("hand text-lg sm:text-xl", className)}>{children}</span>;
}

/** Carimbo de status, levemente torto, como se tivesse sido batido na folha. */
export function Stamp({
  children,
  tone = "brand",
  className,
}: {
  children: React.ReactNode;
  tone?: "brand" | "accent" | "warn";
  className?: string;
}) {
  const color = { brand: "text-fg-brand", accent: "text-fg-accent", warn: "text-fg-warn" }[tone];
  return (
    <span
      className={cn(
        "inline-flex -rotate-3 items-center gap-1.5 rounded-sm border-2 border-current px-2 py-0.5 text-[0.7rem] font-semibold tracking-[0.12em] uppercase",
        color,
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Pedaço de fita adesiva. */
function Tape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-10 h-6 w-20 bg-[var(--tape)] backdrop-blur-[1px]",
        className,
      )}
    />
  );
}

/** Imagem/print "colado" na página: borda em tinta, sombra dura, fita nos cantos. */
export function Taped({
  children,
  tilt = 0,
  className,
}: {
  children: React.ReactNode;
  /** Inclinação em graus (pequena: −1.5 a 1.5). */
  tilt?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative border-[1.5px] border-ink-0 bg-surface-1 shadow-paper", className)}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <Tape className="-top-3 left-6 -rotate-6" />
      <Tape className="-top-3 right-6 rotate-3" />
      {children}
    </div>
  );
}

/** Número/palavra circulado à caneta. */
export function Circled({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-block px-[0.18em]", className)}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 60"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-[0.28em] -inset-y-[0.22em] h-[calc(100%+0.44em)] w-[calc(100%+0.56em)] text-fg-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <path d="M70 6 C 30 2, 4 12, 6 32 C 8 52, 52 58, 88 52 C 116 46, 120 22, 98 10 C 84 3, 62 3, 46 7" />
      </svg>
    </span>
  );
}

/** Visto (✓) desenhado à mão. */
export function HandCheck({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("inline-block size-4 shrink-0 text-fg-brand", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 13.5 C 6 15, 8 17.5, 9.5 20 C 12 13, 16 7.5, 21 3.5" />
    </svg>
  );
}
