"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Número que conta de 0 até `value` quando entra na tela.
 * O HTML do servidor já traz o valor final (SEO e sem-JS); a animação é só progressiva.
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    let done = false;

    const run = () => {
      const start = performance.now();
      const duration = 1100;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !done) {
          done = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    setDisplay(0);
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
