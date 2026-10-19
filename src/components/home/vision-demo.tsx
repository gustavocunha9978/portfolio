"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Referência ao projeto de contagem de pessoas: pessoas cruzam uma linha, caixas de
 * detecção as acompanham e a contagem usa a mesma ideia do sistema real — histerese
 * em volta de uma zona morta e lógica por track, não por frame.
 */
const W = 640;
const H = 340;
const LINE_X = 330;
const DEAD = 26; // meia-largura da zona morta
const PERIOD = 12; // segundos por ciclo

type Track = { id: number; y: number; conf: string; keys: [number, number][] };

const tracks: Track[] = [
  {
    id: 12,
    y: 238,
    conf: ".94",
    keys: [
      [0, -60],
      [6, 700],
    ],
  },
  // Para na porta e oscila dentro da zona morta: conta uma vez só.
  {
    id: 27,
    y: 206,
    conf: ".88",
    keys: [
      [2, -60],
      [5.4, 300],
      [6.2, 342],
      [6.9, 310],
      [7.6, 348],
      [10.6, 700],
    ],
  },
  {
    id: 31,
    y: 266,
    conf: ".91",
    keys: [
      [5, -60],
      [10.8, 700],
    ],
  },
  // Saída: atravessa da direita para a esquerda.
  {
    id: 42,
    y: 222,
    conf: ".90",
    keys: [
      [6.6, 700],
      [11.6, -60],
    ],
  },
];

function xAt(keys: [number, number][], t: number): number | null {
  const first = keys[0]!;
  const last = keys[keys.length - 1]!;
  if (t < first[0] || t > last[0]) return null;
  for (let i = 1; i < keys.length; i++) {
    const [t1, x1] = keys[i]!;
    const [t0, x0] = keys[i - 1]!;
    if (t <= t1) return x0 + ((x1 - x0) * (t - t0)) / (t1 - t0);
  }
  return null;
}

type Side = "left" | "right" | "dead";
const sideOf = (x: number): Side =>
  x < LINE_X - DEAD ? "left" : x > LINE_X + DEAD ? "right" : "dead";

type Labels = { entries: string; exits: string; camera: string; deadZone: string; label: string };

export function VisionDemo({ labels }: { labels: Labels }) {
  const reduced = useReducedMotion();
  const rootRef = useRef<SVGSVGElement>(null);
  const groups = useRef<(SVGGElement | null)[]>([]);
  const [counts, setCounts] = useState({ in: 3, out: 1 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    // Estado por track: último lado "firme" (fora da zona morta) e quando contou pela última vez.
    const state = tracks.map(() => ({ side: null as Side | null, lastCount: -Infinity }));
    let raf = 0;
    let start = 0;
    let running = false;
    let cycle = -1;
    let local = { in: 0, out: 0 };
    setCounts(local);

    const frame = (now: number) => {
      if (!start) start = now;
      const elapsed = (now - start) / 1000;
      const t = elapsed % PERIOD;
      const c = Math.floor(elapsed / PERIOD);
      if (c !== cycle) {
        cycle = c;
        state.forEach((s) => (s.side = null));
      }

      tracks.forEach((track, i) => {
        const g = groups.current[i];
        if (!g) return;
        const x = xAt(track.keys, t);
        if (x === null) {
          g.style.opacity = "0";
          return;
        }
        g.style.opacity = "1";
        g.setAttribute("transform", `translate(${x.toFixed(1)} ${track.y})`);

        const side = sideOf(x);
        const s = state[i]!;
        if (side !== "dead") {
          // Só conta quando sai firme de um lado para o outro (histerese) e fora do cooldown.
          if (s.side && s.side !== side && elapsed - s.lastCount > 2) {
            s.lastCount = elapsed;
            local =
              side === "right" ? { ...local, in: local.in + 1 } : { ...local, out: local.out + 1 };
            setCounts(local);
            g.dataset.counted = "1";
            window.setTimeout(() => delete g.dataset.counted, 900);
          }
          s.side = side;
        }
      });
      raf = requestAnimationFrame(frame);
    };

    // Só anima quando está visível na tela.
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!entry?.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
        start = 0;
      }
    });
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Quadro estático para prefers-reduced-motion / antes de hidratar.
  const staticX = [220, 336, 470, 140];

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface-1">
      <svg
        ref={rootRef}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={labels.label}
        className="block h-auto w-full"
      >
        <rect width={W} height={H} fill="var(--surface-2)" opacity="0.5" />
        {/* chão em perspectiva */}
        <g stroke="var(--line)" strokeWidth="1">
          {Array.from({ length: 7 }, (_, i) => (
            <line key={i} x1={0} y1={170 + i * 28} x2={W} y2={170 + i * 28} />
          ))}
        </g>

        {/* zona morta + linha de contagem */}
        <rect
          x={LINE_X - DEAD}
          y={60}
          width={DEAD * 2}
          height={H - 60}
          fill="var(--fg-warn)"
          opacity="0.12"
        />
        <line
          x1={LINE_X}
          y1={60}
          x2={LINE_X}
          y2={H}
          stroke="var(--fg-warn)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <text
          x={LINE_X + DEAD + 6}
          y={78}
          fill="var(--fg-warn)"
          fontFamily="var(--font-mono)"
          fontSize="11"
        >
          {labels.deadZone}
        </text>

        {tracks.map((track, i) => (
          <g
            key={track.id}
            ref={(el) => {
              groups.current[i] = el;
            }}
            transform={`translate(${staticX[i]} ${track.y})`}
            className="group/track"
          >
            <circle cx={0} cy={-40} r={9} fill="var(--ink-2)" opacity="0.55" />
            <rect
              x={-12}
              y={-29}
              width={24}
              height={44}
              rx={10}
              fill="var(--ink-2)"
              opacity="0.45"
            />
            <rect
              x={-22}
              y={-54}
              width={44}
              height={74}
              fill="none"
              strokeWidth="1.5"
              className="stroke-fg-accent transition-[stroke] duration-300 group-data-[counted]/track:stroke-fg-brand"
            />
            <rect
              x={-22}
              y={-70}
              width={104}
              height={16}
              className="fill-fg-accent transition-[fill] duration-300 group-data-[counted]/track:fill-fg-brand"
            />
            <text
              x={-18}
              y={-58}
              fill="var(--surface-0)"
              fontFamily="var(--font-mono)"
              fontSize="10"
              fontWeight="600"
            >
              #{track.id} person {track.conf}
            </text>
          </g>
        ))}

        {/* HUD da câmera */}
        <g fontFamily="var(--font-mono)" fontSize="12">
          <circle cx={22} cy={24} r={4} fill="#ef4444" className="motion-safe:animate-pulse" />
          <text x={34} y={28} fill="var(--ink-1)">
            {labels.camera}
          </text>
          <rect
            x={W - 262}
            y={12}
            width={248}
            height={28}
            rx={6}
            fill="var(--surface-1)"
            stroke="var(--line-strong)"
          />
          <text x={W - 250} y={31} fill="var(--fg-brand)">
            ▲ {labels.entries} {String(counts.in).padStart(3, "0")}
          </text>
          <text x={W - 112} y={31} fill="var(--ink-1)">
            ▼ {labels.exits} {String(counts.out).padStart(2, "0")}
          </text>
        </g>
        {/* cantos do enquadramento */}
        <g stroke="var(--ink-2)" strokeWidth="2" fill="none">
          <path d="M8 56 V48 H16" />
          <path d={`M${W - 8} 56 V48 H${W - 16}`} />
          <path d={`M8 ${H - 16} V${H - 8} H16`} />
          <path d={`M${W - 8} ${H - 16} V${H - 8} H${W - 16}`} />
        </g>
      </svg>
    </figure>
  );
}
