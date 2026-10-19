import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { remarkMermaid } from "@/lib/mdx/remark-mermaid";
import { Mermaid } from "./mermaid";

const components = {
  Mermaid,
  a: (props: React.ComponentProps<"a">) => {
    const external = props.href?.startsWith("http");
    return <a {...props} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} />;
  },
};

/** Compila o corpo MDX de um case no servidor. */
export async function MdxContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMermaid],
        rehypePlugins: [rehypeSlug],
      },
    },
  });
  return <div className="prose-case">{content}</div>;
}
