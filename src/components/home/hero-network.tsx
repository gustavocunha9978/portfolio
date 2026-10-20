/**
 * Hero: as tecnologias rabiscadas no caderno, ligadas a "eu" no centro.
 * Caixas e linhas levemente tortas (geradas de forma determinística, iguais a cada build),
 * marca-texto nas que mais uso. SVG puro: zero JavaScript no cliente.
 */
const nodes: { id: string; label: string; x: number; y: number }[] = [
  { id: "node", label: "Node.js", x: 108, y: 74 },
  { id: "react", label: "React", x: 292, y: 40 },
  { id: "next", label: "Next.js", x: 466, y: 82 },
  { id: "rn", label: "React Native", x: 486, y: 206 },
  { id: "pg", label: "PostgreSQL", x: 84, y: 210 },
  { id: "bi", label: "Power BI", x: 100, y: 346 },
  { id: "py", label: "Python", x: 446, y: 330 },
  { id: "php", label: "PHP", x: 520, y: 420 },
  { id: "yolo", label: "YOLOv8", x: 330, y: 438 },
  { id: "docker", label: "Docker", x: 182, y: 438 },
  { id: "prisma", label: "Prisma", x: 206, y: 148 },
  { id: "rpa", label: "RPA", x: 386, y: 148 },
];

const center = { x: 290, y: 262 };

const edges: [string, string][] = [
  ["node", "pg"],
  ["node", "prisma"],
  ["prisma", "pg"],
  ["react", "next"],
  ["next", "rn"],
  ["py", "yolo"],
  ["py", "rpa"],
  ["php", "rpa"],
  ["php", "py"],
  ["pg", "bi"],
  ["docker", "yolo"],
];

/** As que mais uso hoje levam marca-texto. */
const highlighted = new Set(["node", "react", "py", "php", "pg"]);

/** Ruído determinístico: mesma "mão" a cada build. */
function jitter(seed: number, amp = 1.6) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x) - 0.5) * 2 * amp;
}

/** Retângulo desenhado à mão: cantos e lados levemente tortos. */
function wobblyRect(cx: number, cy: number, w: number, h: number, seed: number) {
  const x0 = cx - w / 2;
  const y0 = cy - h / 2;
  const p = (dx: number, dy: number, k: number) =>
    `${(x0 + dx + jitter(seed + k)).toFixed(1)} ${(y0 + dy + jitter(seed + k + 0.5)).toFixed(1)}`;
  return `M${p(0, 0, 1)} Q${p(w / 2, -1, 2)} ${p(w, 0, 3)} Q${p(w + 1, h / 2, 4)} ${p(w, h, 5)} Q${p(w / 2, h + 1, 6)} ${p(0, h, 7)} Q${p(-1, h / 2, 8)} ${p(0.6, 0.8, 9)}`;
}

/** Linha de lápis com uma leve barriga. */
function pencil(a: { x: number; y: number }, b: { x: number; y: number }, seed: number) {
  const mx = (a.x + b.x) / 2 + jitter(seed, 9);
  const my = (a.y + b.y) / 2 + jitter(seed + 1, 9);
  return `M${a.x} ${a.y} Q${mx.toFixed(1)} ${my.toFixed(1)} ${b.x} ${b.y}`;
}

const pos = (id: string) => nodes.find((n) => n.id === id) ?? center;
const width = (label: string) => Math.round(label.length * 7.6 + 26);

export function HeroNetwork({ label, me }: { label: string; me: string }) {
  return (
    <svg viewBox="0 0 600 490" role="img" aria-label={label} className="h-auto w-full">
      <g fill="none" stroke="var(--ink-2)" strokeWidth="1.2" strokeLinecap="round">
        {nodes.map((n, i) => (
          <path key={`c-${n.id}`} d={pencil(center, n, i + 3)} strokeDasharray="2 6" />
        ))}
        {edges.map(([a, b], i) => (
          <path key={`${a}-${b}`} d={pencil(pos(a), pos(b), i + 40)} />
        ))}
      </g>

      {/* Pontinhos verdes trafegando. Somem com prefers-reduced-motion. */}
      <g className="motion-packet" fill="var(--fg-brand)">
        {nodes.slice(0, 8).map((n, i) => (
          <circle key={n.id} r="3">
            <animateMotion
              dur={`${3.2 + i * 0.45}s`}
              begin="0s"
              repeatCount="indefinite"
              path={i % 2 ? pencil(n, center, i + 3) : pencil(center, n, i + 3)}
            />
          </circle>
        ))}
      </g>

      {nodes.map((n, i) => {
        const w = width(n.label);
        const on = highlighted.has(n.id);
        return (
          <g key={n.id}>
            {on && (
              <path
                d={wobblyRect(n.x, n.y + 2, w - 6, 18, i * 7 + 100)}
                fill="var(--hl)"
                stroke="none"
              />
            )}
            <path
              d={wobblyRect(n.x, n.y, w, 28, i * 7)}
              fill={on ? "none" : "var(--surface-1)"}
              stroke="var(--ink-0)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <text
              x={n.x}
              y={n.y + 5}
              textAnchor="middle"
              fill="var(--ink-0)"
              fontFamily="var(--font-plex), sans-serif"
              fontSize="13"
              fontWeight="500"
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* "eu", circulado à caneta */}
      <g>
        <path
          d="M318 236 C 292 222, 252 230, 250 258 C 248 288, 300 298, 326 284 C 346 272, 340 240, 312 232 C 300 229, 288 230, 280 233"
          fill="none"
          stroke="var(--fg-accent)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <text
          x={center.x + 2}
          y={center.y + 11}
          textAnchor="middle"
          fill="var(--fg-accent)"
          fontFamily="var(--font-kalam), cursive"
          fontSize="32"
          fontWeight="700"
        >
          {me}
        </text>
      </g>
    </svg>
  );
}
