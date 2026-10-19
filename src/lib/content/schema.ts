import { z } from "zod";

export const projectCategories = [
  "fullstack",
  "mobile",
  "ia-visao",
  "automacao",
  "dados-bi",
  "web",
] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export const projectStatuses = ["produção", "concluído", "em andamento"] as const;
export type ProjectStatus = (typeof projectStatuses)[number];

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug deve ser kebab-case");

/** Frontmatter de content/projects/{slug}.{locale}.mdx */
export const projectFrontmatterSchema = z
  .object({
    title: z.string().min(1),
    slug,
    summary: z.string().min(1).max(280),
    category: z.array(z.enum(projectCategories)).min(1),
    stack: z.array(z.string().min(1)).min(1),
    role: z.string().min(1),
    period: z.string().min(1),
    status: z.enum(projectStatuses),
    visibility: z.enum(["público", "privado"]),
    repoUrl: z.url().optional(),
    liveUrl: z.url().optional(),
    cover: z.string().startsWith("/"),
    gallery: z
      .array(z.object({ src: z.string().startsWith("/"), alt: z.string().min(1) }))
      .default([]),
    metrics: z.array(z.string().min(1)).default([]),
    featured: z.boolean().default(false),
    order: z.number().int().default(100),
  })
  .refine((p) => !(p.visibility === "privado" && p.repoUrl), {
    message: "projeto privado não pode expor repoUrl",
    path: ["repoUrl"],
  });
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

/** Frontmatter de content/blog/{slug}.{locale}.mdx */
export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug,
  summary: z.string().min(1).max(280),
  date: z.iso.date(),
  tags: z.array(z.string().min(1)).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
  cover: z.string().startsWith("/").optional(),
});
export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
