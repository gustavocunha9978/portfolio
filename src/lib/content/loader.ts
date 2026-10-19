import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { z } from "zod";
import type { Locale } from "@/i18n/routing";
import { projectFrontmatterSchema, type ProjectFrontmatter } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Entry<T> = { frontmatter: T; body: string; readingMinutes: number };

async function readCollection<S extends z.ZodType>(
  collection: "projects",
  locale: Locale,
  schema: S,
): Promise<Entry<z.output<S>>[]> {
  const dir = path.join(CONTENT_DIR, collection);
  const suffix = `.${locale}.mdx`;
  const files = (await fs.readdir(dir).catch(() => [])).filter((f) => f.endsWith(suffix));

  return Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        // Falha alto no build: frontmatter quebrado não deve ir para produção.
        throw new Error(
          `Frontmatter inválido em content/${collection}/${file}:\n${parsed.error.message}`,
        );
      }
      const expectedSlug = file.slice(0, -suffix.length);
      const fm = parsed.data as { slug: string };
      if (fm.slug !== expectedSlug) {
        throw new Error(
          `content/${collection}/${file}: slug "${fm.slug}" difere do nome do arquivo`,
        );
      }
      return {
        frontmatter: parsed.data,
        body: content,
        readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
      };
    }),
  );
}

export async function getProjects(locale: Locale): Promise<Entry<ProjectFrontmatter>[]> {
  const all = await readCollection("projects", locale, projectFrontmatterSchema);
  return all.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export async function getProject(locale: Locale, slug: string) {
  return (await getProjects(locale)).find((p) => p.frontmatter.slug === slug) ?? null;
}
