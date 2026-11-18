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
export const media: Record<SceneId, SceneMedia> = {
  hero: { poster: "./assets/hero.webp" },
  robotica: { poster: "./assets/robotica.svg" },
  programacao: { poster: "./assets/programacao.svg" },
  design: { poster: "./assets/design.svg" },
  manutencao: { poster: "./assets/manutencao.svg" },
  redes: { poster: "./assets/redes.svg" },
};
