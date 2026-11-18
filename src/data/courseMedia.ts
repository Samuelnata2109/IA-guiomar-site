import type { CourseId } from './courses';
export type ActivityMedia = { id: string; type: 'foto' | 'video'; src: string; title: string; caption: string; poster?: string };
// Caminhos relativos a public/, sem barra inicial. Não cadastre arquivos antes de adicioná-los.
export const courseMedia: Record<CourseId, ActivityMedia[]> = {
  robotica: [], programacao: [], design: [], manutencao: [], redes: [],
};
export const mediaUrl = (path: string) => `${((import.meta as ImportMeta & {env?: {BASE_URL?: string}}).env?.BASE_URL ?? '/')}${path.replace(/^\//, '')}`;
