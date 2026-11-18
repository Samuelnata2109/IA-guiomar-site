export const officialSite = "https://ds-guiomar.github.io/";
export const mapLink =
  "https://www.google.com/maps/search/?api=1&query=EEEP%20Guiomar%20Belchior%20Aguiar%20Carir%C3%A9%20CE";
export { courses as areas } from "./courses";
export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  url?: string;
};
// A fonte institucional tinha uma lista vazia em 10/11/2026. Inserir somente projetos verificados.
export const projects: Project[] = [];
