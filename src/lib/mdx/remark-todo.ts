import { INLINE_TODO } from "@/lib/todo";

/**
 * Plugin remark para placeholders "[TODO: ...]" nos cases.
 * - show = true (dev): o trecho vira <mark class="todo-mark">.
 * - show = false (produção): o trecho some; parágrafos e itens de lista que
 *   ficarem vazios saem, e um título cuja seção ficou vazia sai junto.
 */
type MdNode = {
  type: string;
  value?: string;
  depth?: number;
  children?: MdNode[];
  name?: string;
  attributes?: { type: string; name: string; value: string }[];
};

const BLOCK_CONTAINERS = new Set(["root", "list", "listItem", "blockquote"]);

function hasText(node: MdNode): boolean {
  if (node.type === "text" || node.type === "inlineCode") return Boolean(node.value?.trim());
  if (node.type === "image" || node.type.startsWith("mdx")) return true;
  return node.children?.some(hasText) ?? false;
}

function markTodos(node: MdNode) {
  if (!node.children) return;
  node.children = node.children.flatMap((child) => {
    if (child.type !== "text" || !child.value?.includes("[TODO")) {
      markTodos(child);
      return [child];
    }
    const out: MdNode[] = [];
    let last = 0;
    const text = child.value;
    for (const m of text.matchAll(INLINE_TODO)) {
      const start = m.index ?? 0;
      if (start > last) out.push({ type: "text", value: text.slice(last, start) });
      out.push({
        type: "mdxJsxTextElement",
        name: "mark",
        attributes: [{ type: "mdxJsxAttribute", name: "className", value: "todo-mark" }],
        children: [{ type: "text", value: m[0].trim() }],
      });
      last = start + m[0].length;
    }
    if (last < text.length) out.push({ type: "text", value: text.slice(last) });
    return out;
  });
}

function stripTodos(node: MdNode) {
  if (!node.children) return;
  for (const child of node.children) {
    if (child.type === "text" && child.value) {
      child.value = child.value.replace(INLINE_TODO, "");
    } else {
      stripTodos(child);
    }
  }
  if (BLOCK_CONTAINERS.has(node.type)) {
    node.children = node.children.filter(
      (c) => !["paragraph", "listItem", "list"].includes(c.type) || hasText(c),
    );
  }
}

/** Remove títulos cuja seção (até o próximo título de nível igual ou maior) ficou vazia. */
function dropEmptySections(root: MdNode) {
  const before = root.children?.length ?? 0;
  const kids = root.children ?? [];
  const keep: MdNode[] = [];
  for (let i = 0; i < kids.length; i++) {
    const node = kids[i]!;
    if (node.type === "heading") {
      const next = kids[i + 1];
      const empty = !next || (next.type === "heading" && (next.depth ?? 0) <= (node.depth ?? 0));
      if (empty) continue;
    }
    keep.push(node);
  }
  root.children = keep;
  // Uma subseção removida pode deixar a seção-mãe vazia.
  if (keep.length < before) dropEmptySections(root);
}

export function remarkTodo(options: { show: boolean }) {
  return (tree: MdNode) => {
    if (options.show) {
      markTodos(tree);
      return;
    }
    stripTodos(tree);
    dropEmptySections(tree);
  };
}
