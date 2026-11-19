const homeAnchors = new Set([
  "#inicio",
  "#curso",
  "#areas",
  "#code-quest",
  "#projetos",
  "#laboratorio",
  "#matriculas",
  "#escola",
]);

export function isHomeAnchor(hash: string) {
  return homeAnchors.has(hash);
}
