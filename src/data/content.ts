export const mapLink =
  "https://www.google.com/maps/search/?api=1&query=EEEP%20Guiomar%20Belchior%20Aguiar%20Carir%C3%A9%20CE";
export { courses as areas } from "./courses";
export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  media?: ProjectMedia[];
  technologies?: string[];
  details?: string[];
  url?: string;
};
export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
};
// Cadastre somente projetos de IA confirmados pela escola.
export const projects: Project[] = [];
