/**
 * Gera as capas ilustrativas dos projetos em public/images/projects/{slug}/cover.svg.
 *
 *   node scripts/covers/generate.mjs
 *
 * São ilustrações (não prints): nenhum dado real ou número inventado aparece —
 * onde haveria dados, há barras/linhas "skeleton". Para trocar por um print real,
 * salve a imagem em public/images/projects/{slug}/ e aponte o `cover` do MDX para ela.
 */
import fs from "node:fs";
import path from "node:path";

const W = 1600;
const H = 900;
const C = {
  bg: "#0B1220",
  s1: "#101A2C",
  s2: "#16233A",
  s3: "#1C2B46",
  line: "#22324D",
  line2: "#2E4366",
  ink0: "#E8EEF7",
  ink1: "#B6C2D4",
  ink2: "#8796AD",
  ink3: "#4A5B78",
  green: "#34D399",
  green2: "#10B981",
  blue: "#38BDF8",
  blue2: "#2563EB",
  amber: "#FBBF24",
  red: "#F87171",
  violet: "#A78BFA",
};
const SANS = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const MONO = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function attrs(o) {
  return Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}="${v}"`)
    .join(" ");
}
const rect = (x, y, w, h, o = {}) => `<rect ${attrs({ x, y, width: w, height: h, ...o })}/>`;
const circle = (cx, cy, r, o = {}) => `<circle ${attrs({ cx, cy, r, ...o })}/>`;
const line = (x1, y1, x2, y2, o = {}) => `<line ${attrs({ x1, y1, x2, y2, ...o })}/>`;
const pathEl = (d, o = {}) => `<path ${attrs({ d, ...o })}/>`;
function text(x, y, str, o = {}) {
  const { size = 16, fill = C.ink1, weight = 400, font = SANS, anchor = "start", ...rest } = o;
  return `<text ${attrs({ x, y, fill, fontSize: size, fontWeight: weight, fontFamily: font, textAnchor: anchor, ...rest })}>${esc(str)}</text>`;
}
const g = (inner, o = {}) => `<g ${attrs(o)}>${inner}</g>`;

/** Gerador pseudo-aleatório determinístico (as capas saem iguais a cada execução). */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

/** Linha "skeleton" — representa texto sem escrever conteúdo. */
const sk = (x, y, w, h = 10, fill = C.line2) => rect(x, y, w, h, { rx: h / 2, fill });

function defs() {
  return `<defs>
  <linearGradient id="grad"><stop offset="0" stop-color="${C.green}"/><stop offset="1" stop-color="${C.green}"/></linearGradient>
  <linearGradient id="gradH"><stop offset="0" stop-color="${C.green}"/><stop offset="1" stop-color="${C.green}"/></linearGradient>
  <linearGradient id="fadeDown" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.green}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.green}" stop-opacity="0"/></linearGradient>
  <linearGradient id="fadeDownBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.blue}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.blue}" stop-opacity="0"/></linearGradient>
  <radialGradient id="glowG"><stop offset="0" stop-color="${C.green2}" stop-opacity="0.28"/><stop offset="1" stop-color="${C.green2}" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowB"><stop offset="0" stop-color="${C.blue2}" stop-opacity="0.30"/><stop offset="1" stop-color="${C.blue2}" stop-opacity="0"/></radialGradient>
  <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="${C.line}" stroke-width="1"/></pattern>
  <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000" flood-opacity="0.45"/></filter>
</defs>`;
}

function background() {
  return [
    rect(0, 0, W, H, { fill: C.bg }),
    rect(0, 0, W, H, { fill: "url(#grid)", opacity: 0.35 }),
  ].join("");
}

/** Janela de navegador. */
function browser(x, y, w, h, url, inner = "", { light = false } = {}) {
  const bar = light ? "#E9E4DA" : C.s2;
  const body = light ? "#F7F3EC" : C.s1;
  const stroke = light ? "#D8D0C2" : C.line2;
  return g(
    [
      rect(x, y, w, h, { rx: 18, fill: body, stroke }),
      pathEl(`M${x} ${y + 18}a18 18 0 0 1 18 -18h${w - 36}a18 18 0 0 1 18 18v26h-${w}z`, {
        fill: bar,
      }),
      circle(x + 24, y + 22, 6, { fill: "#F87171", opacity: 0.85 }),
      circle(x + 44, y + 22, 6, { fill: "#FBBF24", opacity: 0.85 }),
      circle(x + 64, y + 22, 6, { fill: "#34D399", opacity: 0.85 }),
      rect(x + 96, y + 10, Math.min(420, w - 140), 24, {
        rx: 12,
        fill: light ? "#F7F3EC" : C.bg,
        opacity: 0.9,
      }),
      text(x + 112, y + 27, url, { size: 13, font: MONO, fill: light ? "#6B6357" : C.ink2 }),
      inner,
    ].join(""),
  );
}

/** Celular. */
function phone(x, y, w, h, inner = "") {
  return g(
    [
      rect(x, y, w, h, {
        rx: 40,
        fill: "#05090F",
        stroke: C.line2,
        strokeWidth: 2,
        stroke: C.line2,
      }),
      rect(x + 10, y + 10, w - 20, h - 20, { rx: 32, fill: C.s1 }),
      rect(x + w / 2 - 44, y + 20, 88, 22, { rx: 11, fill: "#05090F" }),
      inner,
    ].join(""),
  );
}

function card(x, y, w, h, o = {}) {
  return rect(x, y, w, h, { rx: 14, fill: C.s2, stroke: C.line, ...o });
}

function bars(x, y, w, h, values, { color = "url(#grad)", gap = 10, radius = 4 } = {}) {
  const bw = (w - gap * (values.length - 1)) / values.length;
  return values
    .map((v, i) => rect(x + i * (bw + gap), y + h - h * v, bw, h * v, { rx: radius, fill: color }))
    .join("");
}

function smoothPath(points) {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx} ${y0} ${cx} ${y1} ${x1} ${y1}`;
  }
  return d;
}

function areaChart(x, y, w, h, values, { stroke = C.green, fill = "url(#fadeDown)" } = {}) {
  const pts = values.map((v, i) => [x + (w * i) / (values.length - 1), y + h - h * v]);
  const d = smoothPath(pts);
  return [
    pathEl(`${d} L${x + w} ${y + h} L${x} ${y + h} Z`, { fill }),
    pathEl(d, { fill: "none", stroke, strokeWidth: 3, strokeLinecap: "round" }),
  ].join("");
}

/** QR code estilizado (não decodificável de propósito). */
function qr(x, y, size, seed = 7) {
  const n = 21;
  const cell = size / n;
  const r = rng(seed);
  const finder = (fx, fy) =>
    [
      rect(x + fx * cell, y + fy * cell, cell * 7, cell * 7, { fill: C.ink0, rx: cell }),
      rect(x + (fx + 1) * cell, y + (fy + 1) * cell, cell * 5, cell * 5, {
        fill: C.bg,
        rx: cell * 0.6,
      }),
      rect(x + (fx + 2) * cell, y + (fy + 2) * cell, cell * 3, cell * 3, {
        fill: C.ink0,
        rx: cell * 0.5,
      }),
    ].join("");
  const inFinder = (i, j) => (i < 8 && j < 8) || (i > 12 && j < 8) || (i < 8 && j > 12);
  let cells = "";
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      if (!inFinder(i, j) && r() > 0.52)
        cells += rect(x + i * cell + 1, y + j * cell + 1, cell - 2, cell - 2, {
          fill: C.ink0,
          rx: 2,
        });
  return cells + finder(0, 0) + finder(14, 0) + finder(0, 14);
}

function person(cx, baseY, scale = 1, fill = C.ink3) {
  return g([circle(0, -118, 22, { fill }), rect(-30, -90, 60, 112, { rx: 26, fill })].join(""), {
    transform: `translate(${cx} ${baseY}) scale(${scale})`,
  });
}

function bbox(x, y, w, h, label, color) {
  return [
    rect(x, y, w, h, { fill: "none", stroke: color, strokeWidth: 3, rx: 2 }),
    rect(x - 1.5, y - 28, label.length * 8.6 + 18, 28, { fill: color }),
    text(x + 8, y - 9, label, { size: 14, font: MONO, weight: 700, fill: C.bg }),
  ].join("");
}

function svg(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs()}${background()}${inner}</svg>\n`;
}

// ---------- capas ----------
const covers = {};

covers["personal-manager"] = () => {
  const x = 110;
  const y = 100;
  const w = 1060;
  const h = 700;
  const r = rng(11);
  const side = [
    rect(x, y + 44, 210, h - 44, { fill: C.bg, opacity: 0.55 }),
    rect(x + 24, y + 72, 36, 36, { rx: 10, fill: "url(#grad)" }),
    text(x + 42, y + 96, "PM", { size: 15, weight: 700, fill: C.bg, anchor: "middle", font: MONO }),
    sk(x + 72, y + 85, 100, 10, C.line2),
    ...[0, 1, 2, 3, 4, 5, 6].map((i) =>
      g(
        [
          rect(x + 16, y + 140 + i * 50, 178, 38, { rx: 9, fill: i === 0 ? C.s3 : "none" }),
          rect(x + 32, y + 152 + i * 50, 14, 14, { rx: 4, fill: i === 0 ? C.green : C.ink3 }),
          sk(x + 58, y + 154 + i * 50, 70 + ((i * 23) % 50), 10, i === 0 ? C.ink2 : C.line2),
        ].join(""),
      ),
    ),
  ].join("");
  const cx = x + 240;
  const kpis = [
    card(cx, y + 80, 250, 120),
    text(cx + 24, y + 116, "ALUNOS ATIVOS", { size: 13, font: MONO, fill: C.ink2 }),
    text(cx + 24, y + 172, "100+", { size: 46, weight: 700, fill: C.ink0, font: MONO }),
    circle(cx + 214, y + 112, 6, { fill: C.green }),
    card(cx + 270, y + 80, 250, 120),
    sk(cx + 294, y + 108, 110, 10),
    sk(cx + 294, y + 140, 150, 26, C.ink3),
    pathEl(
      smoothPath([
        [cx + 430, y + 175],
        [cx + 460, y + 160],
        [cx + 480, y + 168],
        [cx + 500, y + 140],
      ]),
      { fill: "none", stroke: C.blue, strokeWidth: 3 },
    ),
    card(cx + 540, y + 80, 250, 120),
    sk(cx + 564, y + 108, 90, 10),
    sk(cx + 564, y + 140, 130, 26, C.ink3),
    rect(cx + 700, y + 140, 66, 26, { rx: 13, fill: C.green, opacity: 0.18 }),
    sk(cx + 712, y + 149, 42, 8, C.green),
  ].join("");
  const chart = [
    card(cx, y + 220, 500, 300),
    sk(cx + 24, y + 248, 160, 12, C.ink2),
    bars(
      cx + 24,
      y + 290,
      452,
      200,
      [0.38, 0.45, 0.42, 0.55, 0.52, 0.6, 0.66, 0.63, 0.72, 0.78, 0.82, 0.9],
      { gap: 12 },
    ),
  ].join("");
  const statusColor = [C.green, C.green, C.amber, C.green, C.red, C.green];
  const list = [
    card(cx + 520, y + 220, 270, 450),
    sk(cx + 544, y + 248, 120, 12, C.ink2),
    ...statusColor.map((col, i) =>
      g(
        [
          circle(cx + 562, y + 300 + i * 62, 16, { fill: C.s3, stroke: C.line2 }),
          sk(cx + 590, y + 290 + i * 62, 80 + Math.round(r() * 60), 9, C.ink3),
          sk(cx + 590, y + 306 + i * 62, 50 + Math.round(r() * 40), 7, C.line2),
          circle(cx + 762, y + 300 + i * 62, 7, { fill: col }),
        ].join(""),
      ),
    ),
  ].join("");
  const bottom = [
    card(cx, y + 540, 500, 130),
    areaChart(cx + 24, y + 570, 452, 80, [0.2, 0.35, 0.3, 0.5, 0.45, 0.62, 0.7, 0.68, 0.85], {
      stroke: C.blue,
      fill: "url(#fadeDownBlue)",
    }),
  ].join("");

  const px = 1210;
  const py = 150;
  const pw = 300;
  const ph = 620;
  const phoneInner = [
    sk(px + 40, py + 70, 120, 10, C.ink2),
    circle(px + pw - 54, py + 74, 16, { fill: C.s3 }),
    rect(px + 36, py + 120, pw - 72, pw - 72, {
      rx: 22,
      fill: C.bg,
      stroke: C.green,
      strokeWidth: 4,
    }),
    qr(px + 58, py + 142, pw - 116, 23),
    rect(px + 36, py + 380, pw - 72, 56, { rx: 14, fill: C.green, opacity: 0.15 }),
    circle(px + 68, py + 408, 12, { fill: C.green }),
    pathEl(`M${px + 62} ${py + 408} l5 5 l9 -10`, {
      fill: "none",
      stroke: C.bg,
      strokeWidth: 3,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    sk(px + 92, py + 403, 120, 10, C.green),
    ...[0, 1, 2].map((i) =>
      g(
        [
          card(px + 36, py + 456 + i * 46, pw - 72, 36, { rx: 10 }),
          sk(px + 54, py + 470 + i * 46, 90 + i * 20, 8, C.ink3),
        ].join(""),
      ),
    ),
  ].join("");

  return svg(
    browser(x, y, w, h, "personalmanager.com.br", side + kpis + chart + list + bottom) +
      phone(px, py, pw, ph, phoneInner),
  );
};

covers["contagem-pessoas-igreja"] = () => {
  const x = 100;
  const y = 100;
  const w = 1010;
  const h = 700;
  const floor = Array.from({ length: 9 }, (_, i) =>
    line(x, y + 330 + i * 42, x + w, y + 330 + i * 42, { stroke: C.line, strokeWidth: 1 }),
  ).join("");
  const persp = Array.from({ length: 11 }, (_, i) =>
    line(x + w / 2, y + 250, x - 300 + i * 160, y + h, {
      stroke: C.line,
      strokeWidth: 1,
      opacity: 0.6,
    }),
  ).join("");
  const lineX = x + 560;
  const people = [
    { cx: x + 170, by: y + 600, s: 1.15, id: 12, c: C.blue },
    { cx: x + 360, by: y + 560, s: 1.0, id: 27, c: C.blue },
    { cx: x + 545, by: y + 590, s: 1.1, id: 31, c: C.green },
    { cx: x + 760, by: y + 545, s: 0.95, id: 42, c: C.blue },
    { cx: x + 905, by: y + 610, s: 1.18, id: 45, c: C.blue },
  ];
  const ppl = people
    .map((p) => {
      const bw = 92 * p.s;
      const bh = 190 * p.s;
      return (
        person(p.cx, p.by, p.s) +
        bbox(p.cx - bw / 2, p.by - bh + 22 * p.s, bw, bh, `#${p.id} person .9${p.id % 9}`, p.c)
      );
    })
    .join("");
  const scene = [
    rect(x, y, w, h, { rx: 18, fill: "#0A1322", stroke: C.line2 }),
    persp,
    floor,
    rect(lineX - 34, y + 120, 68, h - 120, { fill: C.amber, opacity: 0.1 }),
    line(lineX, y + 120, lineX, y + h, {
      stroke: C.amber,
      strokeWidth: 3,
      strokeDasharray: "14 12",
    }),
    ppl,
    rect(x + people[2].cx - x + 52, y + 300, 64, 34, { rx: 17, fill: C.green }),
    text(x + people[2].cx - x + 84, y + 323, "+1", {
      size: 18,
      weight: 700,
      fill: C.bg,
      anchor: "middle",
      font: MONO,
    }),
    circle(x + 34, y + 36, 8, { fill: C.red }),
    text(x + 52, y + 42, "CAM-01 · REC", { size: 16, font: MONO, fill: C.ink1 }),
    ...[
      [x + 14, y + 74, 1, 1],
      [x + w - 14, y + 74, -1, 1],
      [x + 14, y + h - 14, 1, -1],
      [x + w - 14, y + h - 14, -1, -1],
    ].map(([cx, cy, dx, dy]) =>
      pathEl(`M${cx} ${cy + 26 * dy} V${cy} H${cx + 26 * dx}`, {
        fill: "none",
        stroke: C.ink2,
        strokeWidth: 3,
      }),
    ),
  ].join("");

  const sx = 1150;
  const panel = [
    card(sx, 100, 350, 330, { fill: C.s1, stroke: C.line2 }),
    sk(sx + 28, 132, 130, 12, C.ink2),
    circle(sx + 312, 138, 7, { fill: C.green }),
    areaChart(sx + 28, 180, 294, 220, [0.05, 0.12, 0.3, 0.62, 0.85, 0.92, 0.9, 0.7, 0.35, 0.12]),
    line(sx + 28, 400, sx + 322, 400, { stroke: C.line2 }),
    card(sx, 460, 350, 340, { fill: C.s1, stroke: C.line2 }),
    sk(sx + 28, 492, 110, 12, C.ink2),
    bars(sx + 28, 540, 294, 220, [0.6, 0.72, 0.65, 0.8, 0.76, 0.88, 0.82, 0.93], {
      color: "url(#grad)",
      gap: 12,
    }),
  ].join("");
  return svg(scene + panel);
};

covers["migracao-rpa-python"] = () => {
  const lx = 110;
  const ly = 130;
  const acts = [
    { c: C.blue, w: 280 },
    { c: C.violet, w: 240 },
    { c: C.amber, w: 300, branch: true },
    { c: C.blue, w: 260 },
    { c: C.green, w: 220 },
  ];
  let left = card(lx, ly, 520, 640, { fill: C.s1, stroke: C.line2 });
  left += text(lx + 28, ly + 44, "Main.xaml", { size: 18, font: MONO, fill: C.ink1 });
  left += rect(lx + 28, ly + 70, 464, 2, { fill: C.line2 });
  acts.forEach((a, i) => {
    const yy = ly + 110 + i * 102;
    left += rect(lx + 60, yy, a.w, 64, { rx: 12, fill: C.s2, stroke: a.c, strokeWidth: 2 });
    left += rect(lx + 78, yy + 20, 24, 24, { rx: 6, fill: a.c, opacity: 0.9 });
    left += sk(lx + 116, yy + 22, a.w - 150, 10, C.ink3);
    left += sk(lx + 116, yy + 38, (a.w - 150) / 2, 7, C.line2);
    if (a.branch) {
      left += pathEl(`M${lx + 60 + a.w} ${yy + 32} H${lx + 450} V${yy + 120}`, {
        fill: "none",
        stroke: C.amber,
        strokeWidth: 2,
        strokeDasharray: "6 6",
      });
      left += circle(lx + 450, yy + 120, 6, { fill: C.amber });
    }
    if (i < acts.length - 1)
      left += line(lx + 140, yy + 64, lx + 140, yy + 102, { stroke: C.line2, strokeWidth: 2 });
  });

  const arrow = [
    circle(800, 450, 74, { fill: C.s2, stroke: "url(#grad)", strokeWidth: 3 }),
    pathEl("M762 450 H830 M808 428 L834 450 L808 472", {
      fill: "none",
      stroke: "url(#gradH)",
      strokeWidth: 6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    text(800, 560, "1 : 1", { size: 22, font: MONO, weight: 700, fill: C.green, anchor: "middle" }),
  ].join("");

  const kw = C.violet;
  const fn = C.blue;
  const cls = C.green;
  const str = C.amber;
  const code = [
    [
      [
        ["class ", kw],
        ["ProcessoDAO", cls],
        [":", C.ink1],
      ],
    ],
    [
      [
        ["    def ", kw],
        ["buscar_pendentes", fn],
        ["(self) -> ", C.ink1],
        ["list", cls],
        ["[Item]:", C.ink1],
      ],
    ],
    [
      [
        ["        return ", kw],
        ["self", C.ink2],
        [".db.query(", C.ink1],
        ["SQL_PENDENTES", C.amber],
        [")", C.ink1],
      ],
    ],
    [[["", C.ink1]]],
    [
      [
        ["class ", kw],
        ["SistemaLegado", cls],
        [":", C.ink1],
      ],
    ],
    [
      [
        ["    def ", kw],
        ["registrar", fn],
        ["(self, item: ", C.ink1],
        ["Item", cls],
        [") -> ", C.ink1],
        ["None", kw],
        [": ...", C.ink1],
      ],
    ],
    [[["", C.ink1]]],
    [
      [
        ["class ", kw],
        ["Orquestrador", cls],
        [":", C.ink1],
      ],
    ],
    [
      [
        ["    def ", kw],
        ["executar", fn],
        ["(self) -> ", C.ink1],
        ["None", kw],
        [":", C.ink1],
      ],
    ],
    [
      [
        ["        for ", kw],
        ["item ", C.ink0],
        ["in ", kw],
        ["self", C.ink2],
        [".dao.", C.ink1],
        ["buscar_pendentes", fn],
        ["():", C.ink1],
      ],
    ],
    [
      [
        ["            if ", kw],
        ["self", C.ink2],
        [".regras.", C.ink1],
        ["aplicar", fn],
        ["(item):", C.ink1],
      ],
    ],
    [
      [
        ["                ", C.ink1],
        ["self", C.ink2],
        [".legado.", C.ink1],
        ["registrar", fn],
        ["(item)", C.ink1],
      ],
    ],
    [
      [
        ["            ", C.ink1],
        ["log", C.ink2],
        [".info(", C.ink1],
        ['"ok"', str],
        [", id=item.id)", C.ink1],
      ],
    ],
  ];
  const ex = 960;
  const ey = 110;
  let lines = "";
  code.forEach(([segs], i) => {
    const yy = ey + 104 + i * 40;
    lines += text(ex + 28, yy, String(i + 1).padStart(2, " "), {
      size: 15,
      font: MONO,
      fill: C.ink3,
    });
    lines += `<text x="${ex + 72}" y="${yy}" font-family="${MONO}" font-size="17" xml:space="preserve">${segs
      .map(([t, c]) => `<tspan fill="${c}">${esc(t)}</tspan>`)
      .join("")}</text>`;
  });
  const editor = browser(
    ex,
    ey,
    560,
    680,
    "orquestrador.py",
    rect(ex, ey + 44, 560, 636, { fill: "#0C1424" }) + lines,
  );

  return svg(left + arrow + editor);
};

covers["submita"] = () => {
  const px = 130;
  const py = 110;
  const paper = [
    rect(px, py, 480, 680, { rx: 10, fill: "#EEF2F7", stroke: C.line2 }),
    pathEl(`M${px + 420} ${py} h60 v60 z`, { fill: "#C9D3E0" }),
    sk(px + 50, py + 70, 300, 18, "#1F2A3D"),
    sk(px + 50, py + 102, 220, 12, "#8090A6"),
    ...Array.from({ length: 14 }, (_, i) => {
      const yy = py + 160 + i * 32;
      const hl = i === 3 || i === 4 || i === 9;
      return (
        (hl ? rect(px + 44, yy - 8, 392, 24, { rx: 4, fill: C.amber, opacity: 0.45 }) : "") +
        sk(px + 50, yy, 380 - ((i * 37) % 90), 9, "#A3B0C2")
      );
    }),
    rect(px + 50, py + 620, 80, 28, { rx: 6, fill: C.red, opacity: 0.9 }),
    text(px + 90, py + 640, "PDF", {
      size: 15,
      weight: 700,
      font: MONO,
      fill: "#fff",
      anchor: "middle",
    }),
  ].join("");

  const ax = 690;
  const ai = [
    card(ax, 110, 420, 330, {
      fill: C.s1,
      stroke: "url(#grad)",
      strokeWidth: 2,
      stroke: C.line2,
    }),
    pathEl(`M${ax + 44} 140 l7 17 17 7 -17 7 -7 17 -7 -17 -17 -7 17 -7z`, { fill: "url(#grad)" }),
    text(ax + 76, 172, "AI review", { size: 20, weight: 600, fill: C.ink0 }),
    ...[0, 1, 2, 3].map((i) =>
      g(
        [
          circle(ax + 48, 228 + i * 52, 12, { fill: i < 3 ? C.green : C.amber, opacity: 0.2 }),
          i < 3
            ? pathEl(`M${ax + 42} ${228 + i * 52} l4 4 l8 -8`, {
                fill: "none",
                stroke: C.green,
                strokeWidth: 3,
                strokeLinecap: "round",
              })
            : text(ax + 48, 234 + i * 52, "!", {
                size: 16,
                weight: 700,
                fill: C.amber,
                anchor: "middle",
              }),
          sk(ax + 76, 222 + i * 52, 220 - i * 30, 10, C.ink3),
        ].join(""),
      ),
    ),
  ].join("");

  const kx = 690;
  const ky = 480;
  const cols = [
    { c: C.ink2, n: 3 },
    { c: C.amber, n: 2 },
    { c: C.blue, n: 2 },
    { c: C.green, n: 1 },
  ];
  let kanban = card(kx, ky, 790, 310, { fill: C.s1, stroke: C.line2 });
  cols.forEach((col, i) => {
    const cx = kx + 24 + i * 190;
    kanban += circle(cx + 8, ky + 34, 6, { fill: col.c });
    kanban += sk(cx + 22, ky + 29, 90, 10, C.ink2);
    for (let j = 0; j < col.n; j++) {
      kanban += card(cx, ky + 62 + j * 76, 170, 64, { rx: 10, fill: C.s2 });
      kanban += sk(cx + 16, ky + 80 + j * 76, 120, 9, C.ink3);
      kanban += circle(cx + 26, ky + 106 + j * 76, 9, { fill: C.s3, stroke: C.line2 });
      kanban += sk(cx + 42, ky + 102 + j * 76, 60, 7, C.line2);
    }
  });
  const arrowToAI = pathEl("M612 330 C650 330 650 270 688 270", {
    fill: "none",
    stroke: "url(#gradH)",
    strokeWidth: 3,
    strokeDasharray: "8 8",
  });
  const side = [
    card(1150, 110, 330, 330, { fill: C.s1, stroke: C.line2 }),
    sk(1178, 142, 120, 12, C.ink2),
    ...["author", "reviewer", "coordinator"].map((role, i) =>
      g(
        [
          circle(1196, 210 + i * 76, 22, { fill: [C.blue, C.amber, C.green][i], opacity: 0.25 }),
          circle(1196, 210 + i * 76, 22, {
            fill: "none",
            stroke: [C.blue, C.amber, C.green][i],
            strokeWidth: 2,
          }),
          text(1234, 216 + i * 76, role, { size: 17, font: MONO, fill: C.ink1 }),
        ].join(""),
      ),
    ),
  ].join("");
  return svg(paper + arrowToAI + ai + side + kanban);
};

covers["maschio-soares-advogados"] = () => {
  const x = 150;
  const y = 90;
  const w = 1300;
  const h = 720;
  const navy = "#1C2A3A";
  const gold = "#B08D57";
  const inner = [
    rect(x, y + 44, w, 80, { fill: "#F7F3EC" }),
    text(x + 60, y + 96, "Maschio & Soares", { size: 26, font: SERIF, fill: navy, weight: 600 }),
    text(x + 345, y + 96, "ADVOGADOS", { size: 13, font: MONO, fill: gold, letterSpacing: 3 }),
    ...[0, 1, 2, 3, 4].map((i) => sk(x + 760 + i * 92, y + 82, 66, 9, "#BDB3A3")),
    line(x, y + 124, x + w, y + 124, { stroke: "#E2DACB" }),
    rect(x, y + 124, w, 330, { fill: navy }),
    rect(x + 60, y + 190, 40, 3, { fill: gold }),
    sk(x + 60, y + 220, 560, 34, "#F7F3EC"),
    sk(x + 60, y + 272, 440, 34, "#F7F3EC"),
    sk(x + 60, y + 334, 400, 11, "#8C9AAD"),
    sk(x + 60, y + 356, 340, 11, "#8C9AAD"),
    rect(x + 60, y + 392, 180, 44, { rx: 4, fill: gold }),
    sk(x + 90, y + 410, 120, 9, navy),
    rect(x + 780, y + 164, 460, 250, { fill: "#2A3B50" }),
    pathEl(
      `M${x + 780} ${y + 414} L${x + 900} ${y + 290} L${x + 990} ${y + 360} L${x + 1080} ${y + 250} L${x + 1240} ${y + 414} Z`,
      { fill: "#33475F" },
    ),
    circle(x + 1150, y + 230, 26, { fill: gold, opacity: 0.6 }),
    ...[0, 1, 2].map((i) =>
      g(
        [
          rect(x + 60 + i * 400, y + 490, 370, 190, { fill: "#FFFFFF", stroke: "#E2DACB" }),
          rect(x + 90 + i * 400, y + 520, 40, 40, { rx: 4, fill: navy, opacity: 0.08 }),
          rect(x + 102 + i * 400, y + 532, 16, 16, { fill: gold }),
          sk(x + 90 + i * 400, y + 586, 200, 14, navy),
          sk(x + 90 + i * 400, y + 616, 290, 9, "#BDB3A3"),
          sk(x + 90 + i * 400, y + 636, 250, 9, "#BDB3A3"),
        ].join(""),
      ),
    ),
  ].join("");
  return svg(browser(x, y, w, h, "maschio-soares · /atuacao", inner, { light: true }));
};

covers["previsao-atoleiros"] = () => {
  const x = 100;
  const y = 100;
  const w = 880;
  const h = 700;
  const r = rng(5);
  const greens = ["#1E3B2A", "#24472F", "#2B5236", "#1A3325", "#31593A", "#3A4A2A", "#4A4A2E"];
  let tiles = "";
  const cols = 8;
  const rows = 6;
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) {
      const tw = w / cols;
      const th = h / rows;
      tiles += rect(x + i * tw, y + j * th, tw, th, {
        fill: greens[Math.floor(r() * greens.length)],
      });
      for (let k = 0; k < 5; k++)
        tiles += line(
          x + i * tw + 8,
          y + j * th + 12 + k * (th / 5),
          x + (i + 1) * tw - 8,
          y + j * th + 6 + k * (th / 5),
          { stroke: "#000", strokeOpacity: 0.12, strokeWidth: 2 },
        );
    }
  const road = `M${x - 10} ${y + 560} C${x + 180} ${y + 520} ${x + 220} ${y + 380} ${x + 400} ${y + 360} S${x + 640} ${y + 200} ${x + w + 10} ${y + 150}`;
  const map = [
    `<clipPath id="mapclip">${rect(x, y, w, h, { rx: 18 })}</clipPath>`,
    g(
      [
        tiles,
        pathEl(road, { fill: "none", stroke: "#8A6B47", strokeWidth: 30, strokeLinecap: "round" }),
        pathEl(road, { fill: "none", stroke: "#B08A5D", strokeWidth: 18, strokeLinecap: "round" }),
        pathEl(road, {
          fill: "none",
          stroke: C.green,
          strokeWidth: 8,
          strokeDasharray: "180 900",
          strokeLinecap: "round",
          opacity: 0.95,
        }),
        pathEl(road, {
          fill: "none",
          stroke: C.amber,
          strokeWidth: 8,
          strokeDasharray: "0 260 160 900",
          strokeLinecap: "round",
          opacity: 0.95,
        }),
        pathEl(road, {
          fill: "none",
          stroke: C.red,
          strokeWidth: 8,
          strokeDasharray: "0 470 170 900",
          strokeLinecap: "round",
          opacity: 0.95,
        }),
        circle(x + 470, y + 300, 110, { fill: C.red, opacity: 0.12 }),
      ].join(""),
      { clipPath: "url(#mapclip)" },
    ),
    rect(x, y, w, h, { rx: 18, fill: "none", stroke: C.line2, strokeWidth: 2 }),
    g(
      [
        pathEl("M0 0 C-22 -22 -22 -52 0 -52 C22 -52 22 -22 0 0Z", {
          fill: C.red,
          stroke: "#fff",
          strokeWidth: 3,
        }),
        circle(0, -34, 8, { fill: "#fff" }),
      ].join(""),
      { transform: `translate(${x + 470} ${y + 300})` },
    ),
    rect(x + 24, y + 24, 230, 40, { rx: 10, fill: C.bg, opacity: 0.85 }),
    text(x + 44, y + 50, "-24.50, -53.93", { size: 16, font: MONO, fill: C.ink1 }),
  ].join("");

  const sx = 1020;
  const cnn = [
    card(sx, 100, 480, 250, { fill: C.s1, stroke: C.line2 }),
    sk(sx + 28, 132, 90, 12, C.ink2),
    ...[0, 1, 2, 3, 4].map((i) => {
      const hh = 150 - i * 26;
      return rect(sx + 40 + i * 84, 225 - hh / 2 + 10, 50 - i * 4, hh, {
        rx: 6,
        fill: "url(#grad)",
        opacity: 0.35 + i * 0.13,
      });
    }),
    text(sx + 448, 240, "→", { size: 30, fill: C.ink1, anchor: "end" }),
  ].join("");
  const rain = [
    card(sx, 380, 480, 200, { fill: C.s1, stroke: C.line2 }),
    sk(sx + 28, 410, 110, 12, C.ink2),
    bars(sx + 28, 440, 424, 110, [0.15, 0.2, 0.45, 0.85, 0.95, 0.6, 0.3, 0.1], {
      color: C.blue,
      gap: 14,
    }),
  ].join("");
  const gx = sx + 240;
  const gy = 760;
  const arc = (a0, a1, col) => {
    const p = (a) => [
      gx + 150 * Math.cos(Math.PI * (1 - a)),
      gy - 150 * Math.sin(Math.PI * (1 - a)),
    ];
    const [x0, y0] = p(a0);
    const [x1, y1] = p(a1);
    return pathEl(`M${x0} ${y0} A150 150 0 0 1 ${x1} ${y1}`, {
      fill: "none",
      stroke: col,
      strokeWidth: 22,
    });
  };
  const needleA = 0.78;
  const gauge = [
    card(sx, 610, 480, 190, { fill: C.s1, stroke: C.line2 }),
    `<clipPath id="gclip">${rect(sx, 610, 480, 190, { rx: 14 })}</clipPath>`,
    g(
      [
        arc(0.02, 0.33, C.green),
        arc(0.35, 0.65, C.amber),
        arc(0.67, 0.98, C.red),
        line(
          gx,
          gy,
          gx + 128 * Math.cos(Math.PI * (1 - needleA)),
          gy - 128 * Math.sin(Math.PI * (1 - needleA)),
          { stroke: C.ink0, strokeWidth: 5, strokeLinecap: "round" },
        ),
        circle(gx, gy, 12, { fill: C.ink0 }),
      ].join(""),
      { clipPath: "url(#gclip)" },
    ),
  ].join("");
  return svg(map + cnn + rain + gauge);
};

covers["escalas-life"] = () => {
  const x = 120;
  const y = 90;
  const w = 1360;
  const h = 720;
  const colors = [C.green, C.blue, C.amber, C.violet];
  const r = rng(3);
  const gx = x + 300;
  const gy = y + 150;
  const cw = (w - 330) / 7;
  const ch = 104;
  let grid = "";
  ["D", "S", "T", "Q", "Q", "S", "S"].forEach(
    (d, i) => (grid += text(gx + i * cw + 14, gy - 16, d, { size: 15, font: MONO, fill: C.ink2 })),
  );
  for (let i = 0; i < 35; i++) {
    const col = i % 7;
    const row = Math.floor(i / 7);
    const day = i - 2;
    const cx = gx + col * cw;
    const cy = gy + row * ch;
    grid += rect(cx + 3, cy + 3, cw - 6, ch - 6, {
      rx: 10,
      fill: day < 1 || day > 30 ? "none" : C.s2,
      stroke: C.line,
    });
    if (day >= 1 && day <= 30) {
      grid += text(cx + 16, cy + 30, String(day), { size: 15, font: MONO, fill: C.ink2 });
      if (col === 0 || col === 3 || (col === 6 && r() > 0.4)) {
        const n = 1 + Math.floor(r() * 3);
        for (let k = 0; k < n; k++) {
          const c = colors[(i + k) % 4];
          grid += rect(cx + 12, cy + 42 + k * 18, cw - 24, 14, { rx: 7, fill: c, opacity: 0.22 });
          grid += circle(cx + 20, cy + 49 + k * 18, 4, { fill: c });
          grid += sk(cx + 30, cy + 46 + k * 18, cw - 60, 6, c);
        }
      }
    }
  }
  const side = [
    rect(x, y + 44, 270, h - 44, { fill: C.bg, opacity: 0.5 }),
    sk(x + 30, y + 90, 150, 14, C.ink2),
    ...colors.map((c, i) =>
      g(
        [
          circle(x + 40, y + 160 + i * 52, 9, { fill: c }),
          sk(x + 62, y + 155 + i * 52, 120, 10, C.ink3),
        ].join(""),
      ),
    ),
    rect(x + 30, y + 400, 210, 52, { rx: 12, fill: "url(#grad)" }),
    pathEl(`M${x + 64} ${y + 412} l6 14 14 6 -14 6 -6 14 -6 -14 -14 -6 14 -6z`, { fill: C.bg }),
    sk(x + 92, y + 421, 120, 10, C.bg),
    ...[0, 1, 2, 3].map((i) =>
      g(
        [
          circle(x + 48, y + 510 + i * 46, 15, { fill: C.s3, stroke: colors[i] }),
          sk(x + 74, y + 505 + i * 46, 110, 9, C.ink3),
        ].join(""),
      ),
    ),
    sk(gx, y + 80, 180, 18, C.ink1),
    rect(gx + w - 520, y + 72, 36, 36, { rx: 10, fill: C.s2, stroke: C.line2 }),
    rect(gx + w - 476, y + 72, 36, 36, { rx: 10, fill: C.s2, stroke: C.line2 }),
  ].join("");
  return svg(browser(x, y, w, h, "escalas-life · /escalas", side + grid));
};

covers["orcamento-compartilhado"] = () => {
  const donut = (cx, cy, rr, parts) => {
    let acc = 0;
    return parts
      .map(([v, c]) => {
        const len = 2 * Math.PI * rr;
        const seg = `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="${c}" stroke-width="34" stroke-dasharray="${(v * len).toFixed(1)} ${len.toFixed(1)}" stroke-dashoffset="${(-acc * len).toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>`;
        acc += v;
        return seg;
      })
      .join("");
  };
  const screen = (px, py, seed) => {
    const r = rng(seed);
    return [
      sk(px + 40, py + 72, 110, 11, C.ink2),
      circle(px + 270, py + 78, 14, { fill: C.s3 }),
      donut(px + 160, py + 230, 92, [
        [0.38, C.green],
        [0.24, C.blue],
        [0.18, C.amber],
        [0.2, C.violet],
      ]),
      circle(px + 160, py + 230, 8, { fill: C.ink3 }),
      ...[0, 1, 2, 3, 4].map((i) =>
        g(
          [
            card(px + 30, py + 370 + i * 58, 260, 46, { rx: 12 }),
            circle(px + 54, py + 393 + i * 58, 9, {
              fill: [C.green, C.blue, C.amber, C.violet, C.green][i],
            }),
            sk(px + 74, py + 388 + i * 58, 80 + Math.round(r() * 50), 9, C.ink3),
            sk(px + 230, py + 388 + i * 58, 42, 9, C.ink2),
          ].join(""),
        ),
      ),
    ].join("");
  };
  const p1 = phone(360, 120, 320, 680, screen(360, 120, 4));
  const p2 = phone(920, 120, 320, 680, screen(920, 120, 4));
  const sync = [
    circle(800, 450, 64, { fill: C.s2, stroke: "url(#grad)", strokeWidth: 3 }),
    pathEl("M772 438 A32 32 0 0 1 826 430 M826 430 L828 412 M826 430 L808 432", {
      fill: "none",
      stroke: C.green,
      strokeWidth: 5,
      strokeLinecap: "round",
    }),
    pathEl("M828 462 A32 32 0 0 1 774 470 M774 470 L772 488 M774 470 L792 468", {
      fill: "none",
      stroke: C.blue,
      strokeWidth: 5,
      strokeLinecap: "round",
    }),
    line(690, 450, 734, 450, { stroke: "url(#gradH)", strokeWidth: 3, strokeDasharray: "6 8" }),
    line(866, 450, 910, 450, { stroke: "url(#gradH)", strokeWidth: 3, strokeDasharray: "6 8" }),
    rect(752, 540, 96, 32, { rx: 16, fill: C.green, opacity: 0.15 }),
    circle(772, 556, 6, { fill: C.green }),
    text(786, 562, "live", { size: 16, font: MONO, fill: C.green }),
  ].join("");
  return svg(p1 + p2 + sync);
};

covers["broadcast"] = () => {
  const x = 110;
  const y = 110;
  const w = 960;
  const h = 680;
  const r = rng(8);
  const list = [
    rect(x, y + 44, 300, h - 44, { fill: C.bg, opacity: 0.5 }),
    rect(x + 20, y + 68, 260, 38, { rx: 10, fill: C.s2, stroke: C.line }),
    sk(x + 38, y + 82, 120, 9, C.ink3),
    ...Array.from({ length: 8 }, (_, i) =>
      g(
        [
          rect(x + 20, y + 124 + i * 62, 18, 18, {
            rx: 5,
            fill: i < 5 ? C.green : "none",
            stroke: i < 5 ? C.green : C.line2,
            strokeWidth: 2,
          }),
          circle(x + 70, y + 133 + i * 62, 18, { fill: C.s3, stroke: C.line2 }),
          sk(x + 100, y + 124 + i * 62, 90 + Math.round(r() * 70), 9, C.ink3),
          sk(x + 100, y + 140 + i * 62, 60 + Math.round(r() * 40), 7, C.line2),
        ].join(""),
      ),
    ),
  ].join("");
  const cx = x + 330;
  const compose = [
    sk(cx, y + 80, 200, 14, C.ink1),
    card(cx, y + 120, 600, 300, { fill: C.s2 }),
    ...[0, 1, 2, 3, 4].map((i) =>
      sk(cx + 28, y + 152 + i * 30, 520 - ((i * 61) % 180), 10, C.ink3),
    ),
    rect(cx + 28, y + 330, 140, 60, { rx: 10, fill: C.s3, stroke: C.line2 }),
    pathEl(`M${cx + 44} ${y + 378} l30 -26 22 18 24 -30 v38z`, { fill: C.blue, opacity: 0.5 }),
    rect(cx, y + 450, 600, 70, { rx: 14, fill: C.green, opacity: 0.1, stroke: C.green }),
    pathEl(`M${cx + 34} ${y + 486} L${cx + 64} ${y + 470} L${cx + 56} ${y + 502} Z`, {
      fill: C.green,
    }),
    sk(cx + 86, y + 480, 260, 11, C.green),
    rect(cx + 440, y + 556, 160, 52, { rx: 12, fill: "url(#grad)" }),
    sk(cx + 470, y + 578, 100, 10, C.bg),
  ].join("");
  const sx = 1120;
  const sy = 200;
  const clock = [
    card(sx, sy, 370, 470, {
      fill: C.s1,
      stroke: "url(#grad)",
      strokeWidth: 2,
      stroke: C.line2,
    }),
    circle(sx + 70, sy + 76, 34, { fill: "none", stroke: C.blue, strokeWidth: 5 }),
    line(sx + 70, sy + 76, sx + 70, sy + 56, {
      stroke: C.blue,
      strokeWidth: 5,
      strokeLinecap: "round",
    }),
    line(sx + 70, sy + 76, sx + 86, sy + 84, {
      stroke: C.blue,
      strokeWidth: 5,
      strokeLinecap: "round",
    }),
    text(sx + 124, sy + 90, "08:00", { size: 38, weight: 700, font: MONO, fill: C.ink0 }),
    ...Array.from({ length: 28 }, (_, i) => {
      const col = i % 7;
      const row = Math.floor(i / 7);
      const on = i === 9 || i === 16 || i === 23;
      return rect(sx + 30 + col * 46, sy + 160 + row * 46, 36, 36, {
        rx: 9,
        fill: on ? C.green : C.s2,
        opacity: on ? 0.9 : 1,
      });
    }),
    sk(sx + 30, sy + 370, 200, 10, C.ink3),
    sk(sx + 30, sy + 396, 150, 10, C.line2),
    rect(sx + 30, sy + 420, 120, 28, { rx: 14, fill: C.amber, opacity: 0.15 }),
    sk(sx + 46, sy + 430, 88, 8, C.amber),
  ].join("");
  return svg(browser(x, y, w, h, "teste-a716a.web.app", list + compose) + clock);
};

// ---------- saída ----------
const root = path.resolve(
  path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")),
  "../..",
);
const only = process.argv.slice(2);
for (const [slug, make] of Object.entries(covers)) {
  if (only.length && !only.includes(slug)) continue;
  const dir = path.join(root, "public/images/projects", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "cover.svg"), make());
  console.log("✓", slug);
}
