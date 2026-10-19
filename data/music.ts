import type { Localized } from "./types";

export type MusicVideo = { youtubeId: string; title: Localized };
export type MusicPhoto = { src: string; alt: Localized };

export const music = {
  roles: {
    pt: ["Baterista", "Professor de bateria", "Músico na igreja"],
    en: ["Drummer", "Drum teacher", "Church musician"],
  } satisfies Localized<string[]>,
  // TODO(gustavo): IDs de vídeos do YouTube (o trecho depois de "v=")
  videos: [] as MusicVideo[],
  // TODO(gustavo): fotos em /public/images/music/ (1600×1067, .webp ou .jpg)
  photos: [] as MusicPhoto[],
};
