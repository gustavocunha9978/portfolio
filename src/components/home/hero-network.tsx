/**
 * Hero: tecnologias como nós de um diagrama técnico, com "pacotes" trafegando.
 * Desenho de prancheta — filetes finos, nós retos, um único acento de cor.
 * SVG puro + SMIL/CSS: zero JavaScript no cliente.
 */
const nodes: { id: string; label: string; x: number; y: number }[] = [
  { id: "node", label: "Node.js", x: 112, y: 70 },
  { id: "react", label: "React", x: 300, y: 40 },
  { id: "next", label: "Next.js", x: 470, y: 86 },
  { id: "rn", label: "React Native", x: 482, y: 210 },
  { id: "pg", label: "PostgreSQL", x: 82, y: 206 },
  { id: "bi", label: "Power BI", x: 96, y: 342 },
  { id: "py", label: "Python", x: 446, y: 330 },
  { id: "php", label: "PHP", x: 520, y: 412 },
  { id: "yolo", label: "YOLOv8", x: 330, y: 432 },
  { id: "docker", label: "Docker", x: 186, y: 436 },
  { id: "prisma", label: "Prisma", x: 206, y: 148 },
  { id: "rpa", label: "RPA", x: 380, y: 152 },
];

const center = { x: 290, y: 258 };

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
  ["docker", "bi"],
];

/** Nós que mais uso em produção ganham o acento verde; o resto fica em tinta. */
const highlighted = new Set(["node", "react", "py", "php", "pg", "yolo"]);

function pos(id: string) {
  const n = nodes.find((n) => n.id === id);
  return n ? { x: n.x, y: n.y } : center;
}

function boxWidth(label: string) {
  return Math.round(label.length * 7.3 + 26);
}

export function HeroNetwork({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 590 480" role="img" aria-label={label} className="h-auto w-full">
      {/* linhas do núcleo: tracejadas; ligações entre tecnologias: contínuas */}
      <g stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 5">
        {nodes.map((n) => (
          <line key={`c-${n.id}`} x1={center.x} y1={center.y} x2={n.x} y2={n.y} />
        ))}
      </g>
      <g stroke="var(--line-strong)" strokeWidth="1">
        {edges.map(([a, b]) => {
          const p = pos(a);
          const q = pos(b);
          return <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} />;
        })}
      </g>

      {/* Pacotes trafegando. Somem com prefers-reduced-motion. */}
      <g className="motion-packet" fill="var(--fg-brand)">
        {nodes.map((n, i) => (
          <rect key={n.id} x={-2.5} y={-2.5} width={5} height={5}>
            <animateMotion
              dur={`${3.2 + (i % 4) * 0.9}s`}
              begin={`${(i * 0.41).toFixed(2)}s`}
              repeatCount="indefinite"
              path={
                i % 2 === 0
                  ? `M${center.x},${center.y} L${n.x},${n.y}`
                  : `M${n.x},${n.y} L${center.x},${center.y}`
              }
            />
          </rect>
        ))}
      </g>

      {nodes.map((n) => {
        const w = boxWidth(n.label);
        const on = highlighted.has(n.id);
        return (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            <rect
              x={-w / 2}
              y={-13}
              width={w}
              height={26}
              fill="var(--surface-0)"
              stroke={on ? "var(--ink-0)" : "var(--line-strong)"}
            />
            {on && <rect x={-w / 2} y={-13} width={3} height={26} fill="var(--fg-brand)" />}
            <text
              x={0}
              y={4}
              textAnchor="middle"
              fill={on ? "var(--ink-0)" : "var(--ink-1)"}
              fontFamily="var(--font-mono)"
              fontSize="11.5"
            >
              {n.label}
            </text>
          </g>
        );
      })}

      <g transform={`translate(${center.x} ${center.y})`}>
        <rect x={-36} y={-36} width={72} height={72} fill="var(--ink-0)" />
        <text
          y={8}
          textAnchor="middle"
          fill="var(--surface-0)"
          fontFamily="var(--font-display)"
          fontSize="24"
          fontWeight="600"
          letterSpacing="-1"
        >
          GC
        </text>
      </g>

      {/* marcas de registro nos cantos, como numa prancha */}
      <g stroke="var(--ink-2)" strokeWidth="1" fill="none">
        <path d="M4 16V4H16" />
        <path d="M586 16V4H574" />
        <path d="M4 464V476H16" />
        <path d="M586 464V476H574" />
      </g>
    </svg>
  );
}
