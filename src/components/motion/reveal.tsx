"use client";

import { useAnimate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef } from "react";

// useLayoutEffect avisa no servidor; no servidor não precisamos dele.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Revela o conteúdo ao entrar na tela.
 * O HTML do servidor sai sempre visível (sem JS, crawlers e impressão veem tudo);
 * só no cliente, e só o que está abaixo da dobra, é escondido antes de animar.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, margin: "0px 0px -60px 0px" });
  const hidden = useRef(false);

  useIsoLayoutEffect(() => {
    const el = scope.current;
    if (!el || reduced) return;
    if (el.getBoundingClientRect().top > window.innerHeight) {
      hidden.current = true;
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
    }
  }, [reduced]);

  useEffect(() => {
    if (!inView || !hidden.current || !scope.current) return;
    animate(
      scope.current,
      { opacity: 1, transform: "translateY(0px)" },
      { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
    );
  }, [inView, delay, animate, scope]);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
