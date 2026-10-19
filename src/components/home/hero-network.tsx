/**
 * Variação A do hero: tecnologias como nós de uma rede, com "pacotes" trafegando.
 * SVG puro + SMIL/CSS — zero JavaScript no cliente.
 */
type Group = "backend" | "frontend" | "data" | "ai" | "infra";

const groupColor: Record<Group, string> = {
  backend: "var(--fg-brand)",
  frontend: "var(--fg-accent)",
  data: "var(--fg-warn)",
  ai: "var(--fg-brand)",
  infra: "var(--fg-accent)",
};

const nodes: { id: string; label: string; x: number; y: number; group: Group }[] = [
  { id: "node", label: "Node.js", x: 120, y: 84, group: "backend" },
  { id: "react", label: "React", x: 300, y: 48, group: "frontend" },
  { id: "next", label: "Next.js", x: 462, y: 96, group: "frontend" },
  { id: "rn", label: "React Native", x: 488, y: 214, group: "frontend" },
  { id: "pg", label: "PostgreSQL", x: 78, y: 214, group: "data" },
  { id: "bi", label: "Power BI", x: 104, y: 344, group: "data" },
  { id: "py", label: "Python", x: 452, y: 336, group: "backend" },
  { id: "yolo", label: "YOLOv8", x: 330, y: 420, group: "ai" },
  { id: "docker", label: "Docker", x: 196, y: 430, group: "infra" },
  { id: "prisma", label: "Prisma", x: 204, y: 150, group: "data" },
  { id: "rpa", label: "RPA", x: 380, y: 156, group: "ai" },
  { id: "php", label: "PHP", x: 520, y: 400, group: "backend" },
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

function pos(id: string) {
  const n = nodes.find((n) => n.id === id);
  return n ? { x: n.x, y: n.y } : center;
}

function pillWidth(label: string) {
  return Math.round(label.length * 7.4 + 30);
}

export function HeroNetwork({ label }: { label: string }) {
  const lines = [
    ...nodes.map((n) => ({ a: center, b: { x: n.x, y: n.y }, key: `c-${n.id}` })),
    ...edges.map(([a, b]) => ({ a: pos(a), b: pos(b), key: `${a}-${b}` })),
  ];

  return (
    <svg viewBox="0 0 580 480" role="img" aria-label={label} className="h-auto w-full">
      <defs>
        <linearGradient id="net-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--grad-from)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--grad-to)" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="net-core">
          <stop offset="0" stopColor="var(--grad-from)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--grad-to)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={center.x} cy={center.y} r="120" fill="url(#net-core)" />

      <g stroke="url(#net-edge)" strokeWidth="1">
        {lines.map(({ a, b, key }) => (
          <line key={key} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
        ))}
      </g>

      {/* Pacotes trafegando pelas conexões do núcleo. Somem com prefers-reduced-motion. */}
      <g className="motion-packet">
        {nodes.map((n, i) => (
          <circle key={n.id} r="2.6" fill={groupColor[n.group]}>
            <animateMotion
              dur={`${3 + (i % 4) * 0.9}s`}
              begin={`${(i * 0.37).toFixed(2)}s`}
              repeatCount="indefinite"
              path={
                i % 2 === 0
                  ? `M${center.x},${center.y} L${n.x},${n.y}`
                  : `M${n.x},${n.y} L${center.x},${center.y}`
              }
            />
          </circle>
        ))}
      </g>

      {nodes.map((n, i) => {
        const w = pillWidth(n.label);
        return (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            <g
              className="motion-safe:animate-float"
              style={{ animationDelay: `${-i * 0.8}s`, transformBox: "fill-box" }}
            >
              <rect
                x={-w / 2}
                y={-14}
                width={w}
                height={28}
                rx={14}
                fill="var(--surface-1)"
                stroke="var(--line-strong)"
              />
              <circle cx={-w / 2 + 13} cy={0} r={3} fill={groupColor[n.group]} />
              <text
                x={-w / 2 + 22}
                y={4}
                fill="var(--ink-1)"
                fontFamily="var(--font-mono)"
                fontSize="12"
              >
                {n.label}
              </text>
            </g>
          </g>
        );
      })}

      <g transform={`translate(${center.x} ${center.y})`}>
        <rect
          x={-34}
          y={-34}
          width={68}
          height={68}
          rx={18}
          fill="var(--surface-1)"
          stroke="url(#net-edge)"
          strokeWidth="1.5"
        />
        <text
          y={7}
          textAnchor="middle"
          fill="var(--ink-0)"
          fontFamily="var(--font-mono)"
          fontSize="20"
          fontWeight="600"
        >
          gc
        </text>
      </g>
    </svg>
  );
}
