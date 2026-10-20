import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const fontFile = (pkg: string, file: string) =>
  path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file);

/** Fontes do site embutidas na imagem (arquivos locais: o build não depende de rede). */
async function loadFonts() {
  const [grotesk500, grotesk700, plex400] = await Promise.all([
    fs.readFile(fontFile("space-grotesk", "space-grotesk-latin-500-normal.woff")),
    fs.readFile(fontFile("space-grotesk", "space-grotesk-latin-700-normal.woff")),
    fs.readFile(fontFile("ibm-plex-sans", "ibm-plex-sans-latin-400-normal.woff")),
  ]);
  return [
    { name: "Grotesk", data: grotesk500, weight: 500 as const, style: "normal" as const },
    { name: "Grotesk", data: grotesk700, weight: 700 as const, style: "normal" as const },
    { name: "Plex", data: plex400, weight: 400 as const, style: "normal" as const },
  ];
}

const C = {
  bg: "#0B1220",
  ink0: "#EDF2F9",
  ink1: "#B9C4D5",
  ink2: "#8A99B0",
  line: "#213049",
  green: "#34D399",
};

/**
 * Imagem Open Graph no estilo do site: fundo escuro, filetes, título grande à esquerda.
 * `kicker` = rótulo pequeno em caixa alta; `meta` = linha de rodapé (stack, status…).
 */
export async function renderOg({
  kicker,
  title,
  subtitle,
  meta,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  meta?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
        color: C.ink0,
        padding: "64px 72px",
        fontFamily: "Plex",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${C.line}`,
          paddingBottom: 22,
          fontSize: 22,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: C.ink2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, background: C.green }} />
          {kicker}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Grotesk",
            fontWeight: 700,
            color: C.ink0,
            letterSpacing: -0.5,
            textTransform: "none",
            fontSize: 26,
          }}
        >
          Gustavo Cunha<span style={{ color: C.green }}>.</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
        <div
          style={{
            fontFamily: "Grotesk",
            fontWeight: 500,
            fontSize: title.length > 34 ? 72 : 92,
            lineHeight: 1,
            letterSpacing: -4,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{ marginTop: 28, fontSize: 28, lineHeight: 1.4, color: C.ink1, maxWidth: 960 }}
          >
            {subtitle.length > 150 ? subtitle.slice(0, 147) + "…" : subtitle}
          </div>
        )}
      </div>

      {meta && (
        <div
          style={{
            display: "flex",
            borderTop: `1px solid ${C.line}`,
            paddingTop: 22,
            fontSize: 22,
            color: C.ink2,
          }}
        >
          {meta}
        </div>
      )}
    </div>,
    { ...ogSize, fonts: await loadFonts() },
  );
}
