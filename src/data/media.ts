export type SceneId =
  | "hero"
  | "robotica"
  | "programacao"
  | "design"
  | "manutencao"
  | "redes";
export type SceneMedia = { poster: string; webm?: string; mp4?: string };
// Vídeos ainda não gerados. Após aprovação editorial, adicionar arquivos locais em public/assets/video/.
// Exemplo: hero: {poster:'./assets/hero.webp', webm:'./assets/video/hero.webm', mp4:'./assets/video/hero.mp4'}
// As chaves dos cards também são usadas pelo catálogo de disciplinas e pelas galerias.
export const media: Record<SceneId, SceneMedia> = {
  hero: { poster: "./assets/hero.webp" },
  robotica: { poster: "./assets/introducao-ia.svg" },
  programacao: { poster: "./assets/ia-generativa.svg" },
  design: { poster: "./assets/machine-learning.svg" },
  manutencao: { poster: "./assets/visao-computacional.svg" },
  redes: { poster: "./assets/automacao-agentes.svg" },
};
