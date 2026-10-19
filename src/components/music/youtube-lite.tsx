"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/** Embed leve: mostra só a miniatura e carrega o player do YouTube ao clicar. */
export function YoutubeLite({
  id,
  title,
  playLabel,
}: {
  id: string;
  title: string;
  playLabel: string;
}) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-xl border border-line"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={playLabel}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-line"
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 grid place-items-center bg-black/30">
        <span className="grid size-16 place-items-center rounded-full bg-brand-500 text-[#04130d] shadow-lg">
          <Play className="size-6 translate-x-0.5" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}
