"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// useLayoutEffect avisa no servidor; no servidor não precisamos dele.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Revela o conteúdo ao entrar na tela (IntersectionObserver + Web Animations API, sem lib).
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
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    // Lê a preferência direto: na hidratação o hook ainda devolve o valor do servidor (false).
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduced || prefersReduced || el.getBoundingClientRect().top <= window.innerHeight)
      return;

    el.style.opacity = "0";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        el.style.opacity = "";
        el.animate(
          [
            { opacity: 0, transform: "translateY(16px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 500,
            delay: delay * 1000,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "backwards",
          },
        );
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      // Nunca deixar conteúdo preso invisível se o efeito for desfeito antes de revelar.
      el.style.opacity = "";
    };
  }, [reduced, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
