/**
 * Plugin remark: transforma blocos ```mermaid em <Mermaid chart="..."/>,
 * renderizado no cliente (e só carregado em páginas que têm diagrama).
 */
type MdNode = {
  type: string;
  lang?: string | null;
  value?: string;
  children?: MdNode[];
  name?: string;
  attributes?: { type: string; name: string; value: string }[];
};

export function remarkMermaid() {
  return (tree: MdNode) => {
    const walk = (node: MdNode) => {
      node.children?.forEach((child, i) => {
        if (child.type === "code" && child.lang === "mermaid") {
          node.children![i] = {
            type: "mdxJsxFlowElement",
            name: "Mermaid",
            attributes: [{ type: "mdxJsxAttribute", name: "chart", value: child.value ?? "" }],
            children: [],
          };
        } else {
          walk(child);
        }
      });
    };
    walk(tree);
  };
}
