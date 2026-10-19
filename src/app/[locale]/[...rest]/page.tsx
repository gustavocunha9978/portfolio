import { notFound } from "next/navigation";

// Qualquer rota desconhecida dentro de /pt ou /en cai na 404 do idioma (com header e footer).
export default function CatchAll() {
  notFound();
}
