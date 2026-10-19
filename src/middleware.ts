import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Detecta o idioma pelo cookie / Accept-Language e redireciona "/" → "/pt" ou "/en".
export default createMiddleware(routing);

export const config = {
  // Tudo, exceto API, internos do Next/Vercel, imagens OG e arquivos com extensão.
  matcher: ["/((?!api|_next|_vercel|og|.*\\..*).*)"],
};
